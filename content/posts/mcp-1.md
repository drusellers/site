---
title: 'MCP'
date: '2025-04-21'
categories: thoughts
tags:
  - strategy
disqus_id: 854e8c23-e47d-4fb4-a948-81018c484df5
aliases: []
toc: true
withStats: true
description: >
  What does it take to put together an MCP server? 
---

# Building a Model Context Protocol Server

Now that I've played a bit with using a MCP Server through Junie, I'm curious to build out my own. So I sat down with the [Model Context Protocol](https://modelcontextprotocol.io/introduction) and started to work through what I would need to do to build one out. The following post content is a bit of a brain dump on what it would take to build out an MCP server for RabbitMQ in dotnet.

An MCP Sever uses [JSON-RPC](https://www.jsonrpc.org/) to facilitate communication with the LLM Agent. The MCP server should respond to both `STDIO` and `HTTP SSE` to play well with the community. I thought about building out my own JSON-RPC support, as that would be an interesting (if exceedingly low value) bit of work, but as I dug deeper into the various details of the Model Context Protocol I realized I really didn't want to do that work. I settled on the hot and fresh [MCP C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) which integrates beautifully with the existing ASP.Net Host builder model.

> [!tip] logging and stdio
> Building an MCP server that uses STDIO as the communication can have some issues with logging. I would suggest that all logs when in STDIO format either get piped to STDERR (confirm this) or look to a log file output.

> [!tip] debugging
> https://github.com/modelcontextprotocol/inspector was super helpful in getting the basics set up



## Let's expose some capabilities

Now that we have the basic server working, and its talking to the [inspector](https://github.com/modelcontextprotocol/inspector), we need to think about what we want our MCP server to actually do. Because the Tool and Prompt support is pretty solid in the SDK I'll start with them, and then we can look at Resources which have a bit more work to enable.

> [!tip]
> When using the inspector, you need a really clean STDIO, here are my flags with dotnet to help speed you along your journey.
> 
> ```shell
> #!/bin/bash
> 
> # build the project first
> dotnet build
> 
> # now run the project 
> npx @modelcontextprotocol/inspector \
>   dotnet run \ 
>   -v quiet   \ # avoid any start up logging
>   --no-build \ # avoid build logging
>   --project src/mcp/mcp.csproj
> ```

### Tools

[docs](https://modelcontextprotocol.io/docs/concepts/tools)

For this very initial pass at building out the MCP server I wanted something that was very easy to observe. Purging a whole queue is a big deal, and is highly observable. Let's build that out, since its also an easy api call. We just need to tell it what the name of the queue we want to purge and that's about it. 

**EXAMPLE**

```csharp
[McpServerToolType]
public static class QueueTools
{
    [Description("Purges a queue")]
    [McpServerTool(Destructive = true)]
    public static async Task<string> Purge(
      IMcpServer server, // optional
      string queue       // the only argument
    )
    {
        var client = server.Services!
            .GetRequiredService<RabbitMqManagementClient>();

        await client.PurgeQueue(queue);
        
        return $"purged {queue}";
    }
}
```

The SDK uses reflection to find all of these classes and register them for you. So adding tools is quite easy. You
can also add them manually which I could see doing which would allow me to turn the tools on and off based on what
a user might want to allow the MCP to do.

### Prompts

[docs](https://modelcontextprotocol.io/docs/concepts/prompts)

I'm not planning to provide any prompts just yet with the RabbitMQ MCP, but since we are all here to
learn, this is an example of exposing a prompt.

```csharp
[McpServerPromptType]
public static class MyPrompts
{
    [McpServerPrompt]
    [Description("Creates a prompt to summarize the provided message.")]
    public static ChatMessage Summarize(
      [Description("The content to summarize")] string content
    ) => new(
          ChatRole.User, 
          $"Please summarize this content into a single sentence: {content}"
        );
}
```

### Listing Resources

[docs](https://modelcontextprotocol.io/docs/concepts/resources)

With Tools and Prompts covered, the real meat of my problem is in the Resources section.

For now I'm only going to expose queues, since that is what I need to provide to the Purge Queue tool that I've built out. To expose this I'm going to build out two things. A `Resource` and a `ResourceTemplate`. For both of these we need to decide on a url structure. For this I'm thinking `rabbitmq://localhost:15672/:vhost/:queue-name` (with `rabbitmqs` being a TLS version). 

> Note: the default vhost would be `%2f`

Right now the support for resources seems a bit less polished, but this is still a new library and is also requiring a bit more design work than just copying what the Open AI SDK and others are doing with their tool support.

```csharp
public static async ValueTask<ListResourcesResult> ListResources(
    RequestContext<ListResourcesRequestParams> context,
    CancellationToken ct = default)
{
    var cursor = context.Params?.Cursor;
    var (page, perPage) = PaginationCursor.Extract(cursor);
   
    var client = context.Services!
      .GetRequiredService<RabbitMqManagementClient>();

    var resources = new List<Resource>();

    await foreach (var q in client.Queues(page, perPage, ct))
    {
        var uri = $"rabbitmq://localhost/{_virtualHost}/queues/{q.Name}";
        resources.Add(new Resource
        {
            Name = q.Name,
            Uri = uri
        });
    }

    var nextCursor = PaginationCursor.Encode(page + 1, perPage);
    if (resources.Count < perPage)
        nextCursor = null;
    
    return new ListResourcesResult
    {
        Resources = resources,
        NextCursor = nextCursor,
    };
}

```
In the above example I'm only dealing with one resource so it's not too bad, but if we needed to handle more resource types then we would need to figure out how to parse them out, if we need to at all or if the community expects to just get a whole bunch of mix and match. I've got some more reading to do it seems in this regard.


### Reading Resources

Now that we've seen how to list resources, I'll move on to discussing the reading of resources. Since the protocol instructs us to use Uri Templates [RFC 6570](https://www.rfc-editor.org/rfc/rfc6570.html) I went looking for an existing Nuget that could help me with that and found the very nice [Corvus.UriTemplates](https://github.com/corvus-dotnet/Corvus.UriTemplates) which seems to have a good focus on speed, and a decent API surface to work with. The logic for working with `Corvus` is hidden behind the `QueueUriTemplate` but a quick look at the docs and you'll see where it's going.

```csharp
public static async ValueTask<ReadResourceResult> ReadResource(
    RequestContext<ReadResourceRequestParams> context,
    CancellationToken ct = default)
{    
    var client = context.Services!
      .GetRequiredService<RabbitMqManagementClient>();

    var contents = new List<ResourceContents>();

    var qu = QueueUriTemplate.Parse(context.Params?.Uri);
    
    if (qu != null)
    {
        var q = await client.GetQueue(qu.Name, ct);
        if (q != null)
        {
            var str = JsonSerializer.Serialize(q);
                
            contents.Add(new TextResourceContents()
            {
                MimeType = "application/json",
                Uri = qu.Uri,
                Text = str
            });
        }    
    }
    
    
    // 404?
    return new ReadResourceResult()
    {
        Contents = contents
    };
}
```

So, I still need to learn how I want to handle missing items (i.e. a 404). And when I need to handle more than one resource type I'll have to do some more string parsing and routing but for this initial approach I'm pretty happy with how this looks. I can easily add for `if` blocks for a few more resources before I really care about making this "nicer".
 
As of now, this is as far as I have gotten, and I'm generally pretty pleased. I will eventually be making this available for others to use, and I'll be working to make this more robust and eventually this will be rolled into [Message Aid](https://messageaid.com) so that you'll have an MCP server to all of your message brokers that contains an audit trail, and everything else that you could want.




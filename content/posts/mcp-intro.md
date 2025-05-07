---
title: "Bug"
date: '2025-04-10'
categories: AI
tags:
  - AI
disqus_id: a2ca080d-a976-47f5-81df-a4637ff4b562
aliases: []
toc: true
withStats: true
description: >
  First impressions with a postgres MCP server
series:
  name: mcp
  order: 0
---

Lately, I've been working to get a better grip on how the newer Agentic IDE's can help me with my day to day tasks. I've specifically been working with JetBrain's [Junie](https://www.jetbrains.com/junie/) and I ran into a bug that I thought Junie could solve.

> This should really be read as: I now understand how the LLM Agents work, that I feel comfortable testing my hypothesis.

The issue at play is that I originally misunderstood the data that was going to come back from the database. I thought I was going to get values like `"1"` or `"5"` but instead I got values like `"1-4"` and `"5-6"`. The user interface needs to represent the data so that it will know how much of the boxes to color in using something like `className={ i < 2 ? 'active' : 'inactive' }`. The fix that I had imagined in my head was to use a simple regex instead such as `parseInt(value.match(/\d{1,2}/)[0])` (grab the first 1 or 2 characters that are digits). 

But to know this you have to know the data, how can I get Junie to have the same understanding of the data in the database as a normal developer would?

## MCPs

 Enter the Model Context Protocol ([MCP](https://modelcontextprotocol.io/introduction)), an early standards based approach for adding tools and context to the Agent's working context.

The key idea is that MCP's give agent's new resources in the form of a `Tool` (something that can effect a change) or `Resource` (something that provides information). I reviewed three different Postgres MCP's and at the core the feature that they provided that I wanted to use was the ability to execute a sql query. I tried using [Postgres MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres), [Postgres Pro MCP](https://github.com/crystaldba/postgres-mcp) but ended up using the [Neon MCP](https://neon.tech/docs/ai/neon-mcp-server) as it was the one I could get working. Now the Neon MCP provides a lot of capabilities but I only used the ability to execute a query.

> Side note: prior to the MCP idea I would generate shell scripts that I would instruct the Agent to use to get the data. It's a really nice idea that I can start to depend on an MCP server to help me out in the future.

At this moment Junie (243.72.60) doesn't yet support MCPs which is sad as this is an exciting area of development. So, I switched to Cursor to give this a shot.

> Sidenote: I totally expect JetBrains to ship a database MCP given their amazing DataGrip support so that I don't have to configure this manually - but I'm sure that will take a hot minute. Such a fun new vision for the IDE.

So, on my mac in cursor I went to

```text
Cursor > Settings > Features > MCP Servers 
```

Following [the instructions](https://neon.tech/docs/ai/neon-mcp-server) added the Neon MCP server, and ran a few tests to make sure it was working. With that all done, I made sure I had a clean git repo and then started with the following prompt. 


**Prompt**

> A user is reporting that there is a bug in the ExperiencePowerBar component. While there is no Exception or Error being thrown the individual pills are not getting the correct colors. They are all "OFF" or gray when there should be color. 
>
> Looking at the component ExperiencePowerBar and other code components as well as the REAL data for the `searchLevel` in the `people` table.

Note:
- The usage of drizzzle didn't seem to hamper its ability to run sql

In this instance the Agent made some changes that I wasn't 100% happy with, but this is somewhat due to it not implementing the approach I was thinking of. It did a different approach where it created a new branch of logic to handle the special case rather than write a solution that could handle all cases. 

```javascript
// actual agent code
function levelToNumber(val: string): number {
  const parts = val.split('-')
  if (parts[0] === '10+') return 10
  return parseInt(parts[0])
}
```

vs 

```javascript
// initial expectation
function levelToNumber(val: string): number {
  const parts = val.match(/\d{1,2}/)
  return parseInt(parts[1])
}
```

Beyond this "style" choice, I'm impressed. It looked at the data in the database doing a `DISTINCT` query, and then corrected the logic. The novelty of this is still pretty wild to me.


### IDE vNext

The implications of this experience have gotten my mind to start churning on the future of IDE's.

I'm starting to see how I might be able to use more Agentic approaches in my software development. It's still something I have to explicitly reach for, it still feels slow. But I'm curious how my approach will change over the next year as I get more reps and these systems get more time to bake. 

I'm imagining that I open a work ticket in this new world order - the ticket agent has reviewed the ticket and using a GitHub MCP has determined that the issue effects GitHub Repos A and B. Then using that same MCP's tools - we could open new branches for the work and tie it back to the ticket. We could then fire off two requests to a Cursor hosted agent that checks the code out and starts to make the required changes and submits those back as PRs. Possibly using something like [Google's Agent 2 Agent](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/) protocol in the mix to track the progress.

For this to work, we would need MCP's for each piece of the system. So if we used a 3rd party API than that would need an MCP. I assume we will see a raft of `xxx_mcp` servers pop up much like we see the `xxx_exporter` for prometheus targets. Those companies that have a way to spin up an application instance per branch could then use that same agent to test the impacted workflows.

I know I'm not saying anything new that the earlier proponents weren't saying but now I'm starting to see the actual pieces that would be needed coming together. How the MCP's are going to provide the capabilities, how the Agentic IDE's can leverage those. It's easier for me to see how a more contextually tuned LLM could take better advantage of these tools.

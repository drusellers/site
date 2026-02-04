---
title: 'Joys of the Edge'
date: '2025-04-24'
tags:
  - AI
  - dotnet
disqus_id: 3d69756b-8663-477b-a7b9-bcab13ef0425
aliases: []
toc: true
withStats: true
description: >
  Exploring Resource Listing in C# MCP SDK 
series:
  name: mcp
  order: 2
---

# Gleaming the Cube

As I continued to build out the MCP server for RabbitMQ I ran into my first misalignment in the MCP scheme. I initially took my very HTTP / API / REST mindset to the idea of resources. I think this was wrong. I was trying to return 100's of items in the resources thinking that this was the correct way. You can read [here](https://github.com/orgs/modelcontextprotocol/discussions/281) some more nuanced details on how to think about resources in MCP context. Instead I think I'll switch to just a few resource templates.

Another item that I'll be adding is a way to "address" brokers by name only. I'll make sure that the broker names are unique, but then everything should be addressable by their name, which I'm hoping makes working via the LLM Text interface nice and easy.

With a grip on how everything is addressable via a name, I can now expose resource template models, rather than 100s of resources. The timing on this looks good because the C# team is working to improve their support for this with the following [issue](https://github.com/modelcontextprotocol/csharp-sdk/issues/72).

While testing my server based deployment over Streamable HTTP I ran into a lovely regression where the inspector will [drop the authentication header](https://github.com/modelcontextprotocol/inspector/issues/369) when using Streamable HTTP.

All of these items will be addressed in time, these are just some of the joys of working with such a bleeding edge protocol in the fast moving LLM space.




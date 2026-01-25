---
title: "Agentifying my Code Bases"
date: '2026-01-25'
categories: ai
tags:
  - ai
disqus_id: 074f76ff-b330-4f70-8b47-00c55c13d806
aliases: []
toc: true
withStats: true
description: >
  How I'm using AI agents to write better code by creating skills that encode my coding preferences, architecture patterns, and design system guidelines.
---

Now that I'm leaning on Agents to do more of my coding, I'm finding that I write a lot more than I code. I'm still reading a fair bit of code to see how things work and what not, but I'm challenging myself to get the robot to write more of the actual code. Like many of us, I'm impressed with how far it gets with out a lot of context, but what I'm really starting to love is how I can use `skills` to really control the output of the code, and I don't have to repeat myself with the LLM over and over. 

Something that I'm finding very productive is to issue the request to the agent, review the code that is produced in a git diff. If I find anything that is fundamentally out of place, or structurally wrong I try to think about how I can encode that information in the Agent's memory system. I then revert the changes, and issue the same request again, from the same starting `PLAN.md` file. Almost always the issue that I've spotted has been corrected, and its hella comforting to know that the Agent will continue to produce code that way from here on out.

Now the repository is not slowly becoming unrecognizable, its not becoming a mess. Its marching along a path that I understand, and now know where to find everything. A beautiful side-effect is that I'm externalizing my thought process around code organization, and now that I'm passed the HTTP Handlers, and CLI Commands, I'm starting to dig into the juicy bits of actual organization and how this all should work. I'm super curious to see what comes of this next adventure with the LLMs over this otherwise cold and dreary weekend.

Ok, enough blabber, let's get concrete about what I'm actually doing right now.

## Item Zero: Agents
Currently my daily driver is [Claude Code](https://code.claude.com/docs/en/overview), but I'm looking REALLY hard at [Open Code](https://opencode.ai/) as well. I really like that switching between a variety of models in Open Code is a thing, and I like the idea of having more tools at my disposal than the simple three models with Claude.

## Item One: Tell it how I like to structure my projects
In CLAUDE.md or [AGENTS.md](https://agents.md/) I document some high level objectives helping to set the broader context of what is going on in this repository, and help it understand what resources might be available to it. Since these files tend to get loaded into every session I work to keep them light, and make sure that the content is always useful for all features. 

Notable mentions:
- command to format the code
- where unit tests go
- what external services are available (or to look at the docker-compose file etc)
- typically a reference to the `architecture-overview` skill that goes into a lot more detail.

## Item Two: Make the simple generation options consistent
If it something that I might have used a CLI generator to scaffold out before, I've turned that into a [skill](https://agentskills.io/home). This helps ensure that the Agent is writing the code in the style and manner that I would, had I written it by hand. I have skills for writing web handlers, for writing cli commands, and for writing message handlers. This is definitely in the more boiler plate area of things and the AI follows this quite well. This a bit tedious to create initially but otherwise it straight forward. In most projects I was able to work with the Agent to do a first pass then slowly refined it to get it working just right.

## Item Three: Architecture Overview
I also like to have the Agent write an architecture overview file/skill that I can reference as needed. Since one of the big goals is managing the overall context window I like having this be something that I can dynamically pull in. This can have things like other systems to think about, known constraints, etc. I currently put a more detailed review of the business processes at a high level here as well, and how they connect to the code base. So far I use this mostly during my "research" phase, to help the Agent know where to go looking for things.


## Item Four: Design Overview
For applications that include a user interface, I've also started to include a few design based skills. An example is telling the Agent to create a `component` skill by following the Base UI [llm.txt](https://base-ui.com/llms.txt) . For various colors, fonts, etc - I like to have it study any Figma files and write up some thoughts about that as well. Since this is a newer item for me, I will then have it create a `/design-system` view and have it write the documentation about how to use it etc. This way I can really test the Agent to see if it understands what I want to do. I'm really excited about this new step because it allows me to also test my understanding of the design system.

## In Closing
I'm sure I still have a long way to go, and I'll continue to evolve this mental model - but with this kind of initial setup I'm generating much better code, better screens and I've also been able to use these skills to update older code that didn't necessarily follow my desired guidelines.
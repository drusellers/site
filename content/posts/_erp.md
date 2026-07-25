---
title: "A Toy ERP for Agents"
date: '2026-07-25'
tags:
  - derp
disqus_id: 0968c44e-36fc-4f04-b3fc-100565eb2a97
aliases: []
toc: true
withStats: true
description: >
  I find myself back in the land of ERPs and now that I'm starting to feel up to speed again
  I want to revisit the idea of building an ERP, especially now that we have access to modern
  llm coding agents.
---

It's Saturday, and its hot outside in Austin, TX. I wonder how hard it would be to build an ERP today. I'm currently working with an ERP
that has not kept up with the times, and I wonder what an ERP that was built for a developer would look like. Heck, its Saturday
and I have some time to myself let's start to spec this out. This could be a fun way to tie together some questions I have about
accounting and how these things connect.

Ok, so let's go with my best language `dotnet` and my best database `postgresql`. I need to figure out what I want to do for the Front End. 
I don't want another system to deal with so this is probably going to be a Razor based front end. Which I _really_ don't like. I've never been
a big fan of how Microsoft approaches their front ends - I think that the JavaScript ecosystem has a better approach but for now let's avoid
to much UI and really hammer down on what the API is going to look like. 

This project is going to be one big indulgence is building something that will never see the day of light. If it does great - but that is not my intention.
This is me exploring ever crevice of my tools to build something a bit silly.

## Accounting 

### Budgeting

Ok, so for most ERP's we need the idea of a General Ledger, that is one of the big things that it does. It helps with the accounting items. I've written
a budgeting app before, so rather than letting that waste away in ruby code we could pull that in so that we can do budgeting. 
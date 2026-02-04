---
title: 'Boring Names are Fun'
date: '2025-03-31'
tags:
  - strategy
  - thoughts
disqus_id: 2f2c100b-c4a0-4d6c-b28c-cc83908982be
aliases: []
toc: true
withStats: true
description: >
  Should you name your project something fun and whimsical, or should we name projects
  and software systems after what they really are?

---

I'm a big fan of the idea that things should be named for what they are. 

{% youtube src="https://www.youtube.com/embed/y8OnoxKotPQ?si=7h2Ba-l5Yz0rwOrR" /%}

[Microservices](https://www.youtube.com/watch?v=y8OnoxKotPQ)

It's fun having silly names for things, I think it helps to establish a personality for a company
or project. But I don't enjoy having to consult the company's version of Urban Dictionary to 
understand why I need to talk to the Bingo service to get a name, or talk to the Papaya service to get a
User Session token. A new fun name can help gel a group, it can help to establish an identity. But maybe, we don't use our
fun names for our systems, but instead we save those for short-lived projects. We need to establish a goal
for a project, and a fun unique name might do that. Then we can keep conversations around the identity system
and the billing system as a bit more hum-drum affairs. 

> Be playful where it helps culture, not where it hinders clarity.

Because whimsical names can establish an identity, maybe that's also used for long-standing teams, it can give the 
team a shared sense of identity, while keeping our software systems in a state where I don't have to guess what it does.
And based on the "branding" idea that the name matters less than the ideas and concepts that you fill it with, these
whimsical names might encourage a software project to do more than it should, which leads to that rat's nest of 
software. 🤔

> Debugging the Shortbread service at 3am, and how it talks to the Floobitter

Any company over a certain size will also have a fair amount of churn. If people are changing jobs every 2-3 years,
then institutional knowledge will have a hard time sticking around. A clear, non-whimsical name that is grounded in 
what the application actually does will help to persist the intention of the software in the years to come after you
have long since left the company. 

I touched on this a bit earlier, but a clear name can help to provide a boundary for functionality. The email sending
service probably shouldn't live in the mortgage calculation service. Calling these services names that people outside
of the development organization can understand might help people put the asks in the right area. 

__TANGENT__

Rebranding 3rd party services. Personally, I really like having a boring name for a service inside a company, like
the "Email sending service" but in reality that is provided by a 3rd party SaaS tool, like loops.so or send grid, 
whatever the flavor of the day is. You can swap those systems out, but you still need an email sending capability. The
goal is not to make switching them out easier - but to highlight the service being provided and abstract that away
from those not doing the implementation.
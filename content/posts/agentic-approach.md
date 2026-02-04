---
title: 'Agentic Approach'
date: '2026-01-22'
tags:
  - AI
disqus_id: e42cc3d5-b91b-455c-8efc-9ead07198948
aliases: []
toc: true
withStats: true
description: >
  Exploring how structured planning, local “memory” tools, and LLMs can change the way we move work from ideas to implementation — and what that means for modern developer workflows.
---

Writing down the requirements for any kind of change to a software project, that someone else is then going to implement has always been hard. Sometimes it can feel like those experiments, when you were a kid, and you would write the instructions about how to make a PB&J sandwich and then watch in horror as your parents totally fudged it up.

So its funny to me that I now find myself back in that same scenario. Rather than writing the code, I'm now writing the requirements more and more for an LLM to then go and implement. To that end I'm increasingly attracted to tools like [docket](https://github.com/steveklabnik/docket) and [beads](https://github.com/steveyegge/beads) as a local tool where I can write in the privacy of my own mind (versus in the company issue tracker) detailed notes about what we need to implement.

Now instead of starting with the silly little one line prompts, I'll create an issue `docket new` in my repository, and then start adding instructions to the body of the plan. If I've worked with the LLM on generating the plan ahead of time I can as easily say `docket new --body path/to/the/file` and get a head start on things. Tools like this let me queue up a batch of work, and include tags / epics / and other organizational items and then finally queue up that work with a `docket work SOME_ID` and then let it tear off into a jj workspace and do its thing.

I haven't gone full [Wiggum](https://www.youtube.com/watch?v=_IK18goX4X8) yet, or tried to take on the [Gastown](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04), but I like what I think these techniques are trying to approach. For me my big take away hit after reading [Steve Kabnik's take on Gas Town](https://steveklabnik.com/writing/how-to-think-about-gas-town/) and now I want to dive in deeper. Notably, I like the idea of a memory system that the AI can use that's local to my concerns, much like I'll use the Mac App Things 3 to manage projects for me, even though work uses something else. I feel free to get sloppy in my own little backyard, before I tidy everything up before submitting back to work.

With these new "memory" type tools (aka issue trackers) I can do the same work that I used to do with pencil and paper were I would map out my path to success and keep various ideas in mind and I made edits, just now I can track them in a system that the LLM can use as well so that my work can be leveraged by the LLM. I'm especially happy with the idea that I can record myself with an audio tool like Granola, as I walk through a code base and talk about what I'm seeing and what I want changed. Then take that output, pass it into an LLM to format it, and then break it out into epics in docket. Review my docket plans, and then let claude code rip.

> Let it Rip
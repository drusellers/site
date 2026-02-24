---
title: 'Pebbles'
date: '2026-02-23'
tags:
  - ai
disqus_id: a7c613a3-0eb6-4f8b-832e-8cbc81626db3
aliases: []
toc: true
withStats: true
description: >
  Building LLM-driven tooling (“pebbles”) to structure ideas, manage agent tasks, and evolve a workflow for AI-assisted development and changelog awareness.
---
For the last week or two I've been heads down using LLMs to write more of my code. I've specifically been using LLM's to write an LLM enhanced Workout planner for my own personal use, and to solve some specific use cases that I have, in addition to using it to create a toy search engine that I can use to illustrate various concepts of search engines.

Now that I'm pushing the LLM's to write more of my code, I end up spending a lot more time writing out the various specifications of the features that I want completed. I started by working with the LLM to write documents to something like `plans/NEW_PLAN_46.md` this was working pretty well, but then I wanted a bit more structure so I started using front matter, then it started to get annoying coming up with plan names. I know that `opencode` and others have a concept of plans that can be stored but it wasn't the workflow I was looking for. That's when I started trying to use [`beads`](https://github.com/steveyegge/beads) and [`docket`](https://github.com/steveklabnik/docket) to do what I wanted.

I started with `docket` because it was a bit smaller and I could wrap my head around it faster. However, I quickly found myself fighting little decisions in my specific ways of using it so I fired up my third project that would be largely written by LLM's - which is [`pebbles`](https://github.com/drusellers/pebbles) - my own personal take on this "issue management for agents" type tooling. Right now it's really a way for me to capture ideas, review them, and then fire off the work. At some point I may see the value in the other tools and switch back to them but right now I'm enjoying thinking about my own workflow and how I can turbocharge it.

## Workflow
Right now as I'm going through and thinking of things I can quickly switch to my shell and log some issues.

```sh
pebbles new "Some new feature"

# pops the $EDITOR
pebbles new "Some new feature" --edit
```

This assumes that I need to actually think about the issue a bit more, and can't just one shot it.

I've also added a bulk intake command that looks like

```sh
cat SESSION_NOTES.md | pebbles intake
```

which will then create a bunch of issues for me based on those notes. I'm still playing around with this, and finding my way but these commands are definitely the direction I want to pursue. I could also see this working off of a Linear or Jira ticket as well.

Right now all of these issues are stored inside the git repository, so in order for them to flow to git worktree I do need to commit them which is a minor annoyance - but I've seen a few different approaches to get around this. I'm sure I'll settle on one at some point.

Once I have the issues in place, then I can just start working them with

```sh
pebbles start 1234

# launches in a git worktree / jj workspace
pebbles start 1234 --isolate 
```

It's this isolate idea that really got me going with starting to try with multiple agents. I'm still not there yet, but I can see it coming. Especially as I get into a larger project where I can have two things or more going on at once. I'm already dreaming of going out for a walk, taking the notes from [Granola](https://www.granola.ai/) - running `pebbles intake` - reviewing the issues and then just spamming `pebbles start` - being able to see various workspaces get created - and the work starting. 

## Next Steps

One thing that i'm starting to explore is a structured approach to the changelog. How can I give the LLM the same idea of knowing the history of a project that you might get when onboarding on a new project with a team of humans?

I'm imagining a `changelog` folder where the outcome of a completed task is recorded in timestamp order. It would contain an LLM generated summary of the change, along with the relevant commit ids. Those commit id's could supply more context and the files touched to a future LLM question asker. The idea of using the SCM in more interesting ways is actually really interesting to me. I'll have to consult my `git` sensei and see what they think. I could also see some tags or topics being in here too that would allow the LLM to search back through these as needed. I expect that I'll work on adding this kind of feature to pebbles in the future as I continue to feel this pain.

---
title: 'Modern Repositories'
date: '2024-04-18'
tags:
  - notes
disqus_id: 1d83dc56-3941-4899-945e-00a5f2ccba45
withStats: true
description: >
  How I'm thinkig about Repositories in 2024
---

- Query Objects (EF Core)
  - can contain filter options
  - can tell you those filter and sort options (meta data)
  - CON: Some what hard to discover
  - CON: don't join systems
  - CON: harder to get at a cache (no DI)

- Repository Objects
  - less meta data
  - much better discoverability
  - can join multiple data sources
  - can easily include a cache
  - has DI

Could we use both? SOC

repository.QueryOne.Filters
repository.QueryOne.Sorts
repository.QueryOne.Execute()

the repository can also contain mutations, but that was not the bigger focus in the original literature.

What would the word be, if not Repository?
since I also need to find the "actions" that can be taken. not just the queries. and an action could be a query

Action <- Query
Action <- Mutation

What do these hang off?
DomainAction <- Query
DomainAction <- Mutation

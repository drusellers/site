---
title: 'Modern Repositories'
date: '2024-04-18'
tags:
  - notes
disqus_id: 1d83dc56-3941-4899-945e-00a5f2ccba45
withStats: true
description: >
  How I'm thinking about Repositories in 2024
---


GetAction<TId, TEntity, TResponse>
  Repository<TId, TEntity>
    Get()
  
TResponse Map(TEntity);

- Query Objects (EF Core)
  - Helps build initial includes  
  - can contain filter options
  - can tell you those filter and sort options (meta data)
  - CON: Some what hard to discover
  - CON: don't join systems
  - CON: harder to get at a cache (no DI)

```csharp
public class ListOrders: ListQuery<Order>
{
  override IQueryable<Order> Build(DbContext context)
  {
  }
}
```

- Repository Objects
  - less meta data
  - chunky
  - much better discoverability
  - can join multiple data sources
  - can easily include a cache
  - has DI
  - baseQuery

Could we use both? SOC

repository.QueryOne.Filters
repository.QueryOne.Sorts
repository.QueryOne.Execute()

repository.Filters
repository.ListObject(page, perPage, filters, sort, ct)

the repository can also contain mutations, but that was not the bigger focus in the original literature.

What would the word be, if not Repository?
since I also need to find the "actions" that can be taken. not just the queries. and an action could be a query

Action <- Query
Action <- Mutation

What do these hang off?
DomainAction <- Query
DomainAction <- Mutation

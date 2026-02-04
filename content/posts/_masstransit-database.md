---
title: "MassTransit's Database Transport"
date: '2024-10-29'
tags:
  - MassTransit
disqus_id: a771f096-4124-4ea3-88db-a3be6adf4265
aliases: []
toc: true
withStats: true
description: >
  First impressions with MassTransit's Database Transport
---

Goals:
- show simple setup
- simplicity
- middleware
- docs
- 

Content:

## Set Up

Assuming you already know how to setup a basic dotnet application. The relevant parts that you would need to add to get MassTransit and its SQL Transport up and running are below.

### Nugets

```sh
nuget install MassTransit
nuget install MassTransit.SqlTransport.PostgreSQL
```

There is also a SQL Transport

### Program.cs

```csharp
// Program.cs

var builder = WebApplication.CreateBuilder(args);

// ... other stuff

builder.Services.AddOptions<SqlTransportOptions>()
 .Configure(o =>
 {
     // GRANT transport TO your_user;
     builder.Configuration.GetSection("Messaging").Bind(o);
 });
 
// This has to be BEFORE AddMassTransit so that the IHostedService occurs before
// the bus start.
builder.Services.AddPostgresMigrationHostedService(options =>
{
    options.CreateInfrastructure = true;
    options.CreateDatabase = false;
    options.DeleteDatabase = false;
});
builder.Services.AddMassTransit(cfg =>
{
    cfg.AddConsumers(typeof(Program).Assembly);

    cfg.UsingPostgres((bus, sql) =>
    {
        sql.ConfigureEndpoints(bus);
    });
});

var app = builder.Build();

// ... other stuff

app.Run();

// So I can assembly scan the consumers
public partial class Program;
```

With that done, we now have a fully configured MassTransit setup, that will use the Database as the transport.

### Tables

All of the tables are in the `transport` scheme by default

### Key Tricks

A key trick for this to work in the database is the idea of skip locked and ... notify.

## Benefits

Because my database state and my queue state are all in one system, this makes it 

- Being Able to pull down the database, and have access to the whole "world" is super cool
- integrates with Grafana dashboards (it's just SQL)
- Partiontion Consumers
- You can query the queues




Partitioned Consumers


1. configure consumer with partition key, but don't publish the key
- observe no key in the database. ✅
- observe that the consumer DOES NOT throw an error
2. configure Send Topology to add a partition key
- observe a partition key is in the database ✅

  ```csharp
  sql.SendTopology.UsePartitionKeyFormatter<RefreshLocationConsumer.Execute>( x => m.Message.LocationId.ToString());
  ```

3. Configure Message to a fixed partition key
- set the consumer to the right parition + concurrency of 4
- run app, sync locations - and see it do one at a time

```csharp
    sql.SendTopology.UsePartitionKeyFormatter<RefreshLocationConsumer.Execute>( x => Guid.Empty.ToString());
    ```

4. now go back to the correct / dynamic key
- see the logs "multi-thread"

    ```csharp
    sql.SendTopology.UsePartitionKeyFormatter<RefreshLocationConsumer.Execute>( x => x.Message.LocationId.ToString());
    ```

    NICE

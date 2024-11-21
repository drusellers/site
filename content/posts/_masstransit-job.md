---
title: "MassTransit's Database Job Support"
date: '2024-10-29'
categories: MassTransit
tags:
  - MassTransit
disqus_id: 6b442c31-4def-41b7-b021-35576a9eb460
aliases: []
toc: true
withStats: true
description: >
  First impressions with MassTransit's Database Transport
---

## Table Notes

`job_type_saga`: This stores configuration data related to the job type
States:

1. Active
2. Idle

`job_saga`: a running job, this is where the job state and job progress are stored

States:

0. Submitted
0. WaitingToStart
0. WaitingToRetry
0. WaitingForSlot
0. Started
0. Completed
0. Canceled
0. Faulted
0. AllocatingJobSlot
0. StartingJobAttempt
0. CancellationPending

`job_attempt_saga`: the current attempt of the job, tells you where the job is running

States:

1. Starting
1. Running
1. CheckingStatus
1. Suspect
1. Faulted

---
title: 'Being aware of the G/L'
subtitle: 'What I learned working on ERP and a 3PL taught me'
date: '2019-01-01'
tags: []
withStats: true
draft: true
description: >
  What I learned working on ERP and a 3PL and a SaaS Cloud
---

A request for services is a "Sales Order" [^1]

Once completed that turns into an Invoice which is recorded in the G/L Accounts Receivable

Every month we issue a new invoice for the upcoming month (This is an ERP function)

When a customer cancels a plan we should make a "cancellation" entry we shouldn't mutate existing data

When a customer upgrades we can make a "refund" entry + the new plan entry. This way we don't mutate and SQL aggregate methods will work just fine.

[^1]: The note

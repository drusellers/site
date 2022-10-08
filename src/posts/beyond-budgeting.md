---
title: 'Beyond Budgeting (2019Q3)'
date: '2019-07-20'
categories: strategy
tags:
  - strategy
  - business
  - beyond budgeting
disqus_id: 55ad975d-31d3-4062-bc78-6dbed690f99c
aliases: []
toc: true
withStats: true
description: >
  My progress in deploying Beyond Budgeting at OMC in July of 2019
---

One of the biggest take aways I got from reading Beyond Budgeting is that we need to "do budgeting" in an iterative process. This came to me so easily after having studied and lived agile management practices. I also love the quote "The bank is open year round, not just in october", meaning we should be able to get money out of the business as the business needs it, not just during the annual budget cycle. When I joined OMC I was determined to take these practices and establish them as a central framework for running the business. The following is a bit of a diary entry about my progress so far

## Existing Set Up

When I really started to bring the Beyond Budgeting principles into the company, we had just gotten our P&L and Chart of Accounts dialed in. We wanted to improve our ability to forecast and budget to effectively manage our finances. For a brief (1 hr) overview of what I was inspired by I really like [this talk](https://youtu.be/NwqG5W9b37o) by Bjarte Bogsne on Beyond Budgeting. Our General Ledger system was in [xero.com](https://xero.com) which has an API that I knew I could use. Its current budgeting system is limited in that you have to "create" the months so we only had the current 12 months available to us, and this got shorter as each month progressed. We knew we wanted to be able to project out 15 months at any time. We managed our current forecasts in Google Spreadsheets which were getting increasingly complex and getting harder to manipulate and to remember what "plans" had been included in the projections.

It should be noted that we are a very small company, and for the most part, budgeting was already pretty iterative. We use cash accounting methods, and are just starting to dabble in accrual based accounting methods. The typical practice was to redo an existing forecast with any new data we might have, and then refer to that one until we "lost it" and needed to do another one.

## The Goal

We want a system that could always project out 15 months (5 quarters) from our last closed month. We wanted a way to audit what was included in the projections and to have an easy way to try different scenarios. We wanted the ability to see things at various levels of detail (monthly vs quarterly, at the top accounting levels vs all the way down to the individual accounts).

We are an engineering heavy team, and we wanted a solution that fit our culture of code, pull requests, etc. We wanted to be able to test our projection code, and not be constantly double checking things with a calendar or allow an errant `+` to accidentally, subtly screw up our projections.

Another aspect of Beyond Budgeting that we wanted to bring in was a way to establish some KPI's into our financial metrics so we can track leading, and trailing indicators along with our key financial metrics.

## The Solution

In a fervent state of frustration with Google Spreadsheets, I set off to build my ideal solution. Our team is mostly versed in Ruby on Rails, so that was what I started to build this solution out in. Due to the amount of community support in this toolset, I was able to over two days build out the basic structure of what I was looking for. This whole process was greatly simplified by the work we had down building out our spreadsheets. Without that work, this would have required a lot more problem space exploration.

Over the following weeks, we added additional ways to forecast our financial state that we could never acheive in our spreadsheets. Our current list of "projections" includes:

- **Flat Plans:** a set amount each period
- **Projected Plans:** a starting point plus a growth rate
- **Pegged Plans:** that are a ratio of another account (or group of accounts)
- **Salary Plans:** Based on the number of pay periods in a month and the current salary
- **Headcount Plans:** a plan that takes a fixed amount times the number of people employed in a period.
- **Reoccuring Plans:** Plans that have a single amount to contribute in a specific date (great for renewels).

We have also built out a means to store actual values from Xero using their APIs and then rerunning our projections based on these numbers. These projections are stored and kept so we can review our projections vs the actuals.

## Current State

We can now import actual data from our GL the same day as close, and in about 10 minutes have a fresh projection that the whole team can look at. We have comfort knowing that we haven't forgetten anything and that if we need to we can adjust any aspect and rerun the forecasts to answer any new questions.

## Next Steps

- **Forecasts vs Targets:** Forecasts are about where we think we might be going. Forecasts should be "brutal." Targets are where we want to be, and understanding the variance from the target. These should be more optimistic in nature. The budget has traditionally played both roles, its my hope we can have two distinct processes for tracking these.
- **Storing KPI's**
  - Automatically providing financial based KPI's
  - Ability to store manually entered KPIs
  - Visualization of KPI's over time
- **Application Performance:** More denormalizations to speed up page render speeds
- Dig deeper into a budget, vs cash flow forecasting
- Adding some permissions so that employees can see their budgets, and control how payroll data is accessed

[Further Reading](https://corporate-rebels.com/how-to-manage-cost/)

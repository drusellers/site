---
title: "Story of a Bank"
subtitle: "A pen, notepad, and 4 data points"
date: 2018-08-03T20:31:52-05:00
tags: []
categories: []
description: >
              Looking for key abstractions can lead to powerful insights.

---

I can remember working at a bank and sitting down with one of the employees who had been at the bank for over 20 years. We were talking about how the bank worked at some level and she had this amazing breakdown of what it took. It was simple, and she remembered when the bank actually ran that way.

> You need a ledger to write down the loans, you would write down **who** was asking for the loan, **how much**, what **rate** we lent it at, and **when** they were going to pay it back.

It was probably 2007 when this story occurred, I was 6 years into being a software developer. For the year or so before that I had been working with a good friend on an open source project and we kept telling ourselves to identify the "atom" of the system. Our thought was that if we could find the key abstraction that we could then unlock a great deal of value and flexibility.

We did eventually find an abstraction for our system that allowed us to improve the entire system with a simple programmatic construct. It worked well for that system and further cemented my belief that searching for these `atoms` is valuable.

Well, that day in 2007 I found the key atom of the bank. From that point it was so easy to layer on each new process the bank did as simply an optimization of some input to process those same 4 data points.

The bank had a whole department dedicated to risk management which would use those inputs, plus more from the market to generate 30 year rate forecasts. While they needed more data than our four data points, it was effectively that plus some outside data.

The majority of the software systems were built around capturing these same numbers but at scale. It could no longer be kept on a simple pad of paper. There were just too many loans to manage. Not to mention, the desire for a means for auditing these logs to protect us from fraud. But here again, its all about protecting those key data points.

Each process at the bank was simply about protecting or enhancing the core activity. Borrowing money, and then lending it out. The systems made it scale so we could handly more customers at the same cost. The systems allowed us to engage in more complex risk scenarios while maintaining operator sanity.

> What is the atom of your business?

At my current job, working to sell SaaS Elasticsearch it comes down to a lot of the same key concepts. I still need to know **who** you are, what **version** of Elasticsearch you want, and in which **region**. Everything after that is about either scaling your volume of requests, or helping you understand how you are using Elasticsearch. The core model is pretty simple, its managing that core data that grows the complexity. The code to manage all of the versions and regions of Elasticsearch. The code to manage your payments, and credit card dunning, sending out invoices. More moving parts around the very simple thought of granting you access to Elasticsearch.
---
title: "Story of a Bank"
subtitle: "A pen, notepad, and 4 data points"
date: 2018-08-03T20:31:52-05:00
tags: []
categories: []
description: >
               How I realized the power in the right abstraction
---

I can remember working at a bank and sitting down with one of the employees who had been at the bank for over 20 years. We were talking about how the bank worked at some level and she had this amazing breakdown of what it took. It was simple, and she remembered when the bank actually ran that way.

> You need a ledger to write down the loans, you would write down **who** was asking for the loan, **how much**, what **rate** we lent it at, and **when** they were going to pay it back.

It was probably 2007 when this story occurred, I was 6 years into being a software developer. For the year or so before that I had been working with a good friend on an open source project and we kept telling ourselves to identify the "atom" of the system. Our thought was that if we could find the key abstraction that we could then unlock a great deal of value and flexibility. Well, that day in 2007 I found the key atom of the bank. From that point it was so easy to layer on each new process the bank did as simply an optimization of some input to process those same 4 data points.

- Derivitives helped protect us from rate risk when loaning out money for 30 years.
- Software systems captured the required data, and kept an audit log protecting us from fraud
- Running Black-schoales models to help us predict where rates would go
- and on and on

But each one was simply protecting or enhancing the core activity, loaning money.

What is the atom of your business?
---
title:  "Rolling Forecasts"
date:   '2019-12-29'
disqus_id: 077c0afa-4d2d-4342-b02c-cc87eabc7ff2
aliases: []
withStats: true
description: >
              Working with rolling forecasts, some thoughts on the day to day nature of running a business
              while moniting and measuring with rolling forecasts.
---

So, we are going to try and have rolling budgetary forecasts. That has become an easy enough thing for the me to manage. But my new "issue" is the anchoring of my goals. What am I going to compare my rolling forecasts to if I'm constantly generating new ones?

This may be glaringly obvious to you, and it is to me now but the answer to my problem was to declare an "anchor" forecast. In the end my "difficulty" wass just a manifestation of the tool that I wrote that currently does a poor job of maintaining a "recalled" forecast. So, the goal here is to have two managed forecasts in my system. One is the "anchor" forecast which I plan to update every quarter. The other is the continually updated rolling "current" forecast. As I write this I'm not sure if I'm going to really care about the "current" forecast as much as I'm going to care about the actuals vs the anchor forecast.

Ok, that seems pretty easy to maintain and leverage going forward. So now I need to add some diffing logic so that I can track actuals to the "anchor" forecast. Pretty basic stuff for any budgeting forecasting tool, but small steps, for me.

Currently my tool has the concept of Forecasts, I will add an attribute declaring one an anchor forecast. Then we I reforecast I can compare the rolling to the anchor. I should also be able to compare all of these to actuals.

A rather boring observation I've had is the importance of a strong chart of accounts. If I were to keep changing my chart of accounts then a lot of this work could be more complicated. I'm happy with the effort I've put into our chart of accounts so far and looking forward to futher refinement at well placed intervals.

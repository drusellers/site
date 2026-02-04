---
title: 'Strategy'
subtitle: 'A choice'
date: '2020-01-15'
tags:
  - strategy

withStats: true
description: >
  Yo, look. Strategy
draft: true
---

I was reading “What is Strategy?” by Michael Porter (December 1996) and was struck by an idea that I’m going to try and unpack here.

> A company can outperform rivals only if it can establish a difference that it can preserve. It must deliver greater value to customers or create comparable value at a lower cost, or do both. The arithmetic of superior profitability then follows: delivering greater value allows a company to charge higher average unit prices; greater efficiency results in lower average unit costs.
>
> <cite>page 5 in the PDF</cite>

First let’s establish that we have two ways of acquiring value/money from customers - either we provide a unique offering that allows us to extract greater sums or we can improve our efficiency and lower our costs relative to our competitors. This isn't new knowledge for me, this comes down to competing on value or competing on price.

At my current employer, I believe that we have been most successful by being very efficient with our operational effectiveness. This has allowed us to compete at the bottom of the price range while not digging ourselves a hole financially. Over the course of many years we can run 1,000's of Elasticsearch clusters with a compartively minimal staff to our competitors.

> Most managers describe strategic positioning in terms of their customers: “Southwest Airlines serves price- and convenience-sensitive travelers,” for example. But the essence of strategy is in the activities—choosing to perform activities differently or to perform different activities than rivals. Otherwise, a strategy is nothing more than a marketing slogan that will not withstand competition.
>
> <cite>page 7</cite+>

This is the beginning of the article that really hit home for me. That southwest has choosen to perform activities differently from their rivals.

> Operational effectiveness (OE) means performing similar activities better than rivals perform them. Operational effectiveness includes but is not limited to efficiency. It refers to any number of practices that allow a company to better utilize its inputs by, for example, reducing defects in products or developing better products faster. In contrast, strategic positioning means performing different activities from rivals’ or performing similar activities in different ways.
>
> <cite>page 5</cite>

That last bit, let’s remember that as we go.

> A full-service airline is configured to get passengers from almost any point A to any point B. To reach a large number of destinations and serve passengers with connecting flights, full service airlines employ a hub-and-spoke system centered on major airports. To attract passengers who desire more comfort, they offer first-class or business-class service. To accommodate passengers who must change planes, they coordinate schedules and check and transfer baggage. Because some passengers will be traveling for many hours, full-service airlines serve meals.
>
> Southwest, in contrast, tailors all its activities to deliver low-cost, convenient service on its particular type of route. Through fast turnarounds at the gate of only 15 minutes, Southwest is able to keep planes flying longer hours than rivals and provide frequent departures with fewer aircraft. Southwest does not offer meals, assigned seats, interline baggage checking, or premium classes of service. Automated ticketing at the gate encourages customers to bypass travel agents, allowing Southwest to avoid their commissions. A standardized fleet of 737 aircraft boosts the efficiency of maintenance.
>
> Southwest has staked out a unique and valuable strategic position based on a tailored set of activities. On the routes served by Southwest, a full-service airline could never be as convenient or as low cost.
>
> page 7

I like this story, I see us as Southwest in this story FWIW. We don’t use complicated tooling like Docker, K8s, or similar. We use base line instances, full “metal” hardware. We don’t offer a large selection of server configurations, and all of our publicly facing configurations are 3 node configurations.

You can go from paying $0/mth to $5,000/mth without the server composition changing, everything is datamaster and everything is on 3 nodes in 3 azs. This means that you can set a 3:1 shard configuration and never have to reindex in that lifetime. If you choose a poor configuration on AWS or ES and later make a change - yup, you’ll have to reindex. There has to be something to this simplicity that is truly valuable to communicate.

> Choosing a unique position, however, is not enough to guarantee a sustainable advantage. A valuable position will attract imitation by incumbents, who are likely to copy it in one of two ways.
>
> First, a competitor can reposition itself to match the superior performer. J.C. Penney, for instance, has been repositioning itself from a Sears clone to a more upscale, fashion-oriented, soft-goods retailer. A second and far more common type of imitation is straddling. The straddler seeks to match the benefits of a successful position while maintaining its existing position. It grafts new features, services, or technologies onto the activities it already performs.
>
> For those who argue that competitors can copy any market position, the airline industry is a perfect test case. It would seem that nearly any competitor could imitate any other air- line’s activities. Any airline can buy the same planes, lease the gates, and match the menus and ticketing and baggage handling services offered by other airlines.
>
> Continental Airlines saw how well Southwest was doing and decided to straddle. While maintaining its position as a full-service air- line, Continental also set out to match South- west on a number of point-to-point routes. The airline dubbed the new service Continental Lite. It eliminated meals and first- class service, increased departure frequency, lowered fares, and shortened turnaround time at the gate. Because Continental remained a full-service airline on other routes, it continued to use travel agents and its mixed fleet of planes and to provide baggage checking and seat assignments.
>
> But a strategic position is not sustainable unless there are trade-offs with other positions. Trade-offs occur when activities are incompatible. Simply put, a trade-off means that more of one thing necessitates less of another. An airline can choose to serve meals—adding cost and slowing turnaround time at the gate— or it can choose not to, but it cannot do both without bearing major inefficiencies.
>
> page 10-11

…

> Trade-offs ultimately grounded Continental Lite. The airline lost hundreds of millions of dollars, and the CEO lost his job. Its planes were delayed leaving congested hub cities or slowed at the gate by baggage transfers. Late flights and cancellations generated a thousand complaints a day. Continental Lite could not afford to compete on price and still pay standard travel-agent commissions, but neither could it do without agents for its full-service business. The airline compromised by cutting commissions for all Continental flights across the board. Similarly, it could not afford to offer the same frequent-flier benefits to travelers paying the much lower ticket prices for Lite service. It compromised again by lowering the rewards of Continental’s entire frequent-flier program. The results: angry travel agents and full-service customers.
>
> page 12

…

> Southwest’s rapid gate turnaround, which allows frequent departures and greater use of aircraft, is essential to its high-convenience, low-cost positioning. But how does Southwest achieve it? Part of the answer lies in the company’s well-paid gate and ground crews, whose productivity in turnarounds is enhanced by flexible union rules. But the bigger part of the answer lies in how Southwest performs other activities. With no meals, no seat assignment, and no interline baggage transfers, Southwest avoids having to perform activities that slow down other airlines. It selects airports and routes to avoid congestion that introduces de- lays. Southwest’s strict limits on the type and length of routes make standardized aircraft possible: every aircraft Southwest turns is a Boeing 737.
>
> What is Southwest’s core competence? Its key success factors? The correct answer is that everything matters. Southwest’s strategy involves a whole system of activities, not a collection of parts. Its competitive advantage comes from the way its activities fit and rein- force one another.
>
> Fit locks out imitators by creating a chain that is as strong as its strongest link. As in most companies with good strategies, Southwest’s activities complement one another in ways that create real economic value. One activity’s cost, for example, is lowered because of the way other activities are performed. Similarly, one activity’s value to customers can be enhanced by a company’s other activities. That is the way strategic fit creates competitive advantage and superior profitability.
>
> page 12-13

Fit. Here is where the idea really happened. What kinds of things do we do differently? We limit the selection of cluster composition is one big difference between us and AWS/Elasticsearch Cloud. What can we easily do because of that? We can move your cluster around with almost impunity. We can upgrade the hardware, side-grade the hardware, etc all with out you having to reindex or even know its happening. If we had a proper request buffer during movement you wouldn’t even drop a write.

I wonder what other items we have that are like this - some what subtle choices that when compiled together equate to a competitive advantage of some sort.

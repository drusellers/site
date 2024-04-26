---
title: 'Organizing React Code'
date: '2023-01-21'
---

> This post is mostly about me externalizing my thought process in case its helpful for future co-workers

Now that [next.js](https://nextjs.org) has shipped `v13` I am taking a moment to revisit
how I organize my code. I've "cargo culted" various approaches over the years and its high
time I take a moment to rethink my approach. Starting with `v13` there is a new `/app` directory,
and with this I'll need to move my code from the old `/pages` to the new `/app` so I can
take advantage of the newer features.

What does my current state look like? Well, I come from a habit of having a `src` directory so
my current projects look like this.

```
~/
    content/ # markdown files
    lib/     # random js functions
    public/
    scripts/ # helper scripts
    src/
        pages/
            index.tsx
        components/
            widget/
                index.tsx
                index.test.ts
        layouts/
            default.tsx
    package.json
            
```

Before I do anything else, I want to visit the value of the `/src` root directory. What is it giving me? Well it's giving me a common anchor for when I walk into the project, but it is also a thing I have to explain to new developers on the project because its becoming less common. I think this is due to JavaScript's usage of sibling files for testing. Rather than fight that, let's embrace the community's choice.

```
~/
  app/
    dashboard/
      page.js
    layout.js
    page.js
  package.json
  
```

So, now I get to lean on the existing Next.js documentation about the `/app` folder, and it should work as expected for new developers. That means that `/public` will also be where its expected. No matter what I'll have to explain the role of [`/scripts`](https://github.com/github/scripts-to-rule-them-all) so I'm ok with that. Let's talk about `/content` and `/lib`.

`/lib` is where I will keep all of the TypeScript files that aren't actively UI components. This is code that access my markdown content, configures markdoc, http clients, and other needs. I don't feel a big need to move this around, it still feels like a good fit and the nextjs compiler is working well with it already. So, our next iteration of the tree looks like

```
~/
  app/
  lib/
    cms.ts
  scripts/
  package.json
```

The next easy one is my `/content` directory which holds all of my markdown files. Since with next.js I can still easily access these files using `path.join(process.cwd(), 'content')` I'm happy to leave these files here as well. 

```
~/
  app/
  content/
    post1.md
    post2.md
  lib/
  scripts/
  package.json
```

Ok, now I'm to the meat of the work I really want to think about. `src/components` and `src/layouts`. With new version of nextjs, I no longer need to think about layouts because that is a part of the new feature set. So we can do away with that. Now we have the `src/components`. Currently, my organization of this folder is very junk drawer like. I don't have any rules around it, and frankly any rule I come up with is just for my own use.

Lately, I've been considering the idea of page archetypes, I remember originally hearing about the usage of multiple layouts from a friend working at the [ljworld](https://ljworld.com) back in 2005 or so. I've never really put it to use, but I've always been intrigued by it. I want to combine this idea with something I've learned working on ECommerce sites. In EComm land they often talk about the PLP vs the PDP, or product list page vs product detail page. Having used this vernacular I found it very clarifying as a way to quickly describe the type of page I'm working on.

I wonder if I should organize my components in way that further supports that idea.

```
~/
  components/
    pdp/
      ...detail components
    plp/
      ...list components
```

Simplistically, that works and all, but then I tend to get the junk drawer of stuff.

```
~/
  components/
    pdp/
      ...detail components
      actionBar/
    plp/
      ...list components
      actionBar/
      pagination/
      filtering/
    system/
      buttons/
      inputs/
```

What if we did a system folder, that speaks to the "design system", this could hold things that are important to that design system.

```
~/
  components/
    system/
      buttons/
      inputs/
```

I like that this tracks well with other concepts in the workflow. It also speaks to the idea that these are shared across page types.

The last item that I need to think about is how to organize items that are specific to a given page. Let's say that I have a page that shows a business entity like a `Queue`.

```
~/
  app/
    queues/
      [id]/
        page.ts    # get a single queue
      page.ts      # lists the queues
    layout.tsx     # root app layout
  lib/
    models.ts      # interface Queue { ... }
    client.ts      # http fetch to get and list queues
```

For the common items, like navigation, breadcrumbs, that exist across the entirety of the application those would all exist in system which further helps explain that a change there should change across the entire application.

The components that represent the list of queues, and the queue "row" itself, and all the little odds and ends that make up the queue list, where do I put those?

```
~/
  app/
    queues/
      [id]/
        page.ts  # get a single queue
      page.ts      # lists the queues
      
      # using the new /app allows colocation
      _list.ts     # use the _ to help highlight the partial nature
      _row.ts
```

I'm not sold on the `_` approach, but I like that I can now colocate the sub-components of a page rather than having to shuffle them all the way to components. This feels closer to the `feature folder` / `feature slice` model that I'm accustomed to from `dotnet`. 

The next step is to take this and implement it and iterate from there.

Update: Next.js now asks about a `/src` directory, so I've shifted back to that, which also makes my typescript imports a lot easier to configure. Winning.

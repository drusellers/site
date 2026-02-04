---
title: "1Password Run"
date: '2026-01-02'
tags:
  - ops
disqus_id: 019b5c93-c2f3-717d-b274-d4a1ecd0540e
aliases: []
toc: true
withStats: true
description: >
  The one where Dru learns about 1Password's CLI and some of the fun things it can do.
---

One More Reason to love [1Password](https://1password.com/) is the CLI `op` which allows me to dynamically inject secrets into my development processes.

```sh
op run \  
  --env-file=.env \  
  -- npm run dev
```

with an `.env` file that looks like

```sh {% size="text-xs" %}
API_BASE_URL=http://localhost:3001/  
VITE_CLERK_PUBLISHABLE_KEY=pk_test_b25...
CLERK_SECRET_KEY="op://LocalDev/MyApp/clerk_secret_key"
```

Now I can actually save my `.env` file in the repository - not just a `.env.example` which makes onboarding new teammates that much easier and has the bonus value of helping the new teammate understand where in 1Password these secrets are located.

To make this easy for new teammates, something you'll often see me do in all of my repositories is setup some concept of [Scripts To Rule Them All](https://github.com/github/scripts-to-rule-them-all) which in this case ends up with me putting a `scripts/run` in most repositories where I can hide this little nugget and keep my instructions simple with "just run ./scripts/run" to get up and going.

In production I'm currently loading secrets via SSM Parameters in AWS, so this is really about helping out the development side of things. If I was looking for something fancier I've also considered:

- [Infisical](https://infisical.com/)
- [Doppler](https://www.doppler.com/)
- [DotEnvX](https://dotenvx.com/)

## Vault Design
Going forward, when I'm also trying to think about how `SOC2` might play into this I would create a new Vault that is called `LocalDev` and then I think I would have one Vault entry for each application. Then each application would have all of its secrets in that entry.

```sh
op read \
  "op://LocalDev/ApplicationOne/aws_secret_key"
```

This feels like a nice way to approach things, and I can isolate local development from staging and from production. Keeping access restricted and giving me all of the audit trail I could ever want. 
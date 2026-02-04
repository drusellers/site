---
title: 'Modern Authentication'
date: '2024-05-08'
tags:
  - strategy
disqus_id: 79da5ccd-ed2d-4f16-89e5-1c0fd0910df1
aliases: []
toc: true
withStats: true
description: >
  Thoughts on a modern authentication
---

Let's build an Authentication system in dotnet that is inspired by this tweet.

[Inspo](https://twitter.com/thdxr/status/1788391705655287860)

## Definitions


- __Account:__ The parent to the workspace. You create an account, and can then make multiple workspaces under
that account.
  - __Payment__: The "credit card(s)" is/are attached at the account level 
- __Workspace:__ A data container in the application, that groups all of the data into a cohesive whole.
  - __Plan:__ The billing plan, that determines the price. These attach to the Workspace

## Context

A user (me) has multiple email address

| email address     | context           |
|-------------------|-------------------|
| me@work.com       | my work email     |
| me@gmail.com      | my personal email |
| me@sidehustle.com | my side project   |


```text
me - me@personal.com   - <nothing>
     me@work.com       - workspace 1 - work account          - <plan> - billing
                       - workspace 2 - work account          - <plan> 
     me@sidehustle.com - workspace 3 - my account            - <plan> - billing
                       - workspace 4 - my customer's account - <plan> - billing
```
## User Stories

A user (me@work.com) wants to join a workspace for work.
- I'm issued an invite to the workspace with me@work.com

A user (me@sidehustle.com) wants to start a workspace for their side hustle :tm:
- create a sidehustle account (as me@sidehustle.com) 
- create the workspace (sidehustle)

## Models

Identity: This is `me`. Why aren't we calling this a user?

```yaml
identity:
  id: <uuid>
  name: Dru Sellers
  emails: []
```
Email: An `Identity` has 1 or more email addresses. The address needs a unique constraint on it, that includes some kind of a deleted stamp, in case an email gets reused.

```yaml
email:
  id: <uuid>
  address: me@work.com
  verified_at: 2024-01-01T00:00:00
  identity_id: <uuid>
```

> **Usernames**
> The app we are building is not a social app, I don't need to make a name that expresses my individuality, so we are 
> going to stick with an email address. I can have multiple email addresses that all point to me.
>
> https://twitter.com/thdxr/status/1788285082827903126

Workspace

```yaml
workspace:
  id: <uuid>
  name: A Name
  plan: The subscribed plan
  account_id: <uuid>
```

Member / Membership: This is a many to many table that binds the identity/user to a workspace . All workspace "email" notifications go to the associated email (a la GitHub)

```yaml
membership:
  id: <uuid>
  workspace_id: <uuid>
  email_id: <uuid>
  name_override: 'My Professional Name'
  avatar: blah
```
Account: this is the root of the data model. 

```yaml
account:
  id: <uuid>
  name: 'A name'
  workspaces: []
  stripe_customer_id: <c_aoeu>
```

Plan: plan is the billing details

```yaml
plan:
  id: <uuid>
  name: Super Plan
  price_in_cents: 100_00
```

You can get all of an Account's plans by enumerating the workspaces.

Invitations:

```yaml
invitation:
  id: <uuid>
  account_id: <uuid>
  workspace_id: <uuid>
  email: 'me@work.com'
  sent_at:
```

## JWT Claims

- user_id
- workspace_id
- account_id

```csharp
var payload = new Dictionary<string, string>();
payload.Add(AppClaimTypes.UserId, user.Id.ToString());
payload.Add(AppClaimTypes.WorkspaceId, workspace.Id.ToString());
payload.Add(AppClaimTypes.AccountId, account.Id.ToString());
// wrap in a JWT or ASP.Net Claims Principal
```

## Authentication Mechanisms

- SSO via Google Workspace

- Username / Password




# How to switch workspaces roles

Just resign in with the new variables. The user ID is the only thing that shouldn't change at all. The others could all change.

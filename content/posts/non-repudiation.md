---
title:  "Non-Repudiation"
date:   2018-09-23 05:58:21
categories: patterns
tags:
- patterns
description: >
              An under utilized goal to prevent fraud

---

Non-repudiation is a property of a software system that ensures that a party in dispute
cannot refute the validity of a statement or contract. This is a powerful part of any
software system that can help us reason about the state of the system. For any critical
part of your project having a way to know what changed and why can give you the insight
you need to solve most problems.

The following are some pseudo-code samples of how to implment this as a pattern in your
system.

> For this I'm assuming a standard relational database model

## Relationships

This is a form of version control. Your primary domain model is 'designed' with two tables. Let's
say we are modelling a "subscription" in the application. A subscription connects an account
to a plan. The plan has how much should be charged each month. Now, this could be modeled as a
direct FK releationship `account.plan_id` but that would lose information overtime. Instead we want
to model it as something that can change. `subscriptions(id, account_id, plan_id)` as an example.
Now we can see each change to the subscription relationship over time. Especially if we add some
date fields `subscriptions(id, account_id, plan_id, effective_at)`. This is the minimum amount
of data, and you could denormalize `effective_at` into `started_at` and `ended_at` to simplify
queries as well.

This is one piece of the puzzle that I think we do a poor job of teaching people. The power
of the relationship table.

Another powerful feature of these tables is you can then "lock it down" by only allowing reads /
inserts and not allowing updates to the table (this is one reason why having only an `effective_at`
column is powerful). Now we have a good way to trust the system. The application can't change
data, it can only append data. This is in alignment with event modeled systems as well, so we can
extract some of the value from them with out a whole hog commitment.

## Generations

We can actually do the same thing for our core models as well. Lets take account, and make it a more
protected system. The basic domain model will typically look like:

```
CREATE TABLE accounts (
  id SERIAL NOT NULL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  ... other fields as needed
);
```

But you could instead model it like this, and capture change over time:

```
CREATE TABLE accounts (
  id SERIAL NOT NULL PRIMARY KEY,

);
CREATE TABLE account_generations (
  id SERIAL NOT NULL PRIMARY KEY,
  account_id INT NOT NULL REFERENCES (accounts.id),
  slug TEXT NOT NULL,
  effective_at TIMESTAMP NOT NULL
  ... other fields as needed
);

CREATE FUNCTION unique_over_time() RETURNS trigger AS $unique_over_time$
  BEGIN
    -- verify that slug is unique at this timepoint
    IF EXISTS (
      SELECT first_value(slug) OVER (PARTITION BY account_id ORDER BY effective_at DESC) AS current_slug
      FROM account_generations
      WHERE effective_at < NOW() AND slug = NEW.slug) THEN
      RAISE EXCEPTION 'non-unique slug';
    ELSE
      RETURN NEW;
    END IF;
  END;
$unique_over_time$ LANGUAGE plpgsql;

CREATE TRIGGER unique_over_time BEFORE INSERT OR UPDATE ON account_generations
    FOR EACH ROW EXECUTE PROCEDURE unique_over_time();
```

Notice we still keep the uniquness of the slugs at any point in time by using a trigger function.
This isn't the most compelling data model to work with from an OO/ORM perspective, but this
does have a level of data integrity that is better than what most programming languages would give
you.

The trick left up to the reader is how to best leverage these kinds of features in your
own applications. I don't imagine this is something that should be used on every
model of your application, but for key entities/tables/etc, it can provide a wonderful
amount of data to understand how your system's data evolved.
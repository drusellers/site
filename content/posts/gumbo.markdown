---
title:  "Gumbo"
date:   2013-06-08 09:58:21
tags:
- Idea
disqus_id: 714f8e9c-780d-4d22-83b4-8d8bedc455ef
withStats: true
aliases: [
  "/idea/2013/06/08/gumbo.html"
]
draft: true
---

I work in a language that is strongly and statically typed. I have been working
with this language for a very long time. I am often envious of dynamic languages
as they can more easily bend and mold to fit certain problems. Often I am faced
with problems that seem like a great fit for these languages, but I often need
my solution to fit and work with my existing solution and not contained in
another project or application.

One of these is what my product owner likes to call 'Flexible Attributes.' This
is almost a text book case of something that you don't often do in static languages
- add properties to your objects. But our team took the challenge on, and this
is my attempt to document how we solved the problem using the C# language and
building it on top of a relational database.

## Specs

Project Type
:Existing application that needs to stay on C# but wants to have dynamic properties

Investment Time
:About 6 months of work

## The Pieces

C#

MSSQL / PostGRES

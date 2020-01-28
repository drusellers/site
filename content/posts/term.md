---
title: "Terms"
subtitle: "The Atom of Search"
date: 2019-05-18T20:31:52-05:00
tags: ['search']
categories: 'search'
withStats: true
description: >
              In my attempt to learn more about full text search I'm going
              through and documenting in my own words some of the key elements
              supporting full text search analysis.

---

In the search world the foundational building block of it all is the "term". This is, simplistically, a single word that is stored in the "postings" file. If you were to index the content "The quick brown fox jumps over the lazy dog" you would expect to get the following terms: `The`, `quick`, `brown`, `fox`, `jumps`, `over`, `the`, `lazy`, `dog`. This content is stored in a `field` in a `document`.

```js
// the document
{
  // a field
  content: "The quick brown fox jumps over the lazy dog"
}
```

Assuming this is document `1`, then our document would get indexed into something like.

```txt
brown: [1]
dog:   [1]
fox:   [1]
jumps: [1]
over:  [1]
quick: [1]
The:   [1]
the:   [1]
```

Notice that `The` and `the` are both listed in the postings because they are different words to a computer. Because of this we will want to "normalize" the content before indexing it. In this case we are going to lowercase everything first. The normalized index looks like:

```txt
brown: [1]
dog:   [1]
fox:   [1]
jumps: [1]
over:  [1]
quick: [1]
the:   [1]
```

Much better. Now lets index another document:

```js
{
  content: "The dog chases the cat over the hill"
}
```

The updated index looks like:

```txt
brown:  [1]
cat:    [2]
chases: [2]
dog:    [1, 2]
fox:    [1]
hill:   [2]
jumps:  [1]
over:   [1, 2]
quick:  [1]
the:    [1, 2]
```

With each new document we repeat this process and add more terms and more document ids to those terms.

> This is a very simple "inverted index." A traditional b-tree index in a database is a forward index that maps keys to their values. Notice in this we are going from a value to the id, hence "inverted."

Its worth pointing out that `dog`, `over`, and `the` were not duplicated in the index, all we did was add a another doc id to the list for the term. This is a key reason why maintaining and curating your terms is a very important part of  managing a search engine. We don't want low value words like `the` getting put into our index. These low value words are called "stop words" and are normally filterd out as they provide little value in the standard  search (of course your problem may very in needs).

When you go to query the system, your query for `dog` runs through the lowercaser, then it looks up `dog` in the postings file, finds document ids `1`, and `2` - pulls those out of "storage" and returns them back to you.

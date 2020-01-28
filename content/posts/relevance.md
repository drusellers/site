---
title: "Relevancy"
subtitle: "The Crowbar of Search"
date: 2019-05-18T20:31:52-05:00
draft: true
tags: ['search']
categories: 'search'
withStats: true
description: >
              In my attempt to learn more about full text search I'm going
              through and documenting in my own words some of the key elements
              supporting full text search analysis.

---

Relevancy starts in full text search indices with TF/IDF

The simple postings file:

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

This is actually represented as a "term" dictionary and the "postings" list.

The "term dictionary" holds a compact representation of all terms maps them to
a key, so that we can efficiently store the terms in later parts of the system.

```txt
brown:  0
cat:    1
chases: 2
dog:    3
fox:    4
hill:   5
jumps:  6
over:   7
quick:  8
the:    9
```

and now the "postings list" looks like

```txt
0: [1]
1: [2]
2: [2]
3: [1, 2]
4: [1]
5: [2]
6: [1]
7: [1, 2]
8: [1]
9: [1, 2]
```

Now that we have converted the "text" to "numbers" we can apply all of the same
tricks we do with database indexes to speed up the look up.

The last piece I want to talk about is the `term frequency` file
and the `larger corpus freq` file - where ever that is.

So, now it becomes trivially easy to calculate TF-IDF

So a naive term frequency would just count the number of terms in a document.
There are definitely more options but for today let's keep it simple. Finding
the `term frequency` is easily located in the frequency file.

document frequency is also easily found in XXXX. document frequency is
calculated take the log of the number of documents containing the term over the total number of documents `log(doc_count_with_term / corpus_count)`.

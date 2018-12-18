import React, { useState, useEffect } from 'react';

import SearchBox from './SearchBox.jsx';
import SearchResultList from './SearchResultList.jsx';

const URL = process.env.ES_READ_URL;

function getQuery(query) {
  return {
    "suggest": {
      "title-suggest": {
        "prefix": query,
        "completion": {
          "field": "suggest"
        }
      }
    },
    "query": {
      "multi_match": {
        "query": query,
        "fields": ["description", "summary", "title"]
      }
    },
    "stored_fields": ['title', 'description', 'summary', 'url'],
    "highlight": {
      "fields": {
        "text": {}
      }
    }
  }
}

// should return a promise whose happy state is an arary of hits
function executeQuery(query) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  return fetch(`${URL}/posts/_search`, {
    method: 'POST',
    body: JSON.stringify(getQuery(query)),
    headers: headers
  }).then(response => response.json())
    .then(body => {
      const hits = body.hits.hits || [];
      const options = body.suggest['title-suggest'][0].options || [];
      return Promise.resolve(hits.length == 0 ? options : hits);
    });
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);

  useEffect(() => {
    executeQuery(query, setHits)
      .then(hits => {
        setHits(hits);
      });;
  }, [query]);

  return (
    <div>
      <SearchBox query={query} hits={hits} onQueryChange={setQuery} />
      <SearchResultList hits={hits} />
    </div>
  );
}
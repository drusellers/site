import React, { useState, useEffect } from 'react';

import SearchBox from './SearchBox.jsx';
import SearchResultList from './SearchResultList.jsx';
import es from './es.js';

export default function Search() {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);

  useEffect(() => {
    es.query(query, setHits)
      .then(hits => {
        setHits(hits);
      });;
  }, [query]);

  return (
    <div>
      <SearchBox query={query} onQueryChange={setQuery} />
      <SearchResultList hits={hits} />
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

import SearchBox from './SearchBox.jsx';
import SearchResultList from './SearchResultList.jsx';
import es from './es.js';

export default function Search() {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [categories, setCategories] = useState([]);

  const [debouncedQuery] = useDebounce(query, 500);

  useEffect(() => {
    es.query(debouncedQuery, setHits)
      .then(result => {
        console.log("result", result)
        setHits(result.hits);
      });;
  }, [debouncedQuery]);

  return (
    <div className="block">
    <div style={{'position':'relative'}}>
      <SearchBox query={query} onQueryChange={setQuery} />
      <SearchResultList hits={hits} />
    </div>
    </div>
  );
}

import React from 'react';

import SearchResult from './SearchResult.jsx';

let SearchResultList = function ({ hits }) {
  if (hits.length === 0) {
    return null;
  }

  const hitsUi = hits.map((hit) => {
    return <SearchResult key={hit['_id']} hit={hit} />;
  });

  return (
    <div className="dds-search-results ba b--black-10 shadow-5 cf">
      <ul className="list ma0 ph3 pb3 cf">
        {hitsUi}
      </ul>
    </div>
  );
}

export default SearchResultList;
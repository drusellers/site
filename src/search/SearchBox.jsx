import React from 'react';

function SearchBox({ query, onQueryChange }) {
  return (
    <div className="dds-search-input">
      <div className="dds-search-icon">
        <i className="far fa-search"></i>
      </div>
      <div className="dds-search-input-wrapper">
        <input type="text"
          aria-label="Search Posts"
          placeholder="Search Posts"
          onChange={e => {
            var q = e.target.value;
            onQueryChange(q);
          }}
          value={query} />
      </div>
    </div>
  );
}

export default SearchBox;

import React from 'react';

function SearchBox({ query, onQueryChange }) {
  return (
    <div className="fl w-100 dds-search-input br2">
      <div className="fl pa2" style={{ width: '4%' }}>
        <i className="far fa-search"></i>
      </div>
      <div className="fl pa2" style={{ width: '96%' }}>
        <input type="text"
          className="input-reset f4 ba b--white w-100 db"
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

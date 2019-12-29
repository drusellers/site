import React from 'react';

function SearchBox({ query, onQueryChange }) {
  return (
    <div className="fl w-100 dds-search-input br2" style={{ display: 'flex' }}>
      <div className="fl" style={{ width: '35px', paddingTop: '11px', paddingLeft: '1rem' }}>
        <i className="far fa-search"></i>
      </div>
      <div className="fl pa2" style={{ flex: 1 }}>
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

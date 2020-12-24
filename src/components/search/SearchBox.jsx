import React from 'react';

function SearchBox({ query, onQueryChange }) {
  return (
    <div className="bg-white shadow-inner flex w-full rounded">
      <div className="float-left" style={{paddingTop: '11px', paddingLeft: '1rem', width: '35px'}}>
        <i className="far fa-search"></i>
      </div>
      <div className="float-left p-3 flex w-full">
        <input type="text"
          aria-label="Search Posts"
          placeholder="Search Posts"
          className="border-0 bg-white text-xl w-full block appearance-none focus:outline-none"
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

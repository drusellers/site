import React from 'react'

function SearchBox({ query, onQueryChange }) {
  return (
    <div className="flex w-full rounded bg-white shadow-inner">
      <div
        className="float-left"
        style={{ paddingTop: '11px', paddingLeft: '1rem', width: '35px' }}
      >
        <i className="far fa-search"></i>
      </div>
      <div className="float-left flex w-full p-3">
        <input
          type="text"
          aria-label="Search Posts"
          placeholder="Search Posts"
          className="block w-full appearance-none border-0 bg-white text-xl focus:outline-none"
          onChange={(e) => {
            var q = e.target.value
            onQueryChange(q)
          }}
          value={query}
        />
      </div>
    </div>
  )
}

export default SearchBox

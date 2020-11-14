import React from 'react';

// hit here is a hit from the ES payload
export default function SearchResult({ hit }) {
  return (<li>
    <h2>
      <a href={hit.fields.url[0]} className="link blue">
        {hit.fields.title[0]}
      </a>
    </h2>
    <p className="measure lh-copy f5">{hit.fields.summary[0]}</p>
  </li>);
}

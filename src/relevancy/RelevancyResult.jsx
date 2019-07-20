import React from 'react';

// hit here is a hit from the ES payload
export default function SearchResult({ hit }) {
  return (<tr className="striped--light-gray">
    <td class="pv2 ph3">{hit.fields.title[0]}</td>
    <td class="pv2 ph3">{hit['_score']}</td>
  </tr>);
}

import React from 'react';

import RelevancyResult from './RelevancyResult.jsx';

let SearchResultList = function ({ hits }) {
  if (hits.length === 0) {
    return null;
  }

  const hitsUi = hits.map((hit) => {
    return <RelevancyResult key={hit['_id']} hit={hit} />;
  });

  return (
    <table className="dds-relevancy-results collapse ba br2 b--black-10 pv2 ph3">
      <tr className="striped--light-gray">
        <th className="tl f6 fw6 ttu pv2 ph3">Document</th>
        <th className="tr f6 fw6 ttu pv2 ph3">Score</th>
      </tr>
      {hitsUi}
    </table>
  );
}

export default SearchResultList;

import React from "react";

import SearchResult from "./SearchResult.jsx";
import styles from "./SearchResultList.module.css";

let SearchResultList = function ({ hits }) {
	if (hits.length === 0) {
		return null;
	}

	const hitsUi = hits.map((hit) => {
		return <SearchResult key={hit["_id"]} hit={hit} />;
	});

	return (
		<div className={styles["dds-search-results"]}>
			<ul className="list ma0 ph3 pb3 cf">{hitsUi}</ul>
		</div>
	);
};

export default SearchResultList;

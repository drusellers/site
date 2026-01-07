"use client";

import { ReactNode, useState } from "react";

type Props = {
	count: number;
	children: ReactNode;
};
export default function Archived({ children, count }: Props) {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className={"flex flex-col"}>
			<div>
				<button
					className={"text-gray-400 hover:text-gray-600"}
					type={"button"}
					onClick={() => {
						setExpanded(!expanded);
					}}
				>
					▷ Archived Experience {count} items
				</button>
			</div>

			{expanded ? children : null}
		</div>
	);
}

import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export default function OneColumnGrid({ children }: Props) {
	return (
		<div className={"grid grid-cols-8 gap-x-4"}>
			<div className={"col-span-1"}></div>
			<div className={"col-span-6"}>{children}</div>
			<div className={"col-span-1"}></div>
		</div>
	);
}

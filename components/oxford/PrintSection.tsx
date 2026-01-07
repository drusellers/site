import React from "react";

type Props = {
	children: React.ReactNode;
	show?: boolean;
};

export default function PrintSection({ children, show }: Props) {
	let css = "hidden print:block";
	if (show) css = "block";

	return <div className={css}>{children}</div>;
}

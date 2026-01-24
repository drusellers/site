import type React from "react";
import { classNames } from "@/lib/util";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function PageTitle({ children, className = "" }: Props) {
	let length = 0;
	if (typeof children === "string") {
		length = Math.max(...children.split(" ").map((w) => w.length));
	}

	return (
		<div className={calculatePageTitleClasses(length, className)}>
			{children}
		</div>
	);
}

export function calculatePageTitleClasses(
	length: number,
	className: string | undefined = "",
): string {
	const base = "font-bold font-page-title text-text-page-title uppercase";

	let fontSize = "text-8xl lg:text-[220px] xl:text-[312px] leading-[75%] pb-6";
	if (length > 14) {
		fontSize = "text-8xl lg:text-[200px] xl:text-[252px] leading-[75%] pb-4";
	}

	return classNames(fontSize, base, className);
}

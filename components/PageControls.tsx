"use client";

import { useNavigate } from "@tanstack/react-router";
import { useHotkeys } from "react-hotkeys-hook";
import Link from "@/components/AppLink";

type Params = {
	prevHref?: string;
	nextHref?: string;
};
export default function PageControls({ prevHref, nextHref }: Params) {
	const navigate = useNavigate();

	useHotkeys("leftArrow", () => {
		if (prevHref) navigate({ to: prevHref });
	});

	useHotkeys("rightArrow", () => {
		if (nextHref) navigate({ to: nextHref });
	});

	return (
		<div className={"flex flex-col space-y-2"}>
			<div className={"flex flex-row justify-between"}>
				<PageButton text={"< Prev"} href={prevHref} />
				<PageButton text={"Next >"} href={nextHref} />
			</div>
			<div className={"text-gray-500 text-xs"}>
				You can use the arrow keys to navigate
			</div>
		</div>
	);
}

type ButtonParams = {
	text: string;
	href?: string;
};

function PageButton({ href, text }: ButtonParams) {
	if (href === undefined) return <></>;

	return (
		<div className={"px-4 py-2 bg-oxford-100 rounded-sm"}>
			<Link
				href={href}
				className="text-oxford-900 hover:text-oxford-700 font-medium"
			>
				{text}
			</Link>
		</div>
	);
}

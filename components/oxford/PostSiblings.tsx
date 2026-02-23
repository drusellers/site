import Link from "next/link";
import type { PostSibling } from "@/lib/cms.posts";
import { classNames } from "@/lib/util";

type Props = {
	prev?: PostSibling;
	next?: PostSibling;
};

export default function PostSiblings({ prev, next }: Props) {
	return (
		<div
			className={classNames(
				"mt-8 flex flex-row  justify-between",
				"border-t border-layout-divider",
				"divide-x divide-layout-divider",
			)}
		>
			<Tile tile={prev} mode={"prev"} />
			<Tile tile={next} mode={"next"} />
		</div>
	);
}

function Tile({ tile, mode }: { tile?: PostSibling; mode: "prev" | "next" }) {
	const baseClasses = classNames(
		"flex-1 px-6 py-4",
		"text-link-color hover:text-link-color-hover",
		"bg-block-color hover:bg-block-color-hover transition-colors",
		mode === "prev" ? "" : "text-right",
	);

	if (tile) {
		return (
			<Link href={tile.href} className={baseClasses}>
				<div className={"uppercase text-xs text-gray-500"}>{mode}</div>
				<div>{tile.title}</div>
			</Link>
		);
	}

	const emptyText = mode === "prev" ? "(at the beginning)" : "(at the end)";

	return (
		<div className={classNames(baseClasses, "text-gray-400")}>
			<div className={"uppercase text-xs"}>{mode}</div>
			<div>{emptyText}</div>
		</div>
	);
}

import Link from "next/link";
import { classNames } from "@/lib/util";
import type { PostSibling } from "@/lib/cms.posts";

type Props = {
	prev?: PostSibling;
	next?: PostSibling;
};

export default function PostSiblings({ prev, next }: Props) {
	return (
		<div
			className={
				"border-t border-[#C6D3D5] flex flex-row divide-x divide-[#C6D3D5] justify-between mt-8"
			}
		>
			<Tile tile={prev} mode={"prev"} />
			<Tile tile={next} mode={"next"} />
		</div>
	);
}

function Tile({ tile, mode }: { tile?: PostSibling; mode: "prev" | "next" }) {
	const baseClasses = classNames(
		"flex-1 px-6 py-4",
		mode === "prev" ? "" : "text-right",
	);

	if (tile) {
		return (
			<Link
				href={tile.href}
				className={classNames(
					baseClasses,
					"hover:bg-gray-50 transition-colors",
				)}
			>
				<div className={"uppercase text-xs text-gray-500"}>{mode}</div>
				<div className={"text-gray-900"}>{tile.title}</div>
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

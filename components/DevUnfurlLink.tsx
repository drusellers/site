"use client";

import { usePathname } from "next/navigation";

export function DevUnfurlLink() {
	const pathname = usePathname();

	if (process.env.NODE_ENV !== "development") {
		return null;
	}

	return (
		<a
			href={`/unfurl?path=${encodeURIComponent(pathname)}`}
			target="_blank"
			rel="noopener noreferrer"
			className="fixed bottom-16 right-4 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-full hover:bg-gray-700 transition-colors shadow-lg"
		>
			Test Unfurl ↗
		</a>
	);
}

"use client";

import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";

export function DevUnfurlLink() {
	const pathname = usePathname();

	if (process.env.NODE_ENV !== "development") {
		return null;
	}

	return (
		<div className="fixed bottom-16 right-4">
			<Button
				variant="primary"
				size="xs"
				onClick={() => {
					window.open(
						`/unfurl?path=${encodeURIComponent(pathname)}`,
						"_blank",
						"noopener,noreferrer",
					);
				}}
				className="shadow-lg"
			>
				Test Unfurl ↗
			</Button>
		</div>
	);
}

"use client";

import { useRouterState } from "@tanstack/react-router";
import Button from "@/components/ui/Button";

export function DevUnfurlLink() {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	if (!import.meta.env.DEV) {
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

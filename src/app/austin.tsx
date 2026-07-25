import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/austin")({
	beforeLoad: () => {
		throw redirect({ to: "/atx" });
	},
});

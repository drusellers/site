import { createFileRoute } from "@tanstack/react-router";
import PageTitle from "@/components/oxford/PageTitle";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_design-system/design-system/")({
	head: () =>
		pageHead({
			title: "Playground",
			description:
				"A collaborative design dashboard for discussing and creating designs",
			url: "https://drusellers.com/design-system",
		}),
	component: Playground,
});

function Playground() {
	return (
		<div>
			<div className="mb-8">
				<PageTitle>Design System</PageTitle>
				<p className="text-gray-600 dark:text-gray-400">
					Collaborative space for design exploration and system development.
					Build and test components, colors, and typography patterns.
				</p>
			</div>
		</div>
	);
}

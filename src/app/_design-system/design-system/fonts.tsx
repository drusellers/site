import { createFileRoute } from "@tanstack/react-router";
import FontShowcase from "@/components/designSystem/FontShowcase";
import PageTitle from "@/components/oxford/PageTitle";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_design-system/design-system/fonts")({
	head: () =>
		pageHead({
			title: "Fonts",
			description: "Font showcase and rationale for the design system",
			url: "https://drusellers.com/design-system/fonts",
		}),
	component: FontsPage,
});

function FontsPage() {
	return (
		<div>
			<div className="mb-8">
				<PageTitle>Fonts</PageTitle>
				<p className="text-gray-600 dark:text-gray-400">
					A showcase of the fonts used throughout the website, including sizes,
					weights, and the rationale behind each font choice.
				</p>
			</div>

			<FontShowcase />
		</div>
	);
}

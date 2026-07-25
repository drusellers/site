import { createFileRoute } from "@tanstack/react-router";
import ButtonShowcase from "@/components/designSystem/ButtonShowcase";
import PageTitle from "@/components/oxford/PageTitle";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute(
	"/_design-system/design-system/components",
)({
	head: () =>
		pageHead({
			title: "Components - Design System",
			description: "UI components and patterns for the design system",
			url: "https://drusellers.com/design-system/components",
		}),
	component: Components,
});

function Components() {
	return (
		<div>
			<div className="mb-8">
				<PageTitle>Components</PageTitle>
				<p className="text-gray-600 dark:text-gray-400">
					UI components and patterns for the design system.
				</p>
			</div>

			<div className="space-y-6">
				<div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
					<h3 className="text-lg font-medium mb-6 text-gray-900 dark:text-gray-100">
						Button Showcase
					</h3>
					<ButtonShowcase />
				</div>
			</div>
		</div>
	);
}

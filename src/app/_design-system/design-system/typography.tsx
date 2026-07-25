import { createFileRoute } from "@tanstack/react-router";
import TypographyGuide from "@/components/designSystem/TypographyGuide";
import PageTitle from "@/components/oxford/PageTitle";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute(
	"/_design-system/design-system/typography",
)({
	head: () =>
		pageHead({
			title: "Typography",
			description:
				"Typography guidelines and CSS classes for the design system",
			url: "https://drusellers.com/design-system/typography",
		}),
	component: TypographyPage,
});

function TypographyPage() {
	return (
		<div>
			<div className="mb-8">
				<PageTitle>Typography</PageTitle>
				<p className="text-gray-600">
					Comprehensive typography guidelines showing font usage, CSS classes,
					and visual examples for all text elements in the design system.
				</p>
			</div>

			<TypographyGuide />
		</div>
	);
}

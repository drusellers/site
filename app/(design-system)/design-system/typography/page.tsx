import type { Metadata, ResolvingMetadata } from "next";
import TypographyGuide from "@/components/designSystem/TypographyGuide";
import PageTitle from "@/components/oxford/PageTitle";
import { BASE_URL } from "@/lib/consts";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(
	_: unknown,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	return buildMetadata(
		{
			title: "Typography",
			description:
				"Typography guidelines and CSS classes for the design system",
			url: `${BASE_URL}/design-system/typography`,
		},
		await parent,
	);
}

export default function TypographyPage() {
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

import type { Metadata, ResolvingMetadata } from "next";
import FontShowcase from "@/components/designSystem/FontShowcase";
import PageTitle from "@/components/oxford/PageTitle";
import { BASE_URL } from "@/lib/consts";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(
	_: unknown,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	return buildMetadata(
		{
			title: "Fonts",
			description: "Font showcase and rationale for the design system",
			url: `${BASE_URL}/design-system/fonts`,
		},
		await parent,
	);
}

export default function FontsPage() {
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

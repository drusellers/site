import type { Metadata, ResolvingMetadata } from "next";
import ColorPalette from "@/components/designSystem/ColorPalette";
import OKLCHExplorer from "@/components/designSystem/OKLCHExplorer";
import PageTitle from "@/components/oxford/PageTitle";
import { BASE_URL } from "@/lib/consts";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(
	_,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	return buildMetadata(
		{
			title: "Colors - Design System",
			description:
				"Color palette and OKLCH color space explorer for the design system",
			url: `${BASE_URL}/design-system/colors`,
		},
		await parent,
	);
}

export default function Colors() {
	return (
		<div>
			<div className="mb-8">
				<PageTitle>Colors</PageTitle>
				<p className="text-gray-600 dark:text-gray-400">
					Color palette and OKLCH color space explorer for the design system.
				</p>
			</div>

			<div className="flex flex-col space-y-6 px-4">
				<div className="">
					<OKLCHExplorer />
				</div>

				<div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
					<ColorPalette />
				</div>
			</div>
		</div>
	);
}

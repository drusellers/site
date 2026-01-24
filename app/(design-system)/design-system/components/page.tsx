import type { Metadata, ResolvingMetadata } from "next";
import ButtonShowcase from "@/components/designSystem/ButtonShowcase";
import PageTitle from "@/components/oxford/PageTitle";
import { BASE_URL } from "@/lib/consts";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(
	_,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	return buildMetadata(
		{
			title: "Components - Design System",
			description: "UI components and patterns for the design system",
			url: `${BASE_URL}/design-system/components`,
		},
		await parent,
	);
}

export default function Components() {
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

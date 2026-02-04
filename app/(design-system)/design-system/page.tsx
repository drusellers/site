import type { Metadata, ResolvingMetadata } from "next";

import PageTitle from "@/components/oxford/PageTitle";
import { BASE_URL } from "@/lib/consts";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(
	_: unknown,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	return buildMetadata(
		{
			title: "Playground",
			description:
				"A collaborative design dashboard for discussing and creating designs",
			url: `${BASE_URL}/playground`,
		},
		await parent,
	);
}

export default function Playground() {
	return (
		<div>
			{/* Overview Section */}
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

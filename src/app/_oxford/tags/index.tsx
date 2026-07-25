import { createFileRoute } from "@tanstack/react-router";
import Link from "@/components/AppLink";
import PageTitle from "@/components/oxford/PageTitle";
import TwoColumnGrid from "@/components/oxford/TwoColumnGrid";
import { getTagsIndexData } from "@/src/data/content";

export const Route = createFileRoute("/_oxford/tags/")({
	loader: async () => getTagsIndexData(),
	component: Tags,
});

function Tags() {
	const allTags = Route.useLoaderData();

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>Tags</PageTitle>
			<TwoColumnGrid>
				<ul>
					{Object.keys(allTags).map((tag) => {
						return (
							<li key={tag}>
								<Link href={`/tags/${tag}`} className="text-blue-500">
									<i className="fal fa-tag"></i> {tag}
								</Link>{" "}
								<span className="text-xs">({allTags[tag]})</span>
							</li>
						);
					})}
				</ul>
			</TwoColumnGrid>
		</div>
	);
}

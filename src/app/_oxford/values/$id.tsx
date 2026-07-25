import { createFileRoute } from "@tanstack/react-router";
import PageTitle from "@/components/oxford/PageTitle";
import TwoColumnGrid from "@/components/oxford/TwoColumnGrid";
import { getValuePageData } from "@/src/data/content";

export const Route = createFileRoute("/_oxford/values/$id")({
	loader: async ({ params }) => getValuePageData({ data: params.id }),
	component: ValuePage,
});

function ValuePage() {
	const postData = Route.useLoaderData();

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>{postData.title}</PageTitle>
			<TwoColumnGrid>
				<div className="nested nested-copy-line-height nested-links nested-copy-separator">
					<div className="pa4">
						<div
							className="f5 f4-m f3-l lh-copy measure mt0 prose prose-drusellers"
							// biome-ignore lint/security/noDangerouslySetInnerHtml: that's the whole point
							dangerouslySetInnerHTML={{ __html: postData.html }}
						/>
					</div>
				</div>
			</TwoColumnGrid>
		</div>
	);
}

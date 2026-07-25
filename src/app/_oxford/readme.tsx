import { createFileRoute } from "@tanstack/react-router";
import { RenderHtml } from "@/components/Markdown";
import PageTitle from "@/components/oxford/PageTitle";
import TwoColumnGrid from "@/components/oxford/TwoColumnGrid";
import { getReadmePageData } from "@/src/data/content";

export const Route = createFileRoute("/_oxford/readme")({
	loader: async () => getReadmePageData(),
	component: Readme,
});

function Readme() {
	const { html } = Route.useLoaderData();

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>README</PageTitle>
			<TwoColumnGrid>
				<RenderHtml>{html}</RenderHtml>
			</TwoColumnGrid>
		</div>
	);
}

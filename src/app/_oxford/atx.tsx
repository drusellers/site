import { createFileRoute } from "@tanstack/react-router";
import { RenderHtml } from "@/components/Markdown";
import OneColumnGrid from "@/components/oxford/OneColumnGrid";
import PageTitle from "@/components/oxford/PageTitle";
import { pageHead } from "@/lib/seo";
import { getAtxPageData } from "@/src/data/content";

export const Route = createFileRoute("/_oxford/atx")({
	loader: async () => getAtxPageData(),
	head: () =>
		pageHead({
			title: "Visiting ATX",
			description:
				"Thoughts and notes about things to do when visiting Austin, TX",
			url: "https://drusellers.com/atx",
		}),
	component: AtxPage,
});

function AtxPage() {
	const atx = Route.useLoaderData();

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>ATX</PageTitle>

			<OneColumnGrid>
				<RenderHtml>{atx.html}</RenderHtml>
			</OneColumnGrid>
		</div>
	);
}

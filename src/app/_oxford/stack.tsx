import { createFileRoute } from "@tanstack/react-router";
import { RenderHtml } from "@/components/Markdown";
import PageTitle from "@/components/oxford/PageTitle";
import TwoColumnGrid from "@/components/oxford/TwoColumnGrid";
import { pageHead } from "@/lib/seo";
import { getStackPageData } from "@/src/data/content";

export const Route = createFileRoute("/_oxford/stack")({
	loader: async () => getStackPageData(),
	head: () =>
		pageHead({
			title: "The Stack",
			description: "A reflection on how I organize my life",
			url: "https://drusellers.com/stack",
		}),
	component: Stack,
});

function Stack() {
	const page = Route.useLoaderData();

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>Stack</PageTitle>
			<TwoColumnGrid sidebar={<>as of 2023-12-17</>}>
				<RenderHtml>{page.html}</RenderHtml>
			</TwoColumnGrid>
		</div>
	);
}

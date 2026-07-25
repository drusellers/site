import { createFileRoute } from "@tanstack/react-router";
import { RenderHtml } from "@/components/Markdown";
import PageTitle from "@/components/oxford/PageTitle";
import PostMetadata from "@/components/oxford/PostMetadata";
import { getHomePageData } from "@/src/data/content";

export const Route = createFileRoute("/_oxford/")({
	loader: async () => getHomePageData(),
	component: Home,
});

function Home() {
	const { postData, seriesItems } = Route.useLoaderData();

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>{postData.title}</PageTitle>
			<div className={"grid grid-cols-8 gap-x-4"}>
				<div className={"col-span-8 md:col-span-3 text-left md:text-right"}>
					<PostMetadata postData={postData} seriesItems={seriesItems} />
				</div>
				<div className={"col-span-8 md:col-span-4"}>
					<RenderHtml>{postData.contentHtml}</RenderHtml>
				</div>
				<div className={"col-span-8 md:col-span-1"}></div>
			</div>
		</div>
	);
}

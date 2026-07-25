import { createFileRoute } from "@tanstack/react-router";
import { RenderHtml } from "@/components/Markdown";
import PageTitle from "@/components/oxford/PageTitle";
import PostMetadata from "@/components/oxford/PostMetadata";
import PostSiblings from "@/components/oxford/PostSiblings";
import TwoColumnGrid from "@/components/oxford/TwoColumnGrid";
import { pageHead } from "@/lib/seo";
import { getPostPageData } from "@/src/data/content";

export const Route = createFileRoute("/_oxford/posts/$id")({
	loader: async ({ params }) => getPostPageData({ data: params.id }),
	head: ({ loaderData }) =>
		pageHead({
			...loaderData!.seo,
			type: "article",
		}),
	component: Post,
});

function Post() {
	const { postData, siblings, seriesItems } = Route.useLoaderData();

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>{postData.title}</PageTitle>
			<TwoColumnGrid
				sidebar={<PostMetadata postData={postData} seriesItems={seriesItems} />}
			>
				<RenderHtml>{postData.contentHtml}</RenderHtml>
				<PostSiblings prev={siblings.prevPost} next={siblings.nextPost} />
			</TwoColumnGrid>
		</div>
	);
}

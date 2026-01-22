import type { Metadata, ResolvingMetadata } from "next";
import PageTitle from "@/components/oxford/PageTitle";
import PostMetadata from "@/components/oxford/PostMetadata";
import PostContent from "@/components/PostContent";
import PostSiblings from "@/components/oxford/PostSiblings";
import { getPostData, getSiblingPosts } from "@/lib/cms.posts";
import { BASE_URL } from "@/lib/consts";
import { buildMetadata } from "@/lib/metadata";

type Props = {
	params: Promise<{ id: string }>;
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const id = (await params).id;
	const post = await getPostData(id);

	return buildMetadata(
		{
			title: post.title,
			description: post.description || `${post.contentPlain.slice(0, 155)}...`,
			url: `${BASE_URL}/posts/${id}`,
			publishedTime: post.date,
			tags: post.tags,
		},
		await parent,
	);
}

export default async function Post({ params }: Props) {
	const id = (await params).id;
	const postData = await getPostData(id);
	const siblings = await getSiblingPosts(id);

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>{postData.title}</PageTitle>
			<div className={"grid grid-cols-8 gap-x-4"}>
				<div className={"col-span-3 text-left md:text-right"}>
					<PostMetadata postData={postData} />
				</div>
				<div className={"col-span-4"}>
					<PostContent postData={postData} />
					<PostSiblings prev={siblings.prevPost} next={siblings.nextPost} />
				</div>
				<div className={"col-span-1"}></div>
			</div>
		</div>
	);
}

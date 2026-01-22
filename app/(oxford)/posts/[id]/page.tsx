import type { Metadata, ResolvingMetadata } from "next";
import type { Twitter } from "next/dist/lib/metadata/types/twitter-types";
import PageTitle from "@/components/oxford/PageTitle";
import PostMetadata from "@/components/oxford/PostMetadata";
import PostContent from "@/components/PostContent";
import { getPostData } from "@/lib/cms.posts";
import { BASE_URL, DEFAULT_IMAGE } from "@/lib/consts";

type Props = {
	params: Promise<{ id: string }>;
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const id = (await params).id;
	const post = await getPostData(id);

	const title = post.title;
	const description =
		post.description || `${post.contentPlain.slice(0, 155)}...`;
	const url = `${BASE_URL}/posts/${id}`;

	const parentMetadata = await parent;

	return {
		title,
		description,
		openGraph: {
			...parentMetadata.openGraph,
			title,
			description,
			url,
			type: "article",
			publishedTime: post.date,
			tags: post.tags,
			images: [
				{
					url: DEFAULT_IMAGE,
					width: 600,
					height: 312,
					alt: title,
				},
			],
		},
		twitter: {
			site: parentMetadata.twitter?.site ?? undefined,
			creator: parentMetadata.twitter?.creator ?? undefined,
			card: "summary_large_image",
			title,
			description,
			images: [DEFAULT_IMAGE],
		} satisfies Twitter,
	};
}

export default async function Post({ params }: Props) {
	const id = (await params).id;
	const postData = await getPostData(id);

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>{postData.title}</PageTitle>
			<div className={"grid grid-cols-8 gap-x-4"}>
				<div className={"col-span-3 text-left md:text-right"}>
					<PostMetadata postData={postData} />
				</div>
				<div className={"col-span-4"}>
					<PostContent postData={postData} />
				</div>
				<div className={"col-span-1"}></div>
			</div>
		</div>
	);
}

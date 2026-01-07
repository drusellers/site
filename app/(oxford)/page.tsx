import { getPostData, getSortedPostsData } from "@/lib/cms.posts";
import React from "react";
import PageTitle from "@/components/oxford/PageTitle";
import PostMetadata from "@/components/oxford/PostMetadata";
import PostContent from "@/components/PostContent";

export default async function Home() {
	const posts = getSortedPostsData();
	const postData = await getPostData(posts[0].id);

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>{postData.title}</PageTitle>
			<div className={"grid grid-cols-8 gap-x-4"}>
				<div className={"col-span-8 md:col-span-3 text-left md:text-right"}>
					<PostMetadata postData={postData} />
				</div>
				<div className={"col-span-8 md:col-span-4"}>
					<PostContent postData={postData} />
				</div>
				<div className={"col-span-8 md:col-span-1"}></div>
			</div>
		</div>
	);
}

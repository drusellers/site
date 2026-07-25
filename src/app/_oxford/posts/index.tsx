import { createFileRoute } from "@tanstack/react-router";
import DateTitle from "@/components/DateTitle";
import PageTitle from "@/components/oxford/PageTitle";
import TwoColumnGrid from "@/components/oxford/TwoColumnGrid";
import YearHeading from "@/components/YearHeading";
import { groupBy } from "@/lib/util";
import { getPostsIndexData } from "@/src/data/content";

export const Route = createFileRoute("/_oxford/posts/")({
	loader: async () => getPostsIndexData(),
	component: Posts,
});

function Posts() {
	const allPosts = groupBy(Route.useLoaderData(), "year");

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>Posts</PageTitle>

			<TwoColumnGrid sidebar={<Sidebar />}>
				{Object.keys(allPosts)
					.reverse()
					.map((year) => {
						return (
							<div key={year} className="mb-8">
								<YearHeading year={year} className={"text-text-secondary"} />
								<div className="mt-2 space-y-1">
									{allPosts[year].map((q) => {
										return (
											<DateTitle
												key={q.id}
												date={q.date}
												href={`/posts/${q.id}`}
												title={q.title}
											/>
										);
									})}
								</div>
							</div>
						);
					})}
			</TwoColumnGrid>
		</div>
	);
}

function Sidebar() {
	return null;
}

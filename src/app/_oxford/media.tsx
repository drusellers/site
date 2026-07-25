import { createFileRoute } from "@tanstack/react-router";
import AppearanceDisplay from "@/components/oxford/Appearance";
import PageLayout from "@/components/oxford/PageLayout";
import YearHeading from "@/components/YearHeading";
import { pageHead } from "@/lib/seo";
import { groupBy } from "@/lib/util";
import { getMediaPageData } from "@/src/data/content";

export const Route = createFileRoute("/_oxford/media")({
	loader: async () => getMediaPageData(),
	head: () =>
		pageHead({
			title: "Media | Dru Sellers",
			description: "Media | Dru Sellers",
			url: "https://drusellers.com/media",
		}),
	component: Media,
});

function Media() {
	const groupedItems = groupBy(Route.useLoaderData(), "year");

	return (
		<PageLayout title={"Media"} sidebar={<Sidebar />}>
			<article className="max-w-prose">
				{Object.keys(groupedItems)
					.reverse()
					.map((year) => {
						return (
							<div key={year} className="mb-8">
								<YearHeading year={year} className={"text-text-secondary"} />
								<div className={"mt-2 space-y-1"}>
									{groupedItems[year].map((item) => {
										return (
											<AppearanceDisplay
												key={item.id}
												date={item.date}
												href={item.url}
												title={item.title}
												mentionOnly={item.mentionOnly}
											/>
										);
									})}
								</div>
							</div>
						);
					})}
			</article>
		</PageLayout>
	);
}

function Sidebar() {
	return (
		<div className={""}>
			<div className={"text-gray-400"}>
				Recorded and Published Conversations
			</div>
		</div>
	);
}

import type { Metadata } from "next";
import AppearanceDisplay from "@/components/appearance";
import PageLayout from "@/components/oxford/PageLayout";
import YearHeading from "@/components/yearHeading";
import {
	type Appearance,
	getSortedAppearancesData,
} from "@/lib/cms.appearances";

export const metadata: Metadata = {
	title: "Media | Dru Sellers",
	description: "Media | Dru Sellers",
	twitter: {
		title: "Media | Dru Sellers",
		description: "Media | Dru Sellers",
	},
	openGraph: {
		title: "Media | Dru Sellers",
		description: "Media | Dru Sellers",
	},
};

export default function Page() {
	const allItems = getSortedAppearancesData();
	const groupedItems = groupBy(allItems, "year");

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

function groupBy(
	items: Appearance[],
	key: string,
): Record<string, Appearance[]> {
	return items.reduce(
		(result, item) => ({
			...result,
			[item[key]]: [...(result[item[key]] || []), item],
		}),
		{},
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

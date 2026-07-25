import { createFileRoute } from "@tanstack/react-router";
import Link from "@/components/AppLink";
import DateTitle from "@/components/DateTitle";
import PageLayout from "@/components/oxford/PageLayout";
import YearHeading from "@/components/YearHeading";
import { groupBy } from "@/lib/util";
import { getQuotesIndexData } from "@/src/data/content";

export const Route = createFileRoute("/_oxford/quotes/")({
	loader: async () => getQuotesIndexData(),
	component: Quotes,
});

function Quotes() {
	const { allQuotes, randomQuote } = Route.useLoaderData();
	const groupedQuotes = groupBy(allQuotes, "year");

	const sideBar = (
		<div className={""}>
			<div className={"text-gray-400"}>A random selection:</div>
			<Link href={`/quotes/${randomQuote.id}`}>{randomQuote.title}</Link>
		</div>
	);

	return (
		<PageLayout title={"Quotes"} sidebar={sideBar}>
			<article className="max-w-prose">
				{Object.keys(groupedQuotes)
					.reverse()
					.map((year) => {
						return (
							<div key={year} className="mb-8">
								<YearHeading year={year} className={"text-text-secondary"} />
								<div className={"mt-2 space-y-1"}>
									{groupedQuotes[year].map((q) => {
										return (
											<DateTitle
												key={q.id}
												date={q.date}
												href={`/quotes/${q.id}`}
												title={q.title}
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

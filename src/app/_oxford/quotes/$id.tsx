import { createFileRoute } from "@tanstack/react-router";
import PageLayout from "@/components/oxford/PageLayout";
import Quote from "@/components/Quote";
import YouTube from "@/components/YouTube";
import { pageHead } from "@/lib/seo";
import { getQuotePageData } from "@/src/data/content";

export const Route = createFileRoute("/_oxford/quotes/$id")({
	loader: async ({ params }) => getQuotePageData({ data: params.id }),
	head: ({ loaderData }) => {
		const data = loaderData!;
		return pageHead({
			title: `Quotes: ${data.quote.title}`,
			description: `A quote by ${data.quote.author}`,
			url: `https://drusellers.com/quotes/${data.quote.id}`,
		});
	},
	component: QuotePage,
});

function QuotePage() {
	const { quote, siblings } = Route.useLoaderData();

	let cite = <cite>- {quote.author}</cite>;
	if (quote.author_link) {
		cite = (
			<cite>
				-{" "}
				<a href={quote.author_link} target="_blank" rel="noopener noreferrer">
					{quote.author}
				</a>
			</cite>
		);
	}

	return (
		<PageLayout
			title={quote.title}
			sidebar={<></>}
			prev={siblings.prevQuote}
			next={siblings.nextQuote}
		>
			<YouTube src={quote.youtube} />
			<Quote cite={cite} html={quote.contentHtml} />
		</PageLayout>
	);
}

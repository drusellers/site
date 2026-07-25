import { createFileRoute } from "@tanstack/react-router";
import PageTitle from "@/components/oxford/PageTitle";
import TwoColumnGrid from "@/components/oxford/TwoColumnGrid";
import { pageHead } from "@/lib/seo";
import { getAboutPageData } from "@/src/data/content";

export const Route = createFileRoute("/_oxford/about")({
	loader: async () => getAboutPageData(),
	head: ({ loaderData }) => {
		const data = loaderData!;
		return pageHead({
			title: data.about.title,
			description: data.about.description,
			url: data.seo.url,
			imageUrl: data.seo.imageUrl,
			publishedTime: data.seo.publishedTime,
			tags: data.about.tags,
			type: "article",
		});
	},
	component: About,
});

function About() {
	const { about } = Route.useLoaderData();

	return (
		<div className={"flex flex-col pl-8 pr-8 lg:pr-0 pt-9 gap-y-4"}>
			<PageTitle>About</PageTitle>
			<TwoColumnGrid sidebar={<Sidebar img={about.img} />}>
				<div className={"text-text-primary"}>Hello 👋</div>
				<div
					className={"prose prose-drusellers"}
					// biome-ignore lint/security/noDangerouslySetInnerHtml: this is the whole point
					dangerouslySetInnerHTML={{ __html: about.html }}
				></div>
			</TwoColumnGrid>
		</div>
	);
}

function Sidebar({ img }: { img: string }) {
	return (
		<img
			src={img}
			width={2048}
			height={1365}
			alt={"Coffee, yum."}
			className={"dark:rounded-lg"}
		/>
	);
}

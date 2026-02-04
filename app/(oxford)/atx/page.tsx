import type { Metadata } from "next";
import { RenderHtml } from "@/components/Markdown";
import OneColumnGrid from "@/components/oxford/OneColumnGrid";
import PageTitle from "@/components/oxford/PageTitle";
import { getAtx } from "@/lib/cms.atx";
import { buildMetadata } from "@/lib/cms.metadata";

export const metadata: Metadata = buildMetadata({
	title: "Visiting ATX",
	description: "Thoughts and notes about things to do when visiting Austin, TX",
	openGraph: {
		title: "Visiting ATX",
		description:
			"Thoughts and notes about things to do when visiting Austin, TX",
	},
	alternates: {
		canonical: "/atx",
	},
});

export default function AtxPage() {
	const atx = getAtx();

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>ATX</PageTitle>

			<OneColumnGrid>
				<RenderHtml>{atx.html}</RenderHtml>
			</OneColumnGrid>
		</div>
	);
}

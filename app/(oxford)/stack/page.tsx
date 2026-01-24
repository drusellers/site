import type { Metadata } from "next";
import { RenderHtml } from "@/components/Markdown";
import PageTitle from "@/components/oxford/PageTitle";
import TwoColumnGrid from "@/components/oxford/TwoColumnGrid";
import { getStack } from "@/lib/cms.stack";

export const metadata: Metadata = {
	title: "The Stack",
	description: "A reflection on how I organize my life",
};

export default function Stack() {
	const page = getStack();

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>Stack</PageTitle>
			<TwoColumnGrid sidebar={<>as of 2023-12-17</>}>
				<RenderHtml>{page.html}</RenderHtml>
			</TwoColumnGrid>
		</div>
	);
}

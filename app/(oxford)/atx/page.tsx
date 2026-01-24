import { RenderHtml } from "@/components/Markdown";
import OneColumnGrid from "@/components/oxford/OneColumnGrid";
import PageTitle from "@/components/oxford/PageTitle";
import { getAtx } from "@/lib/cms.atx";

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

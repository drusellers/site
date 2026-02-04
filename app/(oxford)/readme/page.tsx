import { RenderHtml } from "@/components/Markdown";
import PageTitle from "@/components/oxford/PageTitle";
import TwoColumnGrid from "@/components/oxford/TwoColumnGrid";
import { getReadme } from "@/lib/cms.readme";

export default function Readme() {
	const { html } = getReadme();

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>README</PageTitle>
			<TwoColumnGrid>
				<RenderHtml>{html}</RenderHtml>
			</TwoColumnGrid>
		</div>
	);
}

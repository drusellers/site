import PageTitle from "@/components/oxford/PageTitle";
import TwoColumnGrid from "@/components/oxford/TwoColumnGrid";
import { getValueData, getValues } from "@/lib/cms.values";

export async function generateStaticParams() {
	const allValues = getValues();

	return allValues.map((q) => ({
		id: q.id,
	}));
}

type Props = {
	params: Promise<{ id: string }>;
};

export default async function Post({ params }: Props) {
	const id = (await params).id;

	const postData = await getValueData(id);

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>{postData.title}</PageTitle>
			<TwoColumnGrid>
				<div className="nested nested-copy-line-height nested-links nested-copy-separator">
					<div className="pa4">
						<div
							className="f5 f4-m f3-l lh-copy measure mt0 prose prose-drusellers"
							// biome-ignore lint/security/noDangerouslySetInnerHtml: that's the whole point
							dangerouslySetInnerHTML={{ __html: postData.html }}
						/>
					</div>
				</div>
			</TwoColumnGrid>
		</div>
	);
}

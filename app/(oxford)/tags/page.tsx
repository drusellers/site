import Link from "next/link";
import PageTitle from "@/components/oxford/PageTitle";
import TwoColumnGrid from "@/components/oxford/TwoColumnGrid";
import { getAllTags } from "@/lib/cms.posts";

export default function Tags() {
	const allTags = getAllTags();

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>Tags</PageTitle>
			<TwoColumnGrid>
				<ul>
					{Object.keys(allTags).map((tag) => {
						return (
							<li key={tag}>
								<Link href={`/tags/${tag}`} className="text-blue-500">
									<i className="fal fa-tag"></i> {tag}
								</Link>{" "}
								<span className="text-xs">({allTags[tag]})</span>
							</li>
						);
					})}
				</ul>
			</TwoColumnGrid>
		</div>
	);
}

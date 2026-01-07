import { getAllTags } from "@/lib/cms.posts";
import Link from "next/link";
import PageTitle from "@/components/oxford/PageTitle";

export default function Tags({}) {
	const allTags = getAllTags();

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>Tags</PageTitle>
			<div className={"grid grid-cols-7 gap-x-4"}>
				<div className={"col-span-3 text-right"}></div>
				<div className={"col-span-3"}>
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
				</div>
			</div>
		</div>
	);
}

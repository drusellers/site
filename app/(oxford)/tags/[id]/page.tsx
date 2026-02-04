import DateTitle from "@/components/DateTitle";
import PageTitle from "@/components/oxford/PageTitle";
import YearHeading from "@/components/YearHeading";
import { getAllTagIds, getTagData } from "@/lib/cms.posts";
import { groupBy } from "@/lib/util";

type Props = {
	params: Promise<{ id: string }>;
};
export async function generateStaticParams() {
	const tagIds = getAllTagIds();

	return tagIds.map((t) => ({
		id: t.params.id,
	}));
}

export default async function Tag({ params }: Props) {
	const { id } = await params;
	const postData = getTagData(id);
	const allPosts = groupBy(postData.posts, "year");

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>{id}</PageTitle>
			<div className={"grid grid-cols-7 gap-x-4"}>
				<div className={"col-span-3 text-right"}></div>
				<div className={"col-span-3"}>
					{Object.keys(allPosts)
						.reverse()
						.map((year) => {
							return (
								<div key={year} className="mb-8">
									<YearHeading year={year} />
									<div className={"mt-2 space-y-1"}>
										{allPosts[year].map((q) => {
											return (
												<DateTitle
													key={q.id}
													date={q.date}
													href={`/posts/${q.id}`}
													title={q.title}
												/>
											);
										})}
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}

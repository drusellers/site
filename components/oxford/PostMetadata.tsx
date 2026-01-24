import { faCircleDashed } from "@fortawesome/pro-light-svg-icons";
import { faCircle } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import DisplayDate from "@/components/DisplayDate";
import Stats from "@/components/Stats";
import { getSeries, type PostData, type PostHeader } from "@/lib/cms.posts";
import { classNames } from "@/lib/util";

type Props = {
	postData: PostData;
};

export default function PostMetadata({ postData }: Props) {
	const items = getSeries(postData.series?.name);

	return (
		<div className={"flex flex-col text-text-secondary pt-[2px]"}>
			<div className={"font-light"}>
				<DisplayDate dateString={postData.date} />
			</div>
			<div className={"flex flex-row justify-start md:justify-end"}>
				<Stats
					wordCount={postData.wordCount}
					readingTime={postData.readingTime}
				/>
			</div>
			<SeriesItems current={postData} items={items} />
		</div>
	);
}

function SeriesItems({
	current,
	items,
}: {
	current: PostData;
	items: PostHeader[];
}) {
	if (items.length === 0) return null;

	return (
		<div className={"mt-8 flex flex-col space-y-2"}>
			<div className={"font-semibold text-oxford-500"}>
				Posts in this series
			</div>
			{items.map((i) => {
				const icon = i.id === current.id ? faCircle : faCircleDashed;
				const linkClasses = i.id === current.id ? "font-semibold" : "";
				const dotClasses =
					i.id === current.id ? "text-blue-800" : "text-blue-500";

				return (
					<div key={i.id} className={"flex gap-x-1 justify-end items-center"}>
						<div className={"text-xs"}>
							<Link className={linkClasses} href={`/posts/${i.id}`}>
								{i.title}
							</Link>
						</div>
						<FontAwesomeIcon
							icon={icon}
							className={classNames("text-xs", dotClasses)}
						/>
					</div>
				);
			})}
		</div>
	);
}

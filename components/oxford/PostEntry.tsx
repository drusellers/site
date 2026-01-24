import { faFilm } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import type { VideoProps } from "@/lib/cms.posts";
import { toNakedMarkdown } from "@/lib/md";
import DisplayDate from "../displayDate";

type Props = {
	id: string;
	title: string;
	description?: string;
	video?: VideoProps;
	date: string;
};
export default function PostEntry({
	id,
	title,
	description,
	video,
	date,
}: Props) {
	let d = <></>;
	if (description) {
		const md = toNakedMarkdown(description);
		d = <p dangerouslySetInnerHTML={{ __html: md }} className={"prose"} />;
	}
	return (
		<div>
			<Link href={`/posts/${id}`} className="text-blue-500">
				<h2 className={""}>
					{title}
					<Video video={video} />
				</h2>
			</Link>
			{d}
			<div
				className={
					"align-center flex flex-row justify-start text-sm text-gray-500"
				}
			>
				<DisplayDate dateString={date} />
			</div>
		</div>
	);
}

function Video({ video }: { video?: VideoProps }) {
	if (!video) return <></>;

	return (
		<FontAwesomeIcon icon={faFilm} className={"ml-2 text-sm text-gray-400"} />
	);
}

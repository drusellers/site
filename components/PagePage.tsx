import TitleSubtitle from "./titleSubtitle";
import Stats from "./stats";
import Date from "./date";
import TagList from "./tagList";

type Props = {
	title: string;
	subtitle?: string;
	children: React.ReactNode;
	tags?: string[];
	date?: string;
	wordCount?: number;
	readingTime?: number;
};

export default function PagePage({
	title,
	subtitle,
	children,
	tags,
	date,
	wordCount,
	readingTime,
}: Props) {
	return (
		<div className="container mx-auto my-2 sm:my-6 flex min-h-page max-w-document flex-col sm:flex-row">
			<div className="my-2 sm:my-6 space-y-4 px-6 sm:w-1/3 sm:border-t-4 sm:border-black sm:pt-6">
				<TitleSubtitle title={title} subtitle={subtitle} />
				<Stats wordCount={wordCount} readingTime={readingTime} />
				<Date dateString={date} />
				<TagList tags={tags || []} />
			</div>
			<div className="my-2 sm:my-6 px-6 w-full">
				<article className="max-w-prose">{children}</article>
			</div>
		</div>
	);
}

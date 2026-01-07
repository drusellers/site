import TitleSubtitle from "@/components/titleSubtitle";
import Stats from "@/components/stats";
import Date from "@/components/date";
import TagList from "@/components/tagList";
import React from "react";

type Props = {
	title: string;
	subtitle?: string;
	tags?: string[];
	date?: string;
	wordCount?: number;
	readingTime?: number;
	children?: React.ReactNode;
};

export default function SideColumn({
	title,
	subtitle,
	wordCount,
	readingTime,
	date,
	tags,
	children,
}: Props) {
	return (
		<div className="my-2 sm:my-6 space-y-4 mx-6 sm:border-t-4 sm:border-black sm:pt-6">
			<TitleSubtitle title={title} subtitle={subtitle} />
			<Stats wordCount={wordCount} readingTime={readingTime} />
			<Date dateString={date} />
			<TagList tags={tags || []} />
			{children}
		</div>
	);
}

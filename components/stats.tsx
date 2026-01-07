type Props = {
	wordCount?: number;
	readingTime?: number;
};

export default function Stats({ wordCount, readingTime }: Props) {
	if (wordCount == undefined) return <></>;

	return (
		<div>
			{wordCount} words · {readingTime} minute read
		</div>
	);
}

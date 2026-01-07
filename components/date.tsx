import { parseISO, format } from "date-fns";

type Props = {
	dateString?: string;
};

export default function Date({ dateString }: Props) {
	if (dateString === undefined) {
		return <></>;
	}

	const date = parseISO(dateString);
	return (
		<time className="block" dateTime={dateString}>
			{format(date, "LLL d, yyyy")}
		</time>
	);
}

import { format, parseISO } from "date-fns";

type Props = {
	dateString?: string;
};

export default function DisplayDate({ dateString }: Props) {
	if (dateString === undefined) {
		return null;
	}

	const date = parseISO(dateString);
	return (
		<time className="block" dateTime={dateString}>
			{format(date, "LLL d, yyyy")}
		</time>
	);
}

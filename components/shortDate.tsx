import { parseISO, format } from "date-fns";

type Props = {
	dateString?: string;
};

export default function ShortDate({ dateString }: Props) {
	if (dateString == undefined) {
		return <></>;
	}

	let date = parseISO("2022-01-01");
	let formatted = "";
	try {
		date = parseISO(dateString);
		formatted = format(date, "LLL dd");
	} catch (e) {
		console.log(dateString, e);
	}

	return (
		<time className="font-mono text-sm text-gray-400" dateTime={dateString}>
			{formatted}
		</time>
	);
}

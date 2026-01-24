import { classNames } from "@/lib/util";

type Props = {
	year: string;
	className?: string;
};

export default function YearHeading({ year, className }: Props) {
	return <h3 className={classNames("text-2xl", className)}>{year}</h3>;
}

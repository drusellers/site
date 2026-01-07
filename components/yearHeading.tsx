type Props = {
	year: string;
};

export default function YearHeading({ year }: Props) {
	return <h3 className="text-2xl">{year}</h3>;
}

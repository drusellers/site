import { toMarkdown, toNakedMarkdown } from "@/lib/md";

type Props = {
	children: string;
	variables: Record<string, any>;
};
export default function Markdown({ children, variables }: Props) {
	console.log("children", typeof children, children);
	const md = toMarkdown(children, variables);

	return (
		<div className={"prose"} dangerouslySetInnerHTML={{ __html: md.html }} />
	);
}

export function NakedMarkdown({ children, variables }: Props) {
	const md = toNakedMarkdown(children, variables);

	return (
		<div className={"prose"} dangerouslySetInnerHTML={{ __html: md.html }} />
	);
}

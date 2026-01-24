import Highlight from "@/components/Highlight";
import { toMarkdown, toNakedMarkdown } from "@/lib/md";

type Props = {
	children: string;
	variables: Record<string, any>;
};
export default function Markdown({ children, variables }: Props) {
	const md = toMarkdown(children, variables);

	return (
		<div
			className={"prose prose-drusellers prose-headings:mt-0"}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: that's the point
			dangerouslySetInnerHTML={{ __html: md.html }}
		/>
	);
}

export function NakedMarkdown({ children, variables }: Props) {
	const md = toNakedMarkdown(children, variables);

	return (
		<div
			className={"prose prose-drusellers prose-headings:mt-0"}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: that's the point
			dangerouslySetInnerHTML={{ __html: md.html }}
		/>
	);
}

type HtmlProps = {
	children: string;
};
export function RenderHtml({ children }: HtmlProps) {
	return (
		<>
			<div
				className={"prose prose-drusellers prose-headings:mt-0"}
				// biome-ignore lint/security/noDangerouslySetInnerHtml: that's the point
				dangerouslySetInnerHTML={{ __html: children }}
			/>
			<Highlight />
		</>
	);
}

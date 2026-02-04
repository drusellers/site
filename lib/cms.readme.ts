import { getFile } from "@/lib/cms";
import { toMarkdown } from "@/lib/md";
import { yearsOfExperience } from "@/lib/util";

export type ReadmeProps = {
	title: string;
	preview?: string;
	html: string;
};

export function getReadme(): ReadmeProps {
	const fileContents = getFile("readme.md");

	const md = toMarkdown(fileContents, {
		// variables need to be strings?
		years: yearsOfExperience(),
	});

	return {
		title: md.frontMatter.title,
		preview: md.frontMatter.preview || null,
		html: md.html,
	};
}

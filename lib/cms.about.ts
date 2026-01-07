import { getFile } from "@/lib/cms";
import { toMarkdown } from "@/lib/md";
import { yearsOfExperience } from "@/lib/util";

type AboutProps = {
	title?: string;
	preview?: string;
	html: string;
	img: string;
	sideBar: string;
};

export function getAbout(): AboutProps {
	const fileContents = getFile("about.md");

	const md = toMarkdown(fileContents, {
		// variables need to be strings?
		years: yearsOfExperience(),
	});

	const sidebar = toMarkdown(md.frontMatter.sideBar);

	return {
		title: md.frontMatter.title || null,
		preview: md.frontMatter.preview || null,
		img: md.frontMatter.img || null,
		html: md.html,
		sideBar: sidebar.html,
	};
}

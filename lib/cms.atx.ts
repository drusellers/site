import Markdoc from "@markdoc/markdoc";
import { chip } from "@/lib/markdocTags";
import { parse } from "yaml";
import { getFile } from "@/lib/cms";

type AtxProps = {
	title?: string;
	preview?: string;
	html: string;
	img?: string;
};
export function getAtx(): AtxProps {
	const fileContents = getFile("atx.md");

	const ast = Markdoc.parse(fileContents);

	// CUSTOM to this content
	const now = new Date();
	const start = new Date("1997-08-01");

	const config = {
		tags: {
			chip,
		},
		variables: {
			// variables need to be strings?
			years: now.getFullYear() - start.getFullYear(),
		},
	};

	const errors = Markdoc.validate(ast, config);

	if (errors.length > 0) {
		console.log(errors);
	}

	const content = Markdoc.transform(ast, config);

	const frontMatter = ast.attributes.frontmatter
		? parse(ast.attributes.frontmatter)
		: {};

	const html = Markdoc.renderers.html(content);

	return {
		title: frontMatter.title || null,
		preview: frontMatter.preview || null,
		img: frontMatter.img || null,
		html,
	};
}

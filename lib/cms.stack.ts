import Markdoc from "@markdoc/markdoc";
import { parse } from "yaml";
import { getFile, VideoProps } from "@/lib/cms";

type AboutProps = {
	title?: string;
	preview?: string;
	html: string;
	video?: VideoProps;
	img?: string;
};

export function getStack(): AboutProps {
	const fileContents = getFile("stack.md");

	const ast = Markdoc.parse(fileContents);

	// CUSTOM to this content
	const now = new Date();
	const start = new Date("1997-08-01");

	const config = {
		variables: {
			// variables need to be strings?
			years: (now.getFullYear() - start.getFullYear()).toString(),
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
		html,
		video: frontMatter.video ?? {},
	};
}

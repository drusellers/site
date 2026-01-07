import Markdoc from "@markdoc/markdoc";
import { parse } from "yaml";
import { chip, sidenote, fence, youtube, callout } from "@/lib/markdocTags";

export function toMarkdown(
	input: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	variables: any | undefined = {},
): MarkdownContents {
	const ast = Markdoc.parse(input);
	const config = {
		tags: {
			chip,
			sidenote,
			youtube,
			callout,
		},
		nodes: {
			fence,
		},
		variables,
	};

	const errors = Markdoc.validate(ast, config);
	if (errors.length > 0) {
		console.log("errors", errors);
		throw new Error(`Error Parsing Markdoc ${errors.length}: ${errors[0]}`);
	}

	const content = Markdoc.transform(ast, config);

	const html = Markdoc.renderers.html(content);

	const frontMatter = ast.attributes.frontmatter
		? parse(ast.attributes.frontmatter)
		: {};

	return {
		html,
		plain: input,
		raw: input,
		frontMatter,
	};
}

export function toNakedMarkdown(
	input: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	variables: any | undefined = {},
): MarkdownContents {
	const ast = Markdoc.parse(input);
	const config = {
		tags: {
			chip,
			sidenote,
			youtube,
			callout,
		},
		variables,
	};
	const errors = Markdoc.validate(ast, config);
	if (errors.length > 0) {
		throw new Error("Error Parsing Naked Markdoc");
	}

	const content = Markdoc.transform(ast, config);

	const html = Markdoc.renderers.html(content);

	const frontMatter = ast.attributes.frontmatter
		? parse(ast.attributes.frontmatter)
		: {};

	return {
		html,
		plain: input,
		raw: input,
		frontMatter,
	};
}

export interface MarkdownContents {
	html: string;
	plain: string;
	raw: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	frontMatter: any;
}

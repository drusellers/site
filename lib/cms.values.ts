import fs from "fs";
import path from "path";
import { getFile, getFiles } from "@/lib/cms";
import { toMarkdown } from "@/lib/md";

type Value = {
	id: string;
	title: string;
	html: string;
	preview: string;
};

export function getValues(): Value[] {
	const files = getFiles("values");
	return files.map((file) => {
		// Remove ".md" from file name to get id
		const id = file.slug;

		// Read markdown file as string
		const fileContents = getFile(file.path);
		const md = toMarkdown(fileContents);

		// Combine the data with the id
		return {
			id,
			html: md.html,
			title: md.frontMatter.title,
			preview: md.frontMatter.preview,
		} as Value;
	});
}

export function getAllValuesIds() {
	const values = getValues();

	// Returns an array that looks like this:
	// [
	//   {
	//     params: {
	//       id: 'ssg-ssr'
	//     }
	//   },
	//   {
	//     params: {
	//       id: 'pre-rendering'
	//     }
	//   }
	// ]
	return values.map((value) => {
		return {
			params: {
				id: value.id,
			},
		};
	});
}

export async function getValueData(id: string): Promise<Value> {
	const fileContents = getFile(`values/${id}.md`);
	const md = toMarkdown(fileContents);

	// Combine the data with the id and contentHtml
	return {
		id,
		title: md.frontMatter.title,
		html: md.html,
		preview: md.frontMatter.preview,
	} as Value;
}

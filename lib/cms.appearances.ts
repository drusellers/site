import { parseISO } from "date-fns";
import matter from "gray-matter";
import { getFile, getFiles } from "@/lib/cms";

export interface Appearance {
	title: string;
	id: string;
	date: string;
	year: number;
	url: string;
	mentionOnly?: boolean;
}

export function getSortedAppearancesData(): Appearance[] {
	// Get file names under /posts
	const allPostsData = getFiles("appearances").map((fileName) => {
		// Remove ".md" from file name to get id
		const id = fileName.slug;

		// Read markdown file as string
		const fileContents = getFile(fileName.path);

		// Use gray-matter to parse the post metadata section
		const matterResult = matter(fileContents);

		const year = parseISO(matterResult.data.date).getFullYear();

		// Combine the data with the id
		return {
			id,
			year: year,
			...matterResult.data,
		} as Appearance;
	});

	// Sort posts by date
	return allPostsData.sort((a, b) => {
		const aa = parseISO(a.date);
		const bb = parseISO(b.date);

		if (aa < bb) {
			return 1;
		} else {
			return -1;
		}
	});
}

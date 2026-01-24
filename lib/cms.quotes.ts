import path from "node:path";
import { parseISO } from "date-fns";
import { getFile, getFiles } from "@/lib/cms";
import { toMarkdown } from "@/lib/md";

export interface Quote {
	title: string;
	id: string;
	date: string;
	categories: string;
	tags: string[];
	author: string;
	author_link: string;
	type: string;
	year: number;
	contentHtml: string;
	href: string;
	youtube?: string;
}

export interface QuoteSiblings {
	nextQuote?: Quote;
	prevQuote?: Quote;
}

export function getSortedQuotesData(): Quote[] {
	const files = getFiles("quotes");
	const allPostsData = files.map((file) => {
		const id = file.slug;

		// Read markdown file as string
		const fileContents = getFile(file.path);

		const md = toMarkdown(fileContents, {});

		const year = parseISO(md.frontMatter.date).getFullYear();

		// Combine the data with the id
		return {
			id,
			year: year,
			...md.frontMatter,
		} as Quote;
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

export function getAllQuotesIds(): { params: { id: string } }[] {
	const fileNames = getFiles("quotes");

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
	return fileNames.map((fileName) => {
		return {
			params: {
				id: fileName.slug,
			},
		};
	});
}

export async function getQuoteData(id): Promise<Quote> {
	const fullPath = path.join("quotes", `${id}.md`);
	const fileContents = getFile(fullPath);

	const md = toMarkdown(fileContents, {});

	const contentHtml = md.html;

	// Combine the data with the id and contentHtml
	return {
		id,
		contentHtml,
		...md.frontMatter,
		href: `/quotes/${id}`,
	} as Quote;
}

export async function getSiblingQuotes(slug): Promise<QuoteSiblings> {
	const posts = getSortedQuotesData();
	const slugs = posts.map((p) => p.id);
	const index = slugs.indexOf(slug);

	let nextPost: Quote | null = null;
	if (index !== 0) {
		const nextSlug = slugs[index - 1];
		nextPost = await getQuoteData(nextSlug);
	}

	let prevPost: Quote | null = null;
	if (slugs.length - 1 >= index + 1) {
		const prevSlug = slugs[index + 1];
		prevPost = await getQuoteData(prevSlug);
	}

	return {
		nextQuote: nextPost === null ? undefined : nextPost,
		prevQuote: prevPost === null ? undefined : prevPost,
	};
}

import path from "node:path";
import { parseISO } from "date-fns";
import { getFile, getFiles } from "./cms";
import { toMarkdown } from "./md";

export type VideoProps = {
	youtube?: string;
	loom?: string;
};

export type PostHeader = {
	id: string;
	year: number;
	draft: boolean;
	date: string;
	tags: string[];
	video?: VideoProps;
	title: string;
	description: string;
	series?: {
		name: string;
		order: number;
	};
};

export function getSortedPostsData(): PostHeader[] {
	// Get file names under /posts
	const fileNames = getFiles("posts");

	const allPostsData = fileNames.map((fileName) => {
		// Remove ".md" from file name to get id
		const id = fileName.slug;

		// Read markdown file as string
		const fileContents = getFile(fileName.path);

		const md = toMarkdown(fileContents, {});

		const year = parseISO(md.frontMatter.date).getFullYear();

		// Combine the data with the id
		return {
			id,
			year: year,
			...md.frontMatter,
		} as PostHeader;
	});

	const nonDrafts = allPostsData.filter((d) => !d.draft);

	// Sort posts by date
	return nonDrafts.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	});
}

export function getAllTags(): { [tag: string]: number } {
	return getSortedPostsData()
		.flatMap((p) => p.tags)
		.filter((t) => t != null)
		.sort()
		.reduce((a, t) => {
			if (a[t] === undefined) {
				a[t] = 0;
			}
			a[t] += 1;
			return a;
		}, {});
}

export function getAllTagIds() {
	const allTags = getSortedPostsData()
		.flatMap((p) => p.tags)
		.filter((t) => t != null)
		.map((t) => t.toLowerCase());

	const uniqueTags = new Set(allTags);

	return [...uniqueTags].map((t) => ({ params: { id: t } }));
}

export function getTagData(tag) {
	const postsByTag = getSortedPostsData().filter((p) =>
		(p.tags || []).includes(tag),
	);

	return {
		id: tag,
		posts: postsByTag,
	};
}

export function getAllPostIds(): { params: { id: string } }[] {
	const files = getFiles("posts");

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
	return files.map((file) => {
		return {
			params: {
				id: file.slug,
			},
		};
	});
}

export type PostData = {
	id: string;
	_id: string;
	contentHtml: string;
	contentPlain: string;
	rawContent: string;
	wordCount: number;
	readingTime: number;
	video?: VideoProps;
	date: string;
	title: string;
	subtitle: string;
	description: string;
	tags: string[];
	format: "text" | "html";
	series?: {
		name: string;
		order: number;
	};
};

export async function getPostData(id): Promise<PostData> {
	let format: "text" | "html" = "html";
	if (id.endsWith(".txt")) {
		id = id.substring(0, id.length - 4);
		format = "text";
	}

	const fullPath = path.join("posts", `${id}.md`);
	const fileContents = getFile(fullPath);

	const md = toMarkdown(fileContents, {});

	const wordCount = wordyCount(fileContents);
	const readingTime = Math.round(wordCount / 200);

	// Combine the data with the id and contentHtml
	return {
		id,
		_id: id,
		rawContent: md.raw,
		contentHtml: md.html,
		contentPlain: md.plain,
		wordCount,
		readingTime,
		title: md.frontMatter.title,
		date: md.frontMatter.date,
		video: md.frontMatter.video || null,
		subtitle: md.frontMatter.subtitle,
		description: md.frontMatter.description,
		tags: md.frontMatter.tags,
		series: md.frontMatter.series,
		format,
	};
}

function wordyCount(content: string): number {
	return content.trim().split(/\s+/).length;
}

export function getSeries(name: string | undefined): PostHeader[] {
	if (name === undefined) return [];

	const all = getSortedPostsData();

	return all
		.filter((x) => x.series?.name === name)
		.sort((a, b) => {
			if (a.series!.order < b.series!.order) {
				return -1;
			} else {
				return 1;
			}
		});
}

export interface PostSibling {
	title: string;
	href: string;
}

export interface PostSiblings {
	nextPost?: PostSibling;
	prevPost?: PostSibling;
}

export async function getSiblingPosts(slug: string): Promise<PostSiblings> {
	const posts = getSortedPostsData();
	const slugs = posts.map((p) => p.id);
	const index = slugs.indexOf(slug);

	let nextPost: PostSibling | undefined = undefined;
	if (index !== 0) {
		const next = posts[index - 1];
		nextPost = {
			title: next.title,
			href: `/posts/${next.id}`,
		};
	}

	let prevPost: PostSibling | undefined = undefined;
	if (slugs.length - 1 >= index + 1) {
		const prev = posts[index + 1];
		prevPost = {
			title: prev.title,
			href: `/posts/${prev.id}`,
		};
	}

	return {
		nextPost,
		prevPost,
	};
}

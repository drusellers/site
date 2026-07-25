import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { BASE_URL } from "@/lib/consts";
import { resolveUrl } from "@/lib/util";
import type { AllegoryData } from "@/lib/cms.allegory";
import type { Appearance } from "@/lib/cms.appearances";
import type { AboutProps } from "@/lib/cms.about";
import type { PostData, PostHeader, PostSiblings } from "@/lib/cms.posts";
import type { Quote, QuoteSiblings } from "@/lib/cms.quotes";
import type { ReadmeProps } from "@/lib/cms.readme";
import type { Resume } from "@/lib/cms.resume";

export type ShellData = {
	sideBarHtml: string;
};

export type HomePageData = {
	postData: PostData;
	seriesItems: PostHeader[];
};

export type PostPageData = {
	postData: PostData;
	siblings: PostSiblings;
	seriesItems: PostHeader[];
	seo: {
		title: string;
		description: string;
		url: string;
		publishedTime: string;
		tags: string[];
	};
};

export type QuotesIndexData = {
	allQuotes: Quote[];
	randomQuote: Quote;
};

export type QuotePageData = {
	quote: Quote;
	siblings: QuoteSiblings;
};

export type ValuesIndexData = Awaited<ReturnType<typeof valuesIndexData>>;
export type ValuePageData = Awaited<ReturnType<typeof valuePageData>>;

export type ResumePageData = Resume & {
	summaryHtml: string;
};

export const getShellData = createServerFn({ method: "GET" }).handler(
	async (): Promise<ShellData> => {
		const { getAbout } = await import("@/lib/cms.about");
		const about = getAbout();
		return { sideBarHtml: about.sideBar };
	},
);

export const getHomePageData = createServerFn({ method: "GET" }).handler(
	async (): Promise<HomePageData> => {
		const { getPostData, getSeries, getSortedPostsData } = await import(
			"@/lib/cms.posts"
		);
		const posts = getSortedPostsData();
		const postData = await getPostData(posts[0].id);
		return {
			postData,
			seriesItems: getSeries(postData.series?.name),
		};
	},
);

export const getAboutPageData = createServerFn({ method: "GET" }).handler(
	async (): Promise<{ about: AboutProps; seo: Record<string, string> }> => {
		const { getAbout } = await import("@/lib/cms.about");
		const about = getAbout();
		return {
			about,
			seo: {
				title: about.title,
				description: about.description,
				url: `${BASE_URL}/about`,
				imageUrl: resolveUrl(about.img),
				publishedTime: about.date ?? "",
			},
		};
	},
);

export const getPostsIndexData = createServerFn({ method: "GET" }).handler(
	async (): Promise<PostHeader[]> => {
		const { getSortedPostsData } = await import("@/lib/cms.posts");
		return getSortedPostsData();
	},
);

export const getPostPageData = createServerFn({ method: "GET" })
	.validator((id: string) => id)
	.handler(async ({ data: id }): Promise<PostPageData> => {
		const { getPostData, getSeries, getSiblingPosts } = await import(
			"@/lib/cms.posts"
		);

		try {
			const postData = await getPostData(id);
			const siblings = await getSiblingPosts(id);
			return {
				postData,
				siblings,
				seriesItems: getSeries(postData.series?.name),
				seo: {
					title: postData.title,
					description:
						postData.description || `${postData.contentPlain.slice(0, 155)}...`,
					url: `${BASE_URL}/posts/${id}`,
					publishedTime: postData.date,
					tags: postData.tags,
				},
			};
		} catch (error) {
			throw notFound({ data: { id } });
		}
	});

export const getTagsIndexData = createServerFn({ method: "GET" }).handler(
	async (): Promise<Record<string, number>> => {
		const { getAllTags } = await import("@/lib/cms.posts");
		return getAllTags();
	},
);

export const getTagPageData = createServerFn({ method: "GET" })
	.validator((id: string) => id)
	.handler(async ({ data: id }) => {
		const { getTagData } = await import("@/lib/cms.posts");
		return getTagData(id);
	});

export const getQuotesIndexData = createServerFn({ method: "GET" }).handler(
	async (): Promise<QuotesIndexData> => {
		const { getSortedQuotesData } = await import("@/lib/cms.quotes");
		const allQuotes = getSortedQuotesData();
		const randomIndex = Math.floor(Math.random() * allQuotes.length);
		return { allQuotes, randomQuote: allQuotes[randomIndex] };
	},
);

export const getQuotePageData = createServerFn({ method: "GET" })
	.validator((id: string) => id)
	.handler(async ({ data: id }): Promise<QuotePageData> => {
		const { getQuoteData, getSiblingQuotes } = await import("@/lib/cms.quotes");
		try {
			return {
				quote: await getQuoteData(id),
				siblings: await getSiblingQuotes(id),
			};
		} catch (error) {
			throw notFound({ data: { id } });
		}
	});

async function valuesIndexData() {
	const { getValues } = await import("@/lib/cms.values");
	return getValues();
}

export const getValuesIndexData = createServerFn({ method: "GET" }).handler(
	valuesIndexData,
);

async function valuePageData(id: string) {
	const { getValueData } = await import("@/lib/cms.values");
	return getValueData(id);
}

export const getValuePageData = createServerFn({ method: "GET" })
	.validator((id: string) => id)
	.handler(async ({ data: id }) => {
		try {
			return await valuePageData(id);
		} catch (error) {
			throw notFound({ data: { id } });
		}
	});

export const getAllegoryPageData = createServerFn({ method: "GET" }).handler(
	async (): Promise<AllegoryData> => {
		const { getAllegoryData } = await import("@/lib/cms.allegory");
		const { toMarkdown } = await import("@/lib/md");
		const data = getAllegoryData();
		return {
			prose: data.prose.map((item) => ({
				...item,
				characterNote: item.characterNote
					? toMarkdown(item.characterNote).html
					: undefined,
			})),
		};
	},
);

export const getAtxPageData = createServerFn({ method: "GET" }).handler(
	async () => {
		const { getAtx } = await import("@/lib/cms.atx");
		return getAtx();
	},
);

export const getMediaPageData = createServerFn({ method: "GET" }).handler(
	async (): Promise<Appearance[]> => {
		const { getSortedAppearancesData } = await import("@/lib/cms.appearances");
		return getSortedAppearancesData();
	},
);

export const getReadmePageData = createServerFn({ method: "GET" }).handler(
	async (): Promise<ReadmeProps> => {
		const { getReadme } = await import("@/lib/cms.readme");
		return getReadme();
	},
);

export const getResumePageData = createServerFn({ method: "GET" }).handler(
	async (): Promise<ResumePageData> => {
		const { getResumeData } = await import("@/lib/cms.resume");
		const { toNakedMarkdown } = await import("@/lib/md");
		const { yearsOfExperience } = await import("@/lib/util");
		const resume = getResumeData();
		return {
			...resume,
			summaryHtml: toNakedMarkdown(resume.summary, {
				years: yearsOfExperience(),
			}).html,
		};
	},
);

export const getStackPageData = createServerFn({ method: "GET" }).handler(
	async () => {
		const { getStack } = await import("@/lib/cms.stack");
		return getStack();
	},
);

export const getTextPostData = createServerFn({ method: "GET" })
	.validator((id: string) => id)
	.handler(async ({ data: id }): Promise<string> => {
		const { getPostData } = await import("@/lib/cms.posts");
		try {
			const postData = await getPostData(id);
			return postData.contentPlain;
		} catch (error) {
			throw notFound({ data: { id } });
		}
	});

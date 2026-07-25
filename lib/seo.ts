import { BASE_URL, DEFAULT_IMAGE } from "@/lib/consts";

export type HeadMeta =
	| { title: string }
	| { charSet: string }
	| { name: string; content: string | undefined }
	| { property: string; content: string | undefined };

export type HeadLink = {
	rel: string;
	href: string;
	type?: string;
	sizes?: string;
};

export type HeadConfig = {
	meta: HeadMeta[];
	links?: HeadLink[];
};

export type PageSeoInput = {
	title: string;
	description?: string;
	url?: string;
	imageUrl?: string;
	publishedTime?: string;
	tags?: string[];
	type?: "website" | "article";
};

const defaultDescription = "Dru's thoughts";

export function defaultHead(): HeadConfig {
	const head = pageHead({
		title: "Dru Sellers",
		description: defaultDescription,
		url: BASE_URL,
		type: "website",
	});

	return {
		...head,
		links: head.links?.filter((link) => link.rel !== "canonical"),
	};
}

export function pageHead(input: PageSeoInput): HeadConfig {
	const description = input.description ?? defaultDescription;
	const url = input.url ?? BASE_URL;
	const imageUrl = input.imageUrl ?? DEFAULT_IMAGE;
	const type = input.type ?? "website";

	const meta: HeadMeta[] = [
		{ title: input.title },
		{ name: "description", content: description },
		{ property: "og:title", content: input.title },
		{ property: "og:description", content: description },
		{ property: "og:url", content: url },
		{ property: "og:type", content: type },
		{ property: "og:site_name", content: "Dru Sellers" },
		{ property: "og:image", content: imageUrl },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: input.title },
		{ name: "twitter:description", content: description },
		{ name: "twitter:image", content: imageUrl },
		{ name: "twitter:site", content: "Dru Sellers" },
		{ name: "twitter:creator", content: "Dru Sellers" },
	];

	if (input.publishedTime) {
		meta.push({
			property: "article:published_time",
			content: input.publishedTime,
		});
	}

	for (const tag of input.tags ?? []) {
		meta.push({ property: "article:tag", content: tag });
	}

	return {
		meta,
		links: [
			{ rel: "canonical", href: url },
			{ rel: "icon", href: "/images/favicon.png", type: "image/png" },
		],
	};
}

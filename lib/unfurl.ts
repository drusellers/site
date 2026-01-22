export type UnfurlMetadata = {
	// Basic
	title: string | null;
	description: string | null;
	url: string | null;
	favicon: string | null;

	// Open Graph
	ogTitle: string | null;
	ogDescription: string | null;
	ogImage: string | null;
	ogUrl: string | null;
	ogType: string | null;
	ogSiteName: string | null;

	// Twitter Card
	twitterCard: string | null;
	twitterTitle: string | null;
	twitterDescription: string | null;
	twitterImage: string | null;
	twitterSite: string | null;
	twitterCreator: string | null;

	// Apple/iMessage
	appleTitle: string | null;
	appleTouchIcon: string | null;
};

function extractMetaContent(
	html: string,
	property: string,
	attribute: "property" | "name" = "property",
): string | null {
	// Match both single and double quotes, and handle attributes in any order
	const patterns = [
		new RegExp(
			`<meta[^>]*${attribute}=["']${property}["'][^>]*content=["']([^"']*)["']`,
			"i",
		),
		new RegExp(
			`<meta[^>]*content=["']([^"']*)["'][^>]*${attribute}=["']${property}["']`,
			"i",
		),
	];

	for (const pattern of patterns) {
		const match = html.match(pattern);
		if (match) {
			return match[1];
		}
	}
	return null;
}

function extractTitle(html: string): string | null {
	const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
	return match ? match[1].trim() : null;
}

function extractFavicon(html: string, baseUrl: string): string | null {
	// Look for various favicon link tags
	const patterns = [
		/<link[^>]*rel=["']icon["'][^>]*href=["']([^"']*)["']/i,
		/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']icon["']/i,
		/<link[^>]*rel=["']shortcut icon["'][^>]*href=["']([^"']*)["']/i,
		/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']shortcut icon["']/i,
	];

	for (const pattern of patterns) {
		const match = html.match(pattern);
		if (match) {
			const href = match[1];
			if (href.startsWith("http")) return href;
			if (href.startsWith("/")) return `${baseUrl}${href}`;
			return `${baseUrl}/${href}`;
		}
	}

	// Default to /favicon.ico
	return `${baseUrl}/favicon.ico`;
}

function extractAppleTouchIcon(html: string, baseUrl: string): string | null {
	const patterns = [
		/<link[^>]*rel=["']apple-touch-icon["'][^>]*href=["']([^"']*)["']/i,
		/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']apple-touch-icon["']/i,
	];

	for (const pattern of patterns) {
		const match = html.match(pattern);
		if (match) {
			const href = match[1];
			if (href.startsWith("http")) return href;
			if (href.startsWith("/")) return `${baseUrl}${href}`;
			return `${baseUrl}/${href}`;
		}
	}
	return null;
}

export function parseMetadata(html: string, baseUrl: string): UnfurlMetadata {
	return {
		// Basic
		title: extractTitle(html),
		description: extractMetaContent(html, "description", "name"),
		url: baseUrl,
		favicon: extractFavicon(html, baseUrl),

		// Open Graph
		ogTitle: extractMetaContent(html, "og:title"),
		ogDescription: extractMetaContent(html, "og:description"),
		ogImage: extractMetaContent(html, "og:image"),
		ogUrl: extractMetaContent(html, "og:url"),
		ogType: extractMetaContent(html, "og:type"),
		ogSiteName: extractMetaContent(html, "og:site_name"),

		// Twitter Card
		twitterCard: extractMetaContent(html, "twitter:card", "name"),
		twitterTitle: extractMetaContent(html, "twitter:title", "name"),
		twitterDescription: extractMetaContent(html, "twitter:description", "name"),
		twitterImage: extractMetaContent(html, "twitter:image", "name"),
		twitterSite: extractMetaContent(html, "twitter:site", "name"),
		twitterCreator: extractMetaContent(html, "twitter:creator", "name"),

		// Apple/iMessage
		appleTitle:
			extractMetaContent(html, "apple-mobile-web-app-title", "name") ||
			extractTitle(html),
		appleTouchIcon: extractAppleTouchIcon(html, baseUrl),
	};
}

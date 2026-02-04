import type { Metadata } from "next";

function deepMerge<T extends Record<string, unknown>>(
	base: T,
	overrides: Partial<T>,
): T {
	const result = { ...base };
	for (const key of Object.keys(overrides) as (keyof T)[]) {
		const val = overrides[key];
		if (
			val !== null &&
			val !== undefined &&
			typeof val === "object" &&
			!Array.isArray(val) &&
			typeof result[key] === "object" &&
			result[key] !== null &&
			!Array.isArray(result[key])
		) {
			result[key] = deepMerge(
				result[key] as Record<string, unknown>,
				val as Record<string, unknown>,
			) as T[keyof T];
		} else {
			result[key] = val as T[keyof T];
		}
	}
	return result;
}

export function buildMetadata(overrides: Metadata): Metadata {
	return deepMerge(
		defaultMetadata as Record<string, unknown>,
		overrides as Record<string, unknown>,
	) as Metadata;
}

const defaultMetadata: Metadata = {
	title: "Dru Sellers",
	authors: [{ name: "Dru Sellers", url: "https://drusellers.com/" }],
	description: "Dru's thoughts",
	icons: [{ rel: "icon", url: "/images/favicon.png" }],
	openGraph: {
		title: "Dru Sellers",
		siteName: "Dru Sellers",
		description: "Personal website for Dru Sellers",
		url: "https://drusellers.com",
		authors: "Dru Sellers",
		images: [
			{
				url: "https://drusellers.com/images/dru-serious-2x600.png",
				width: 600,
				height: 312,
			},
		],
		locale: "en-US",
	},
	twitter: {
		site: "Dru Sellers",
		creator: "Dru Sellers",
	},
};

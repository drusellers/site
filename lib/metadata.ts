import type { Metadata, ResolvedMetadata } from "next";
import type { Twitter } from "next/dist/lib/metadata/types/twitter-types";
import { DEFAULT_IMAGE } from "./consts";

export type PageMetadataInput = {
	title: string;
	description: string;
	url: string;
	imageUrl?: string;
	publishedTime?: string;
	tags?: string[];
};

/**
 * Builds page metadata by merging page-specific data with parent metadata.
 * Handles openGraph and Twitter card boilerplate.
 */
export function buildMetadata(
	input: PageMetadataInput,
	parentMetadata: ResolvedMetadata,
): Metadata {
	const { title, description, url, publishedTime, tags } = input;
	const imageUrl = input.imageUrl ?? DEFAULT_IMAGE;

	return {
		title,
		description,
		openGraph: {
			...parentMetadata.openGraph,
			title,
			description,
			url,
			type: "article",
			publishedTime,
			tags,
			images: [
				{
					url: imageUrl,
					width: 600,
					height: 312,
					alt: title,
				},
			],
		},
		twitter: {
			site: parentMetadata.twitter?.site ?? undefined,
			creator: parentMetadata.twitter?.creator ?? undefined,
			card: "summary_large_image",
			title,
			description,
			images: [imageUrl],
		} satisfies Twitter,
	};
}

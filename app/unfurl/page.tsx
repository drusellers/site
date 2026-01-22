import { parseMetadata, type UnfurlMetadata } from "@/lib/unfurl";

type Props = {
	searchParams: Promise<{ path?: string }>;
};

function extractPath(input: string): string {
	// If it looks like a full URL, extract just the path
	if (input.startsWith("http://") || input.startsWith("https://")) {
		try {
			const url = new URL(input);
			return url.pathname;
		} catch {
			// If parsing fails, treat as path
			return input;
		}
	}
	return input;
}

async function fetchMetadata(
	input: string,
): Promise<{ metadata: UnfurlMetadata; html: string } | { error: string }> {
	const baseUrl = "http://localhost:3000";
	const path = extractPath(input);
	const fullUrl = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;

	try {
		const response = await fetch(fullUrl, {
			cache: "no-store",
		});

		if (!response.ok) {
			return {
				error: `Failed to fetch: ${response.status} ${response.statusText}`,
			};
		}

		const html = await response.text();
		const metadata = parseMetadata(html, baseUrl);

		return { metadata, html };
	} catch (e) {
		return {
			error: `Fetch error: ${e instanceof Error ? e.message : "Unknown error"}`,
		};
	}
}

function TwitterCard({ metadata }: { metadata: UnfurlMetadata }) {
	const title = metadata.twitterTitle || metadata.ogTitle || metadata.title;
	const description =
		metadata.twitterDescription ||
		metadata.ogDescription ||
		metadata.description;
	const image = metadata.twitterImage || metadata.ogImage;
	const cardType = metadata.twitterCard || "summary";

	const isLargeImage = cardType === "summary_large_image";

	return (
		<div className="bg-white rounded-2xl border border-gray-200 overflow-hidden max-w-[506px]">
			{isLargeImage && image && (
				<div className="aspect-[2/1] bg-gray-100 overflow-hidden">
					<img src={image} alt="" className="w-full h-full object-cover" />
				</div>
			)}
			<div className={`flex ${!isLargeImage ? "p-3" : ""}`}>
				{!isLargeImage && image && (
					<div className="w-[125px] h-[125px] flex-shrink-0 bg-gray-100 overflow-hidden rounded-l-xl">
						<img src={image} alt="" className="w-full h-full object-cover" />
					</div>
				)}
				<div
					className={`flex flex-col justify-center ${isLargeImage ? "p-3" : "pl-3"} min-w-0`}
				>
					<div className="text-gray-500 text-sm truncate">
						{metadata.url?.replace(/^https?:\/\//, "").split("/")[0]}
					</div>
					<div className="font-normal text-[15px] text-gray-900 truncate">
						{title || "No title"}
					</div>
					{description && (
						<div className="text-gray-500 text-sm line-clamp-2">
							{description}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function SlackCard({ metadata }: { metadata: UnfurlMetadata }) {
	const title = metadata.ogTitle || metadata.title;
	const description = metadata.ogDescription || metadata.description;
	const image = metadata.ogImage;
	const siteName =
		metadata.ogSiteName ||
		metadata.url?.replace(/^https?:\/\//, "").split("/")[0];

	return (
		<div className="border-l-4 border-gray-400 pl-3 py-1 max-w-[560px]">
			<div className="flex items-center gap-2 mb-1">
				{metadata.favicon && (
					<img src={metadata.favicon} alt="" className="w-4 h-4" />
				)}
				<span className="text-sm font-bold text-gray-700">{siteName}</span>
			</div>
			<a
				href="#"
				className="text-blue-600 hover:underline font-bold block mb-1"
			>
				{title || "No title"}
			</a>
			{description && (
				<div className="text-gray-800 text-sm mb-2 line-clamp-3">
					{description}
				</div>
			)}
			{image && (
				<div className="mt-2 max-w-[360px] rounded overflow-hidden">
					<img src={image} alt="" className="max-h-[200px] object-cover" />
				</div>
			)}
		</div>
	);
}

function IMessageCard({ metadata }: { metadata: UnfurlMetadata }) {
	const title = metadata.ogTitle || metadata.title;
	const image = metadata.ogImage;
	const domain = metadata.url?.replace(/^https?:\/\//, "").split("/")[0];

	return (
		<div className="bg-gray-100 rounded-2xl overflow-hidden max-w-[260px]">
			{image && (
				<div className="aspect-[1.91/1] bg-gray-200 overflow-hidden">
					<img src={image} alt="" className="w-full h-full object-cover" />
				</div>
			)}
			<div className="p-2">
				<div className="text-gray-500 text-xs uppercase tracking-wide">
					{domain}
				</div>
				<div className="font-semibold text-sm text-gray-900 line-clamp-2">
					{title || "No title"}
				</div>
			</div>
		</div>
	);
}

function LinkedInCard({ metadata }: { metadata: UnfurlMetadata }) {
	const title = metadata.ogTitle || metadata.title;
	const image = metadata.ogImage;

	return (
		<div className="bg-white border border-gray-300 rounded-lg overflow-hidden max-w-[552px]">
			{image && (
				<div className="aspect-[1.91/1] bg-gray-100 overflow-hidden">
					<img src={image} alt="" className="w-full h-full object-cover" />
				</div>
			)}
			<div className="p-3">
				<div className="font-semibold text-sm text-gray-900 line-clamp-2">
					{title || "No title"}
				</div>
				<div className="text-xs text-gray-500 mt-1">
					{metadata.url?.replace(/^https?:\/\//, "").split("/")[0]}
				</div>
			</div>
		</div>
	);
}

function DiscordCard({ metadata }: { metadata: UnfurlMetadata }) {
	const title = metadata.ogTitle || metadata.title;
	const description = metadata.ogDescription || metadata.description;
	const image = metadata.ogImage;
	const siteName = metadata.ogSiteName;

	return (
		<div className="bg-[#2f3136] rounded border-l-4 border-[#5865f2] p-4 max-w-[432px]">
			{siteName && <div className="text-xs text-gray-400 mb-1">{siteName}</div>}
			<a
				href="#"
				className="text-[#00aff4] hover:underline font-semibold block mb-1"
			>
				{title || "No title"}
			</a>
			{description && (
				<div className="text-gray-300 text-sm mb-2 line-clamp-3">
					{description}
				</div>
			)}
			{image && (
				<div className="mt-2 rounded overflow-hidden">
					<img
						src={image}
						alt=""
						className="max-w-full max-h-[300px] object-cover rounded"
					/>
				</div>
			)}
		</div>
	);
}

function MetadataTable({ metadata }: { metadata: UnfurlMetadata }) {
	const sections = [
		{
			title: "Basic",
			items: [
				{ label: "Title", value: metadata.title },
				{ label: "Description", value: metadata.description },
				{ label: "URL", value: metadata.url },
				{ label: "Favicon", value: metadata.favicon },
			],
		},
		{
			title: "Open Graph",
			items: [
				{ label: "og:title", value: metadata.ogTitle },
				{ label: "og:description", value: metadata.ogDescription },
				{ label: "og:image", value: metadata.ogImage },
				{ label: "og:url", value: metadata.ogUrl },
				{ label: "og:type", value: metadata.ogType },
				{ label: "og:site_name", value: metadata.ogSiteName },
			],
		},
		{
			title: "Twitter Card",
			items: [
				{ label: "twitter:card", value: metadata.twitterCard },
				{ label: "twitter:title", value: metadata.twitterTitle },
				{ label: "twitter:description", value: metadata.twitterDescription },
				{ label: "twitter:image", value: metadata.twitterImage },
				{ label: "twitter:site", value: metadata.twitterSite },
				{ label: "twitter:creator", value: metadata.twitterCreator },
			],
		},
		{
			title: "Apple/iMessage",
			items: [
				{ label: "apple-mobile-web-app-title", value: metadata.appleTitle },
				{ label: "apple-touch-icon", value: metadata.appleTouchIcon },
			],
		},
	];

	return (
		<div className="space-y-6">
			{sections.map((section) => (
				<div key={section.title}>
					<h3 className="font-semibold text-gray-700 mb-2">{section.title}</h3>
					<table className="w-full text-sm">
						<tbody>
							{section.items.map((item) => (
								<tr key={item.label} className="border-b border-gray-100">
									<td className="py-1 pr-4 text-gray-500 font-mono w-48">
										{item.label}
									</td>
									<td className="py-1 text-gray-900 break-all">
										{item.value || <span className="text-gray-300">—</span>}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			))}
		</div>
	);
}

export default async function UnfurlPage({ searchParams }: Props) {
	const { path } = await searchParams;

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">Unfurl Tester</h1>
				<p className="text-gray-600 mb-6">
					Test how your pages will appear when shared on social media platforms.
				</p>

				<form className="mb-8">
					<div className="flex gap-2">
						<input
							type="text"
							name="path"
							defaultValue={path || ""}
							placeholder="http://localhost:3000/posts/my-post"
							className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
						/>
						<button
							type="submit"
							className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							Test
						</button>
					</div>
					<p className="text-sm text-gray-500 mt-2">
						Enter a URL like{" "}
						<code className="bg-gray-100 px-1 rounded">
							http://localhost:3000/posts/my-post
						</code>{" "}
						or a path like{" "}
						<code className="bg-gray-100 px-1 rounded">/posts/my-post</code>
					</p>
				</form>

				{path && <UnfurlResults path={path} />}
			</div>
		</div>
	);
}

async function UnfurlResults({ path }: { path: string }) {
	const result = await fetchMetadata(path);

	if ("error" in result) {
		return (
			<div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
				{result.error}
			</div>
		);
	}

	const { metadata } = result;

	return (
		<div className="space-y-8">
			<section>
				<h2 className="text-xl font-semibold text-gray-800 mb-4">
					Platform Previews
				</h2>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div>
						<h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
							Twitter / X
						</h3>
						<TwitterCard metadata={metadata} />
					</div>

					<div>
						<h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
							Slack
						</h3>
						<SlackCard metadata={metadata} />
					</div>

					<div>
						<h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
							iMessage
						</h3>
						<IMessageCard metadata={metadata} />
					</div>

					<div>
						<h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
							LinkedIn
						</h3>
						<LinkedInCard metadata={metadata} />
					</div>

					<div>
						<h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
							Discord
						</h3>
						<DiscordCard metadata={metadata} />
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-semibold text-gray-800 mb-4">
					Extracted Metadata
				</h2>
				<div className="bg-white rounded-lg border border-gray-200 p-6">
					<MetadataTable metadata={metadata} />
				</div>
			</section>
		</div>
	);
}

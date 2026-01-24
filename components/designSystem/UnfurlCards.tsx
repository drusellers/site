import type { UnfurlMetadata } from "@/lib/unfurl";

export function TwitterCard({ metadata }: { metadata: UnfurlMetadata }) {
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

export function SlackCard({ metadata }: { metadata: UnfurlMetadata }) {
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
				href={metadata.url || "#"}
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

export function IMessageCard({ metadata }: { metadata: UnfurlMetadata }) {
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

export function LinkedInCard({ metadata }: { metadata: UnfurlMetadata }) {
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

export function DiscordCard({ metadata }: { metadata: UnfurlMetadata }) {
	const title = metadata.ogTitle || metadata.title;
	const description = metadata.ogDescription || metadata.description;
	const image = metadata.ogImage;
	const siteName = metadata.ogSiteName;

	return (
		<div className="bg-[#2f3136] rounded border-l-4 border-[#5865f2] p-4 max-w-[432px]">
			{siteName && <div className="text-xs text-gray-400 mb-1">{siteName}</div>}
			<a
				href={metadata.url || "#"}
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
						alt="yup"
						className="max-w-full max-h-[300px] object-cover rounded"
					/>
				</div>
			)}
		</div>
	);
}

export function MetadataTable({ metadata }: { metadata: UnfurlMetadata }) {
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

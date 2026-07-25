import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import {
	DiscordCard,
	IMessageCard,
	LinkedInCard,
	MetadataTable,
	SlackCard,
	TwitterCard,
} from "@/components/designSystem/UnfurlCards";
import { parseMetadata, type UnfurlMetadata } from "@/lib/unfurl";

type Search = {
	path?: string;
};

function extractPath(input: string): string {
	if (input.startsWith("http://") || input.startsWith("https://")) {
		try {
			const url = new URL(input);
			return url.pathname;
		} catch {
			return input;
		}
	}
	return input;
}

const fetchMetadata = createServerFn({ method: "GET" })
	.validator((input: string) => input)
	.handler(
		async ({
			data: input,
		}): Promise<
			{ metadata: UnfurlMetadata; html: string } | { error: string }
		> => {
			const { getRequestHeaders } = await import(
				"@tanstack/react-start/server"
			);
			const headers = getRequestHeaders();
			const host = headers.get("host") || "localhost:3000";
			const protocol =
				headers.get("x-forwarded-proto") ||
				(process.env.NODE_ENV === "development" ? "http" : "https");
			const baseUrl = `${protocol}://${host}`;
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
		},
	);

export const Route = createFileRoute("/unfurl")({
	validateSearch: (search: Record<string, unknown>): Search => ({
		path: typeof search.path === "string" ? search.path : undefined,
	}),
	loaderDeps: ({ search }) => ({ path: search.path }),
	loader: async ({ deps }) => {
		if (!deps.path) return null;
		return fetchMetadata({ data: deps.path });
	},
	component: UnfurlPage,
});

function UnfurlPage() {
	const { path } = Route.useSearch();
	const result = Route.useLoaderData();

	return (
		<div className="min-h-screen bg-page-background p-8">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold text-text-page-title mb-2">
					Unfurl Tester
				</h1>
				<p className="text-text-secondary mb-6">
					Test how your pages will appear when shared on social media platforms.
				</p>

				<form className="mb-8">
					<div className="flex gap-2">
						<input
							type="text"
							name="path"
							defaultValue={path || ""}
							placeholder="http://localhost:3000/posts/my-post"
							className="flex-1 px-4 py-2 border border-oxford-300 rounded-lg focus:ring-2 focus:ring-oxford-500 focus:border-oxford-500 outline-none bg-white dark:bg-oxford-800 text-text-primary"
						/>
						<button
							type="submit"
							className="px-6 py-2 bg-oxford-500 text-white rounded-lg hover:bg-oxford-600 transition-colors"
						>
							Test
						</button>
					</div>
					<p className="text-sm text-text-secondary mt-2">
						Enter a URL like{" "}
						<code className="bg-oxford-100 dark:bg-oxford-800 px-1 rounded text-oxford-700 dark:text-oxford-300">
							http://localhost:3000/posts/my-post
						</code>{" "}
						or a path like{" "}
						<code className="bg-oxford-100 dark:bg-oxford-800 px-1 rounded text-oxford-700 dark:text-oxford-300">
							/posts/my-post
						</code>
					</p>
				</form>

				{path && result && <UnfurlResults result={result} />}
			</div>
		</div>
	);
}

function UnfurlResults({
	result,
}: {
	result: { metadata: UnfurlMetadata; html: string } | { error: string };
}) {
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
				<h2 className="text-xl font-semibold text-text-primary mb-4">
					Platform Previews
				</h2>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div>
						<h3 className="text-sm font-medium text-text-secondary uppercase tracking-wide mb-3">
							Twitter / X
						</h3>
						<TwitterCard metadata={metadata} />
					</div>

					<div>
						<h3 className="text-sm font-medium text-text-secondary uppercase tracking-wide mb-3">
							Slack
						</h3>
						<SlackCard metadata={metadata} />
					</div>

					<div>
						<h3 className="text-sm font-medium text-text-secondary uppercase tracking-wide mb-3">
							iMessage
						</h3>
						<IMessageCard metadata={metadata} />
					</div>

					<div>
						<h3 className="text-sm font-medium text-text-secondary uppercase tracking-wide mb-3">
							LinkedIn
						</h3>
						<LinkedInCard metadata={metadata} />
					</div>

					<div>
						<h3 className="text-sm font-medium text-text-secondary uppercase tracking-wide mb-3">
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

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/text/$id")({
	server: {
		handlers: {
			GET: async ({ params }) => {
				const { getPostData } = await import("@/lib/cms.posts");
				try {
					const postData = await getPostData(params.id);
					return new Response(postData.contentPlain, {
						headers: { "Content-Type": "text/plain; charset=utf-8" },
					});
				} catch {
					return new Response("Not found", { status: 404 });
				}
			},
		},
	},
});

import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
	envPrefix: ["VITE_", "NEXT_PUBLIC_"],
	server: {
		port: 3000,
	},
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		tailwindcss(),
		tanstackStart({
			srcDirectory: "src",
			router: {
				routesDirectory: "app",
			},
			prerender: {
				enabled: true,
				crawlLinks: true,
				filter: ({ path }) =>
					path === "/" || (!path.startsWith("/unfurl") && !path.endsWith("/")),
			},
			pages: [
				{ path: "/posts", prerender: { enabled: true } },
				{ path: "/quotes", prerender: { enabled: true } },
				{ path: "/values", prerender: { enabled: true } },
				{ path: "/tags", prerender: { enabled: true } },
				{ path: "/design-system", prerender: { enabled: true } },
			],
			sitemap: {
				enabled: true,
				host: "https://drusellers.com",
			},
		}),
		viteReact(),
		nitro(),
	],
});

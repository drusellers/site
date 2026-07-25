/// <reference types="vite/client" />

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import TailwindDebug from "@/components/TailwindDebug";
import { ThemeProvider } from "@/components/theme";
import ThemeLoader from "@/components/ThemeLoader";
import ThemeScript from "@/components/ThemeScript";
import { defaultHead } from "@/lib/seo";
import appCss from "../../css/index.css?url";
import { DefaultCatchBoundary } from "../components/DefaultCatchBoundary";
import { NotFound } from "../components/NotFound";

config.autoAddCss = false;

export const Route = createRootRoute({
	head: () => {
		const head = defaultHead();
		return {
			meta: [
				{ charSet: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				...head.meta,
			],
			links: [{ rel: "stylesheet", href: appCss }, ...(head.links ?? [])],
		};
	},
	errorComponent: DefaultCatchBoundary,
	notFoundComponent: () => <NotFound />,
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<ThemeScript />
				<HeadContent />
			</head>
			<body className="bg-page-background">
				<ThemeProvider>
					<ThemeLoader />
					{children}
					<TailwindDebug />
				</ThemeProvider>
				<Scripts />
			</body>
		</html>
	);
}

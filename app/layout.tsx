import type { Metadata } from "next";
import "../css/index.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Open_Sans, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ThemeProvider } from "next-themes";
import type React from "react";
import TailwindDebug from "@/components/TailwindDebug";
import ThemeLoader from "@/components/ThemeLoader";
import ThemeScript from "@/components/ThemeScript";
import { buildMetadata } from "@/lib/cms.metadata";

config.autoAddCss = false;

const osans = Open_Sans({
	subsets: ["latin"],
	variable: "--font-open-sans",
});

const humane = localFont({
	src: "../public/fonts/Humane-VF.ttf",
	variable: "--font-humane",
});

const spaceG = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-space-g",
});

export const metadata: Metadata = buildMetadata({});

type Props = {
	children: React.ReactNode;
};

// This component carves out sections of the page, and applies sensible padding to
// them.
export default function Layout({ children }: Props) {
	return (
		<html lang={"en"} suppressHydrationWarning>
			<head>
				<ThemeScript />
			</head>
			<body
				className={`${osans.variable} ${humane.variable} ${spaceG.variable} bg-page-background`}
			>
				<ThemeProvider>
					<ThemeLoader />
					{children}
					<TailwindDebug />
				</ThemeProvider>
			</body>
		</html>
	);
}

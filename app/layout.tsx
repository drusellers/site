import { Metadata } from "next";
import "../css/index.css";
import localFont from "next/font/local";
import { Open_Sans, Space_Grotesk } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import React from "react";
import TailwindDebug from "@/components/TailwindDebug";

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

export const metadata: Metadata = {
	title: "Dru Sellers",
	authors: [{ name: "Dru Sellers", url: "https://drusellers.com" }],
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
};

type Props = {
	children: React.ReactNode;
};

// This component carves out sections of the page, and applies sensible padding to
// them.
export default function Layout({ children }: Props) {
	return (
		<html lang={"en"} className={``}>
			<body
				className={`${osans.variable} ${humane.variable} ${spaceG.variable} bg-oxford-100`}
			>
				{children}
				<TailwindDebug />
			</body>
		</html>
	);
}

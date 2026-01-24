import type React from "react";
import { calculatePageTitleClasses } from "@/components/oxford/PageTitle";
import TypographyCard from "./TypographyCard";

interface TypographyDefinition2 {
	title: string;
	family: string;
	fontFamily: string;
	cssClass: string;
	variants: TypographyDefinition[];
}

interface TypographyDefinition {
	name: string;
	example: string;
	classes: string[];
}

const typographyData: {
	pageTitles: TypographyDefinition2;
	inPageTitles: TypographyDefinition2;
	bodyCopy: TypographyDefinition2;
} = {
	pageTitles: {
		title: "Page Titles",
		family: "Humane",
		fontFamily: "var(--font-humane)",
		cssClass: "font-page-title",
		variants: [
			{
				name: "Page Title Large",
				example: "Page Title Large",
				classes: calculatePageTitleClasses(1).split(" "),
			},
			{
				name: "Page Title Small",
				example: "Page Title Small",
				classes: calculatePageTitleClasses(15).split(" "),
			},
		],
	},
	inPageTitles: {
		title: "In Page Titles (H1-H6)",
		family: "Space Grotesk",
		fontFamily: "var(--font-space-g)",
		cssClass: "font-heading",
		variants: [
			{
				name: "Heading 1",
				example: "Heading 1",
				classes: [
					"text-4xl",
					"font-bold",
					"font-heading",
					"text-oxford-500",
					"uppercase",
				],
			},
			{
				name: "Heading 2",
				example: "Heading 2",
				classes: [
					"text-3xl",
					"font-bold",
					"font-heading",
					"text-oxford-500",
					"uppercase",
				],
			},
			{
				name: "Heading 3",
				example: "Heading 3",
				classes: [
					"text-2xl",
					"font-bold",
					"font-heading",
					"text-oxford-500",
					"uppercase",
				],
			},
			{
				name: "Heading 4",
				example: "Heading 4",
				classes: [
					"text-xl",
					"font-bold",
					"font-heading",
					"text-oxford-500",
					"uppercase",
				],
			},
			{
				name: "Heading 5",
				example: "Heading 5",
				classes: [
					"text-lg",
					"font-bold",
					"font-heading",
					"text-oxford-500",
					"uppercase",
				],
			},
			{
				name: "Heading 6",
				example: "Heading 6",
				classes: [
					"text-base",
					"font-bold",
					"font-heading",
					"text-oxford-500",
					"uppercase",
				],
			},
		],
	},
	bodyCopy: {
		title: "Body Copy",
		family: "Open Sans",
		fontFamily: "var(--font-open-sans)",
		cssClass: "font-body-text",
		variants: [
			{
				name: "Body Copy",
				example: "Body Copy",
				classes: ["font-sans", "text-base", "text-gray-900"],
			},
		],
	},
};

const TypographyGuide: React.FC = () => {
	const { pageTitles, inPageTitles, bodyCopy } = typographyData;

	return (
		<div className="space-y-12 mb-12">
			{/* Page Titles Section */}
			<FontUseCard def={pageTitles} />
			{/* In-Page Titles Section */}
			<FontUseCard def={inPageTitles} />
			{/* Body Copy Section */}
			<FontUseCard def={bodyCopy} />
		</div>
	);
};

export default TypographyGuide;

function FontUseCard({ def }: { def: TypographyDefinition2 }) {
	return (
		<div>
			<div className={"flex justify-between"}>
				<h2 className="text-2xl font-bold text-oxford-500 mb-6">{def.title}</h2>
				<div className={"flex gap-2"}>
					<div>
						<code className="px-2 py-1 bg-gray-100 rounded font-mono text-xs">
							{def.family}
						</code>
					</div>
					<div>
						<code className="px-2 py-1 bg-gray-100 rounded font-mono text-xs">
							{def.cssClass}
						</code>
					</div>
				</div>
			</div>

			<div className="space-y-6">
				{def.variants.map((heading) => (
					<TypographyCard
						key={heading.name}
						font={def.family}
						example={heading.example}
						classes={heading.classes}
						fontFamily={def.fontFamily}
					/>
				))}
			</div>
		</div>
	);
}

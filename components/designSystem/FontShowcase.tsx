"use client";

import React from "react";

interface FontDefinition {
	name: string;
	variable: string;
	source: string;
	description: string;
	family: string;
	usage: string;
}

const fonts: FontDefinition[] = [
	{
		name: "Humane",
		variable: "var(--font-humane)",
		source: "Custom variable font from /public/fonts/Humane-VF.ttf",
		description:
			"A custom variable font that brings personality and elegance to headings. Its variable nature allows for fine-tuned weight adjustments while maintaining excellent readability at larger sizes.",
		family: "humane",
		usage: "Page Titles Only",
	},
	{
		name: "Space Grotesk",
		variable: "var(--font-space-g)",
		source: "Google Font available as alternative",
		description:
			"A distinctive sans-serif with a personality that bridges the gap between technical precision and creative expression. Used for secondary headings and UI elements where character is desired.",
		family: "Space Grotesk",
		usage: "In Page Headings",
	},
	{
		name: "Open Sans",
		variable: "var(--font-open-sans)",
		source: "Google Font loaded via Next.js optimization",
		description:
			"Chosen for body text due to its excellent readability and neutral personality. Open Sans performs well across different screen sizes and provides comfortable reading experience for longer content.",
		family: "Open Sans",
		usage: "Page Copy",
	},
];

const FontShowcase: React.FC = () => {
	const testText = "I bet it looks crispy in the dark";

	return (
		<div className="space-y-8">
			{fonts.map((font, index) => (
				<React.Fragment key={font.name}>
					<div className="border border-gray-200 rounded-lg p-6 space-y-6">
						{/* Font Header */}
						<div className="border-b border-gray-200 pb-4">
							<div className="flex items-center justify-between">
								<h3 className="text-xl font-bold text-gray-900">{font.name}</h3>
								<div className="text-sm font-medium text-oxford-500 bg-oxford-100 px-3 py-1 rounded">
									{font.usage}
								</div>
							</div>
							<div className="text-sm text-gray-600 mt-1">{font.source}</div>
						</div>

						{/* Font Samples */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Large Size */}
							<div className="space-y-3">
								<h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
									Large Size
								</h4>
								<div
									style={{ fontFamily: font.variable }}
									className="text-4xl leading-tight text-gray-900"
								>
									{testText}
								</div>
								<div className="text-xs text-gray-500 font-mono">
									font-size: text-4xl | font-family: {font.variable}
								</div>
							</div>

							{/* Small Size */}
							<div className="space-y-3">
								<h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
									Small Size
								</h4>
								<div
									style={{ fontFamily: font.variable }}
									className="text-base text-gray-900"
								>
									{testText}
								</div>
								<div className="text-xs text-gray-500 font-mono">
									font-size: text-base | font-family: {font.variable}
								</div>
							</div>
						</div>

						{/* Description */}
						<div className="space-y-3">
							<h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
								Rationale
							</h4>
							<p className="text-gray-700 leading-relaxed">
								{font.description}
							</p>
						</div>

						{/* Technical Details */}
						<div className="space-y-3">
							<h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
								Technical Details
							</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
								<div>
									<span className="font-medium text-gray-600">
										CSS Variable:
									</span>
									<code className="ml-2 px-2 py-1 bg-gray-100 rounded font-mono text-xs">
										{font.variable}
									</code>
								</div>
								<div>
									<span className="font-medium text-gray-600">
										Font Family:
									</span>
									<code className="ml-2 px-2 py-1 bg-gray-100 rounded font-mono text-xs">
										{font.family}
									</code>
								</div>
							</div>
						</div>
					</div>
					{index < fonts.length - 1 && <hr className="border-gray-300 my-8" />}
				</React.Fragment>
			))}
		</div>
	);
};

export default FontShowcase;

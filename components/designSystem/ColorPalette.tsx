"use client";

import type React from "react";
import { useState } from "react";
import ColorPaletteCard from "@/components/ui/ColorPaletteCard";

interface ColorInfo {
	name: string;
	variant: string;
	value: string;
	usage?: string;
}

const ColorPalette: React.FC = () => {
	const [copiedColor, setCopiedColor] = useState<string>("");

	const colors: ColorInfo[] = [
		// Oxford Colors
		{
			name: "Oxford",
			variant: "100",
			value: "#e0ebe9",
			usage: "Light background, subtle accents",
		},
		{
			name: "Oxford",
			variant: "200",
			value: "#d0e3e0",
			usage: "Hover states, secondary backgrounds",
		},
		{
			name: "Oxford",
			variant: "500",
			value: "#314d65",
			usage: "Primary text, headings, main color",
		},
		{
			name: "Oxford",
			variant: "600",
			value: "#254058",
			usage: "Hover states, darker accents",
		},

		// Bluetide Light Colors
		{
			name: "Bluetide Light",
			variant: "50",
			value: "oklch(0.985 0.015 250)",
			usage: "Main light background",
		},
		{
			name: "Bluetide Light",
			variant: "100",
			value: "oklch(0.970 0.018 250)",
			usage: "Secondary light backgrounds",
		},
		{
			name: "Bluetide Light",
			variant: "200",
			value: "oklch(0.950 0.020 250)",
			usage: "Light hover states",
		},
		{
			name: "Bluetide Light",
			variant: "300",
			value: "oklch(0.920 0.022 250)",
			usage: "Light accents",
		},
		{
			name: "Bluetide Light",
			variant: "400",
			value: "oklch(0.880 0.024 250)",
			usage: "Light borders",
		},
		{
			name: "Bluetide Light",
			variant: "500",
			value: "oklch(0.820 0.026 250)",
			usage: "Light interactive elements",
		},
		{
			name: "Bluetide Light",
			variant: "600",
			value: "oklch(0.740 0.028 250)",
			usage: "Light active states",
		},
		{
			name: "Bluetide Light",
			variant: "700",
			value: "oklch(0.640 0.030 250)",
			usage: "Light text on light backgrounds",
		},
		{
			name: "Bluetide Light",
			variant: "800",
			value: "oklch(0.520 0.032 250)",
			usage: "Light headings",
		},
		{
			name: "Bluetide Light",
			variant: "900",
			value: "oklch(0.400 0.034 250)",
			usage: "Light emphasis text",
		},
		{
			name: "Bluetide Light",
			variant: "950",
			value: "oklch(0.300 0.036 250)",
			usage: "Light strong emphasis",
		},

		// Bluetide Dark Colors
		{
			name: "Bluetide Dark",
			variant: "50",
			value: "oklch(0.920 0.020 250)",
			usage: "Dark mode light accents",
		},
		{
			name: "Bluetide Dark",
			variant: "100",
			value: "oklch(0.850 0.022 250)",
			usage: "Dark mode secondary backgrounds",
		},
		{
			name: "Bluetide Dark",
			variant: "200",
			value: "oklch(0.760 0.024 250)",
			usage: "Dark mode hover states",
		},
		{
			name: "Bluetide Dark",
			variant: "300",
			value: "oklch(0.660 0.026 250)",
			usage: "Dark mode accents",
		},
		{
			name: "Bluetide Dark",
			variant: "400",
			value: "oklch(0.560 0.028 250)",
			usage: "Dark mode borders",
		},
		{
			name: "Bluetide Dark",
			variant: "500",
			value: "oklch(0.460 0.030 250)",
			usage: "Dark mode interactive elements",
		},
		{
			name: "Bluetide Dark",
			variant: "600",
			value: "oklch(0.360 0.032 250)",
			usage: "Dark mode active states",
		},
		{
			name: "Bluetide Dark",
			variant: "700",
			value: "oklch(0.280 0.034 250)",
			usage: "Dark mode text on dark backgrounds",
		},
		{
			name: "Bluetide Dark",
			variant: "800",
			value: "oklch(0.210 0.036 250)",
			usage: "Dark mode headings",
		},
		{
			name: "Bluetide Dark",
			variant: "900",
			value: "oklch(0.160 0.038 250)",
			usage: "Dark mode emphasis text",
		},
		{
			name: "Bluetide Dark",
			variant: "950",
			value: "oklch(0.120 0.040 250)",
			usage: "Dark mode main background",
		},

		// Semantic Colors
		{
			name: "Success",
			variant: "500",
			value: "#5a7c6a",
			usage: "Positive actions, success states",
		},
		{
			name: "Success",
			variant: "600",
			value: "#4a6656",
			usage: "Success hover states",
		},
		{
			name: "Danger",
			variant: "500",
			value: "#9d6b6b",
			usage: "Destructive actions, errors",
		},
		{
			name: "Danger",
			variant: "600",
			value: "#8d5b5b",
			usage: "Danger hover states",
		},
		{
			name: "Warning",
			variant: "500",
			value: "#8b7d5c",
			usage: "Cautionary actions, warnings",
		},
		{
			name: "Warning",
			variant: "600",
			value: "#7b6d4c",
			usage: "Warning hover states",
		},
	];

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		setCopiedColor(text);
		setTimeout(() => setCopiedColor(""), 2000);
	};

	const groupedColors = colors.reduce(
		(acc, color) => {
			const key = color.name;
			if (!acc[key]) acc[key] = [];
			acc[key].push(color);
			return acc;
		},
		{} as Record<string, ColorInfo[]>,
	);

	return (
		<div className="space-y-8">
			<div>
				<h3 className="text-lg font-medium mb-4">Color Palette</h3>
				<p className="text-sm text-gray-600  mb-6">
					Click on any color to copy its hex value. This palette defines the
					visual language of the Oxford theme.
				</p>
			</div>

			{Object.entries(groupedColors).map(([groupName, groupColors]) => (
				<div key={groupName} className="space-y-4">
					<h4 className="text-md font-semibold text-gray-900  capitalize">
						{groupName} Colors
					</h4>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{groupColors.map((color) => (
							<ColorPaletteCard
								key={`${color.name}-${color.variant}`}
								name={color.name}
								variant={color.variant}
								value={color.value}
								usage={color.usage}
								isCopied={copiedColor === color.value}
								onClick={() => copyToClipboard(color.value)}
							/>
						))}
					</div>
				</div>
			))}

			{/* Color Usage Guidelines */}
			<div className="border border-gray-200  rounded-lg p-6">
				<h3 className="text-lg font-medium mb-4">Color Usage Guidelines</h3>
				<div className="space-y-6 text-sm">
					<div>
						<h4 className="font-semibold mb-2 text-oxford-500">
							Primary (Oxford 500)
						</h4>
						<p className="text-gray-600 ">
							Used for main actions, headings, and important UI elements. This
							is the signature color of the theme.
						</p>
					</div>

					<div>
						<h4 className="font-semibold mb-2 text-oxford-500">
							Secondary (Oxford 100/200)
						</h4>
						<p className="text-gray-600 ">
							Lighter shades for backgrounds, subtle borders, and hover states.
							Oxford 100 is the main background color.
						</p>
					</div>

					<div>
						<h4 className="font-semibold mb-2 text-bluetide-light-500">
							Bluetide Light Theme
						</h4>
						<p className="text-gray-600 ">
							Light mode color palette using OKLCH for consistent perceived
							lightness. Bluetide Light 50 is the main background, with
							progressive darkening for interactive elements and text.
						</p>
					</div>

					<div>
						<h4 className="font-semibold mb-2 text-bluetide-dark-500">
							Bluetide Dark Theme
						</h4>
						<p className="text-gray-600 ">
							Dark mode color palette using OKLCH for consistent perceived
							lightness. Bluetide Dark 950 is the main background, with
							progressive lightening for interactive elements and text.
						</p>
					</div>

					<div>
						<h4 className="font-semibold mb-2 text-success-500">Success</h4>
						<p className="text-gray-600 ">
							Muted olive green for positive feedback, successful actions, and
							confirmation states.
						</p>
					</div>

					<div>
						<h4 className="font-semibold mb-2 text-danger-500">Danger</h4>
						<p className="text-gray-600 ">
							Muted terracotta red for destructive actions, error states, and
							warnings about data loss.
						</p>
					</div>

					<div>
						<h4 className="font-semibold mb-2 text-warning-500">Warning</h4>
						<p className="text-gray-600 ">
							Muted amber/brown for cautionary actions, alerts, and items that
							need attention.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ColorPalette;

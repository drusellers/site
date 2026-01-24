"use client";

import type React from "react";
import { useEffect, useState } from "react";

interface OKLCHColor {
	l: number; // Lightness: 0-1
	c: number; // Chroma: 0-0.37 (approximate max)
	h: number; // Hue: 0-360
}

const OKLCHExplorer: React.FC = () => {
	const [color, setColor] = useState<OKLCHColor>({
		l: 0.7,
		c: 0.15,
		h: 180,
	});

	const [cssColor, setCssColor] = useState<string>("");
	const [rgbColor, setRgbColor] = useState<string>("");

	// Convert OKLCH to RGB for display
	useEffect(() => {
		const oklchString = `oklch(${color.l.toFixed(2)} ${color.c.toFixed(2)} ${color.h.toFixed(0)})`;
		setCssColor(oklchString);

		// Create a temporary element to read the computed RGB value
		const temp = document.createElement("div");
		temp.style.color = oklchString;
		document.body.appendChild(temp);
		const computed = window.getComputedStyle(temp).color;
		setRgbColor(computed);
		document.body.removeChild(temp);
	}, [color]);

	const generatePalette = () => {
		const palette: (OKLCHColor & { name: string })[] = [];

		// Lightness variations
		for (let l = 0; l <= 1; l += 0.1) {
			palette.push({
				...color,
				l,
				name: `Lightness ${Math.round(l * 100)}%`,
			});
		}

		// Chroma variations
		for (let c = 0; c <= 0.37; c += 0.05) {
			palette.push({
				...color,
				c,
				name: `Chroma ${c.toFixed(2)}`,
			});
		}

		// Hue variations (complementary, triadic, etc.)
		const hueVariations = [
			{ h: (color.h + 0) % 360, name: "Original" },
			{ h: (color.h + 180) % 360, name: "Complementary" },
			{ h: (color.h + 120) % 360, name: "Triadic 1" },
			{ h: (color.h + 240) % 360, name: "Triadic 2" },
			{ h: (color.h + 30) % 360, name: "Analogous 1" },
			{ h: (color.h - 30 + 360) % 360, name: "Analogous 2" },
		];

		hueVariations.forEach((variation) => {
			palette.push({
				...color,
				h: variation.h,
				name: variation.name,
			});
		});

		return palette;
	};

	const handleSliderChange = (dimension: keyof OKLCHColor, value: number) => {
		setColor((prev) => ({ ...prev, [dimension]: value }));
	};

	const palette = generatePalette();

	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Controls */}
				<div className="space-y-6">
					<h3 className="text-lg font-medium">OKLCH Controls</h3>
					<div className="text-sm text-gray-600 ">
						OKLCH separates color into three intuitive dimensions:
					</div>

					{/* Lightness Slider */}
					<div className="space-y-2">
						<label
							htmlFor="lightness-slider"
							className="flex justify-between text-sm font-medium"
						>
							<span>Lightness (L)</span>
							<span>{color.l.toFixed(2)}</span>
						</label>
						<div className="text-xs text-gray-500 ">
							How light or dark the color appears (0 = black, 1 = white)
						</div>
						<input
							id="lightness-slider"
							type="range"
							min="0"
							max="1"
							step="0.01"
							value={color.l}
							onChange={(e) =>
								handleSliderChange("l", parseFloat(e.target.value))
							}
							className="w-full h-2 bg-gradient-to-r from-black via-gray-500 to-white rounded-lg appearance-none cursor-pointer "
						/>
						<div className="flex justify-between text-xs text-gray-500">
							<span>0 (Black)</span>
							<span>1 (White)</span>
						</div>
					</div>

					{/* Chroma Slider */}
					<div className="space-y-2">
						<label
							htmlFor="chroma-slider"
							className="flex justify-between text-sm font-medium"
						>
							<span>Chroma (C)</span>
							<span>{color.c.toFixed(2)}</span>
						</label>
						<div className="text-xs text-gray-500 ">
							How colorful or vivid the color appears (0 = gray, max = most
							vibrant)
						</div>
						<input
							id="chroma-slider"
							type="range"
							min="0"
							max="0.37"
							step="0.01"
							value={color.c}
							onChange={(e) =>
								handleSliderChange("c", parseFloat(e.target.value))
							}
							className="w-full h-2 rounded-lg appearance-none cursor-pointer "
							style={{
								background: `linear-gradient(to right, 
									oklch(${color.l.toFixed(2)} 0 ${color.h.toFixed(0)}), 
									oklch(${color.l.toFixed(2)} 0.37 ${color.h.toFixed(0)}))`,
							}}
						/>
						<div className="flex justify-between text-xs text-gray-500">
							<span>0 (Gray)</span>
							<span>0.37 (Max)</span>
						</div>
					</div>

					{/* Hue Slider */}
					<div className="space-y-2">
						<label
							htmlFor="hue-slider"
							className="flex justify-between text-sm font-medium"
						>
							<span>Hue (H)</span>
							<span>{color.h.toFixed(0)}°</span>
						</label>
						<div className="text-xs text-gray-500 ">
							The color type on the color wheel (0° = red, 120° = green, 240° =
							blue)
						</div>

						<input
							id="hue-slider"
							type="range"
							min="0"
							max="360"
							step="1"
							value={color.h}
							onChange={(e) =>
								handleSliderChange("h", parseFloat(e.target.value))
							}
							className="w-full h-2 rounded-lg appearance-none cursor-pointer"
							style={{
								background: `linear-gradient(to right, 
									oklch(0.7 0.15 0), 
									oklch(0.7 0.15 60), 
									oklch(0.7 0.15 120), 
									oklch(0.7 0.15 180), 
									oklch(0.7 0.15 240), 
									oklch(0.7 0.15 300), 
									oklch(0.7 0.15 360))`,
							}}
						/>

						<div className="flex justify-between text-xs text-gray-500">
							<span>0°</span>
							<span>360°</span>
						</div>
					</div>
				</div>

				{/* Color Preview */}
				<div className="space-y-4">
					<h3 className="text-lg font-medium">Color Preview</h3>
					<div
						className="w-full h-32 rounded-lg border-2 border-gray-200 "
						style={{ backgroundColor: cssColor }}
					/>
					<div className="space-y-2 text-sm">
						<div>
							<strong>OKLCH:</strong> {cssColor}
						</div>
						<div>
							<strong>RGB:</strong> {rgbColor}
						</div>
					</div>
				</div>
			</div>

			{/* Generated Palette */}
			<div className="space-y-4">
				<h3 className="text-lg font-medium">Generated Palette</h3>
				<div className="grid grid-cols-8 gap-4">
					{palette.map((paletteColor) => {
						const colorString = `oklch(${paletteColor.l.toFixed(2)} ${paletteColor.c.toFixed(2)} ${paletteColor.h.toFixed(0)})`;
						const uniqueKey = `${paletteColor.name}-${paletteColor.l}-${paletteColor.c}-${paletteColor.h}`;

						return (
							<div key={uniqueKey} className="space-y-2">
								<div
									className="w-full h-16 rounded border border-gray-200 "
									style={{ backgroundColor: colorString }}
								/>
								<div className="text-xs">
									<div className="font-medium">{paletteColor.name}</div>
									<div className="text-gray-500 ">
										L:{paletteColor.l.toFixed(2)} C:{paletteColor.c.toFixed(2)}{" "}
										H:{paletteColor.h.toFixed(0)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* OKLCH Info */}
			<div className="border border-gray-200  rounded-lg p-6">
				<h3 className="text-lg font-medium mb-3">About OKLCH</h3>
				<div className="prose max-w-none text-sm text-gray-900 ">
					<p>OKLCH is a modern color space that provides:</p>
					<ul className="list-disc list-inside space-y-1">
						<li>
							<strong>Perceptual uniformity:</strong> Changes in values
							correspond to perceived changes in color
						</li>
						<li>
							<strong>Wide gamut:</strong> Can display more colors than
							traditional RGB spaces
						</li>
						<li>
							<strong>Intuitive controls:</strong> Lightness, Chroma
							(colorfulness), and Hue are separate dimensions
						</li>
						<li>
							<strong>Better accessibility:</strong> More predictable contrast
							ratios
						</li>
					</ul>
					<p className="mt-3">
						Use the sliders above to explore how each dimension affects the
						color, and see the generated palette for design inspiration.
					</p>
				</div>
			</div>
		</div>
	);
};

export default OKLCHExplorer;

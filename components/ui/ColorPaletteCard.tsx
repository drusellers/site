"use client";

import type React from "react";

interface ColorPaletteCardProps {
	name: string;
	variant: string;
	value: string;
	usage?: string;
	isCopied: boolean;
	onClick: () => void;
}

const ColorPaletteCard: React.FC<ColorPaletteCardProps> = ({
	name,
	variant,
	value,
	usage,
	isCopied,
	onClick,
}) => {
	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			onClick();
		}
	};

	return (
		<button
			className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-oxford-500 text-left flex flex-col"
			onClick={onClick}
			onKeyDown={handleKeyDown}
			type="button"
		>
			{/* Color Chip - fills available space with min height */}
			<div
				className="flex-1 w-full relative min-h-[100px]"
				style={{ backgroundColor: value }}
			>
				{isCopied && (
					<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-medium">
						Copied!
					</div>
				)}
			</div>

			{/* Information Panel - expands as needed */}
			<div className="p-3 bg-white dark:bg-gray-800">
				{/* Header */}
				<div className="flex items-center justify-between mb-1">
					<span className="font-medium text-gray-900 dark:text-gray-100">
						{name} {variant}
					</span>
					<span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
						{value}
					</span>
				</div>

				{/* Usage Description */}
				{usage && (
					<div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
						{usage}
					</div>
				)}

				{/* Technical Details */}
				<div className="mt-2 text-xs space-y-1">
					<div className="font-mono text-gray-600 dark:text-gray-400">
						Tailwind: {name.toLowerCase()}-{variant}
					</div>
					<div className="font-mono text-gray-600 dark:text-gray-400">
						CSS: var(--color-{name.toLowerCase()}-{variant})
					</div>
				</div>
			</div>
		</button>
	);
};

export default ColorPaletteCard;

"use client";

import { faCheck, faCopy } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type React from "react";
import { useState } from "react";

interface ClipboardProps {
	text: string;
	children?: React.ReactNode;
	variant?: "button" | "icon";
	size?: "sm" | "md" | "lg";
	className?: string;
}

const Clipboard: React.FC<ClipboardProps> = ({
	text,
	children,
	variant = "button",
	size = "md",
	className = "",
}) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy text: ", err);
		}
	};

	if (variant === "icon") {
		const sizeClasses = {
			sm: "w-4 h-4",
			md: "w-5 h-5",
			lg: "w-6 h-6",
		};

		return (
			<button
				onClick={handleCopy}
				className={`inline-flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-oxford-500 rounded ${sizeClasses[size]} ${className}`}
				title={copied ? "Copied!" : "Copy to clipboard"}
			>
				<FontAwesomeIcon
					icon={copied ? faCheck : faCopy}
					className={copied ? "text-success-500" : ""}
				/>
			</button>
		);
	}

	const buttonSizeClasses = {
		sm: "px-3 py-1.5 text-xs",
		md: "px-4 py-2 text-sm",
		lg: "px-6 py-3 text-base",
	};

	return (
		<button
			onClick={handleCopy}
			className={`inline-flex items-center gap-2 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonSizeClasses[size]} bg-oxford-100 text-oxford-500 hover:bg-oxford-200 focus:ring-oxford-500 ${className}`}
		>
			<FontAwesomeIcon
				icon={copied ? faCheck : faCopy}
				className={copied ? "text-success-500" : ""}
			/>
			{copied ? "Copied!" : children || "Copy"}
		</button>
	);
};

export default Clipboard;

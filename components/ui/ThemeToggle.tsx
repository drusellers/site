"use client";

import { faLightbulb, faLightbulbOn } from "@fortawesome/pro-light-svg-icons";
import { faMoon, faSun } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
	const { theme, setTheme, systemTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	const currentTheme = theme === "system" ? systemTheme : theme;
	const isDark = currentTheme === "dark";

	useEffect(() => {
		setMounted(true);
		// Add theme-loaded class to prevent FOUC
		document.documentElement.classList.add("theme-loaded");
	}, []);

	useEffect(() => {
		// Sync dark class with theme - ensure both html and body are updated
		if (mounted) {
			if (isDark) {
				document.documentElement.classList.add("dark");
				document.body.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
				document.body.classList.remove("dark");
			}
		}
	}, [isDark, mounted]);

	const handleToggle = () => {
		if (isAnimating) return;

		setIsAnimating(true);
		const newTheme = isDark ? "light" : "dark";
		setTheme(newTheme);

		// Reset animation state after transition
		setTimeout(() => {
			setIsAnimating(false);
		}, 300);
	};

	if (!mounted) {
		return (
			<div
				className="w-11 h-6 rounded-sm animate-pulse"
				style={{
					backgroundColor: "var(--dds-toggle-track-light)",
				}}
			/>
		);
	}

	return (
		<button
			type="button"
			onClick={handleToggle}
			disabled={isAnimating}
			className="relative inline-flex items-center h-6 rounded-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-oxford-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed w-11"
			style={{
				backgroundColor: "var(--dds-toggle-track-light)",
			}}
			role="switch"
			aria-checked={isDark}
			aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
		>
			{/* Track background with gradient */}
			<div
				className="absolute inset-0 rounded-sm transition-all duration-300 opacity-20"
				style={{
					background: isDark
						? "var(--dds-toggle-gradient-dark)"
						: "var(--dds-toggle-gradient-light)",
				}}
			/>

			{/* Slider thumb */}
			<div
				className={`relative inline-flex items-center justify-center w-5 h-5 transform rounded-sm shadow-md transition-all duration-300 ${
					isDark ? "translate-x-5" : "translate-x-0.5"
				} ${isAnimating ? "scale-90" : "scale-100"}`}
				style={{
					backgroundColor: "var(--dds-toggle-thumb-bg)",
				}}
			>
				{/* Icons inside the thumb */}
				<FontAwesomeIcon
					icon={faLightbulbOn}
					className={`absolute w-3 h-3 transition-all duration-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
						isDark
							? "opacity-0 scale-0 rotate-90"
							: "opacity-100 scale-100 rotate-0"
					}`}
					style={{
						color: "var(--dds-toggle-icon-light)",
					}}
				/>
				<FontAwesomeIcon
					icon={faLightbulb}
					className={`absolute w-3 h-3 transition-all duration-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
						isDark
							? "opacity-100 scale-100 rotate-0"
							: "opacity-0 scale-0 -rotate-90"
					}`}
					style={{
						color: "var(--dds-toggle-icon-dark)",
					}}
				/>

				{/* Subtle glow on thumb during animation */}
				{isAnimating && (
					<div
						className="absolute inset-0 rounded-sm blur-sm opacity-50"
						style={{
							backgroundColor: isDark
								? "var(--dds-toggle-glow-dark)"
								: "var(--dds-toggle-glow-light)",
						}}
					/>
				)}
			</div>

			{/* Subtle pulse effect when active */}
			{!isAnimating && (
				<div
					className="absolute inset-0 rounded-sm animate-pulse opacity-30"
					style={{
						backgroundColor: isDark
							? "var(--dds-toggle-pulse-dark)"
							: "var(--dds-toggle-pulse-light)",
						animationDuration: "2s",
					}}
				/>
			)}
		</button>
	);
}

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

		// Force immediate DOM update for better responsiveness
		setTimeout(() => {
			if (newTheme === "dark") {
				document.documentElement.classList.add("dark");
				document.body.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
				document.body.classList.remove("dark");
			}
			setIsAnimating(false);
		}, 50);
	};

	if (!mounted) {
		return (
			<div className="w-11 h-6 rounded-sm bg-gray-200 dark:bg-gray-700 animate-pulse" />
		);
	}

	return (
		<button
			type="button"
			onClick={handleToggle}
			disabled={isAnimating}
			className="relative inline-flex items-center h-6 rounded-sm bg-oxford-200 dark:bg-oxford-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-oxford-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed w-11"
			role="switch"
			aria-checked={isDark}
			aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
		>
			{/* Track background with gradient */}
			<div
				className={`absolute inset-0 rounded-sm transition-all duration-300 bg-linear-to-r ${
					isDark ? "from-blue-600 to-blue-400" : "from-orange-400 to-yellow-300"
				} opacity-20`}
			/>

			{/* Slider thumb */}
			<div
				className={`relative inline-flex items-center justify-center w-5 h-5 transform rounded-sm bg-white shadow-md transition-all duration-300 ${
					isDark ? "translate-x-5" : "translate-x-0.5"
				} ${isAnimating ? "scale-90" : "scale-100"}`}
			>
				{/* Icons inside the thumb */}
				<FontAwesomeIcon
					icon={faLightbulbOn}
					className={`absolute w-3 h-3 text-orange-500 transition-all duration-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
						isDark
							? "opacity-0 scale-0 rotate-90"
							: "opacity-100 scale-100 rotate-0"
					}`}
				/>
				<FontAwesomeIcon
					icon={faLightbulb}
					className={`absolute w-3 h-3 text-blue-600 transition-all duration-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
						isDark
							? "opacity-100 scale-100 rotate-0"
							: "opacity-0 scale-0 -rotate-90"
					}`}
				/>

				{/* Subtle glow on thumb during animation */}
				{isAnimating && (
					<div
						className={`absolute inset-0 rounded-sm blur-sm opacity-50 ${
							isDark ? "bg-blue-400" : "bg-orange-300"
						}`}
					/>
				)}
			</div>

			{/* Subtle pulse effect when active */}
			{!isAnimating && (
				<div
					className={`absolute inset-0 rounded-sm animate-pulse opacity-30 ${
						isDark ? "bg-blue-400" : "bg-orange-300"
					}`}
					style={{ animationDuration: "2s" }}
				/>
			)}
		</button>
	);
}

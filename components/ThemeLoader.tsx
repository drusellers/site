"use client";

import { useEffect } from "react";

export default function ThemeLoader() {
	useEffect(() => {
		// Ensure theme-loaded class is added after mount
		document.documentElement.classList.add("theme-loaded");
	}, []);

	return null;
}

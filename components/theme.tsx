"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	systemTheme: ResolvedTheme;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
	if (
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	) {
		return "dark";
	}

	return "light";
}

function applyTheme(theme: Theme, systemTheme: ResolvedTheme) {
	if (typeof document === "undefined") return;

	const resolvedTheme = theme === "system" ? systemTheme : theme;
	const method = resolvedTheme === "dark" ? "add" : "remove";
	document.documentElement.classList[method]("dark");
	document.body?.classList[method]("dark");
	document.documentElement.classList.add("theme-loaded");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>("system");
	const [systemTheme, setSystemTheme] = useState<ResolvedTheme>("light");

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme") as Theme | null;
		const initialTheme = storedTheme ?? "system";
		const initialSystemTheme = getSystemTheme();

		setThemeState(initialTheme);
		setSystemTheme(initialSystemTheme);
		applyTheme(initialTheme, initialSystemTheme);

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const onSystemThemeChange = () => {
			const nextSystemTheme = getSystemTheme();
			setSystemTheme(nextSystemTheme);
			applyTheme(
				(localStorage.getItem("theme") as Theme | null) ?? "system",
				nextSystemTheme,
			);
		};
		const onStorage = (event: StorageEvent) => {
			if (event.key !== "theme") return;
			const nextTheme = (event.newValue as Theme | null) ?? "system";
			setThemeState(nextTheme);
			applyTheme(nextTheme, getSystemTheme());
		};

		mediaQuery.addEventListener("change", onSystemThemeChange);
		window.addEventListener("storage", onStorage);

		return () => {
			mediaQuery.removeEventListener("change", onSystemThemeChange);
			window.removeEventListener("storage", onStorage);
		};
	}, []);

	const setTheme = useCallback(
		(nextTheme: Theme) => {
			localStorage.setItem("theme", nextTheme);
			setThemeState(nextTheme);
			applyTheme(nextTheme, systemTheme);
		},
		[systemTheme],
	);

	const value = useMemo(
		() => ({ theme, setTheme, systemTheme }),
		[theme, setTheme, systemTheme],
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export function useTheme() {
	const value = useContext(ThemeContext);
	if (value === undefined) {
		throw new Error("useTheme must be used within ThemeProvider");
	}

	return value;
}

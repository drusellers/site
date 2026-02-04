import type { Appearance } from "@/lib/cms.appearances";
import { BASE_URL } from "@/lib/consts";

export function classNames(...classes: Array<string | undefined | null>) {
	return classes.filter(Boolean).join(" ");
}

export function yearsOfExperience(): number {
	const now = new Date();
	const start = new Date("1997-08-01");
	return now.getFullYear() - start.getFullYear();
}

export function resolveUrl(path: string): string {
	return `${BASE_URL}${path}`;
}

export function groupBy<T>(items: T[], key: keyof T): Record<string, T[]> {
	return items.reduce(
		(result: Record<string, T[]>, item) => {
			const k = String(item[key]);
			if (!result[k]) {
				result[k] = [];
			}
			result[k].push(item);
			return result;
		},
		{} as Record<string, T[]>,
	);
}

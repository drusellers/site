export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export function yearsOfExperience(): number {
	const now = new Date();
	const start = new Date("1997-08-01");
	return now.getFullYear() - start.getFullYear();
}

const contentFiles = import.meta.glob<string>("../content/**/*", {
	eager: true,
	import: "default",
	query: "?raw",
});

const contentPathPrefix = "../content/";

export type VideoProps = {
	youtube?: string;
	loom?: string;
};

export type FileName = {
	path: string;
	slug: string;
};

export function getFiles(dir: string): FileName[] {
	const directoryPrefix = `${contentPathPrefix}${dir}/`;

	return Object.keys(contentFiles)
		.filter((file) => {
			if (!file.startsWith(directoryPrefix)) return false;
			return !file.slice(directoryPrefix.length).startsWith("_");
		})
		.sort()
		.map((file) => {
			const relativePath = file.slice(contentPathPrefix.length);
			const name = file.slice(directoryPrefix.length);
			return {
				slug: name.replace(/\.md$/, ""),
				path: relativePath,
			};
		});
}

export function getFile(file: string): string {
	const content = contentFiles[`${contentPathPrefix}${file}`];

	if (content === undefined) {
		throw new Error(`Content file not found: ${file}`);
	}

	return content;
}

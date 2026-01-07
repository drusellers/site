import fs from "fs";
import path from "path";

const contentDirectory = path.join(process.cwd(), "content");

export type VideoProps = {
	youtube?: string;
	loom?: string;
};

export type FileName = {
	path: string;
	slug: string;
};

export function getFiles(dir: string): FileName[] {
	const fileNames = fs.readdirSync(path.join(contentDirectory, dir));
	return fileNames
		.filter((n) => !n.startsWith("_"))
		.map((n) => ({ slug: n.replace(/\.md$/, ""), path: path.join(dir, n) }));
}

export function getFile(file: string): string {
	const fullPath = path.join(contentDirectory, file);
	return fs.readFileSync(fullPath, "utf8");
}

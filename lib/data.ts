import fs from "fs";
import path from "path";
import YAML from "yaml";

const dataDirectory = path.join(process.cwd(), "content");

export function getAllegoryData() {
	const fullPath = path.join(dataDirectory, "allegory.yml");
	const fileContents = fs.readFileSync(fullPath, "utf8");
	const data = YAML.parse(fileContents);

	return data;
}

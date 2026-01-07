import YAML from "yaml";
import { getFile } from "@/lib/cms";

export function getAllegoryData() {
	const fileContents = getFile("allegory.yml");
	const data = YAML.parse(fileContents);

	return data;
}

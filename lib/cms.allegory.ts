import YAML from "yaml";
import { getFile } from "@/lib/cms";

export type AllegoryData = {
	prose: {
		character: string;
		content: string;
		characterNote?: string;
	}[];
};

export function getAllegoryData(): AllegoryData {
	const fileContents = getFile("allegory.yml");
	const data = YAML.parse(fileContents);

	return data;
}

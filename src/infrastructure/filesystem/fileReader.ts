import fs from "fs";
import path from "path";

export const readDirectory = (): string[] => {
	const directoryPath: string = path.join(process.cwd(), "src/data/blog");
	return fs.readdirSync(directoryPath);
};

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PORT: number = 4000;
export const DATA_DIR: string = path.resolve(__dirname, "./data");

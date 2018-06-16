import {Config} from "./env";
import * as path from "path";

export namespace Utils {
	export const getUploadPath = (...dirs: string[]) => {
		return path.join(path.resolve(Config.uploadFolder()) , ...dirs);
	}
}

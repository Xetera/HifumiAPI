import * as path from "path";

export enum Environments {
	Development, Production
}

export namespace Config {
	export const env = (): Environments => {
		return process.env['ENV'] === 'PRODUCTION' ? Environments.Production : Environments.Development;
	};

	export const uploadFolder = (): string => {

		return process.env['UPLOAD_FOLDER'] || path.resolve('./uploads')
	};

	export const uploadKey = (): string | undefined => {
		return process.env['UPLOAD_KEY'];
	}
}


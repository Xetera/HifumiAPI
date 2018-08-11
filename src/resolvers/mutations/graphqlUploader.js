import { fetchImageMetadata } from '../../utils';

export const uploader = {
	uploadFile: async (_, { file }, ctx, info) => {
		console.log(file);
		const metadata = await fetchImageMetadata(file);
		console.log(metadata);
	},

};

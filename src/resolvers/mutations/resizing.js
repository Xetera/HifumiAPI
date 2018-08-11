// @flow
import { resize } from '../../modules/image';
import { fetchImageMetadata, fetchUrlBuffer } from '../../utils';


export const resizing = {
	resize: async (_, { link, buffer, size }, ctx, info) => {
		let bufferTarget: Buffer;
		if (link) {
			try {
				bufferTarget = await fetchUrlBuffer(link);
			} catch (err) {
				throw new Error('Error fetching image from link');
			}
		} else if (buffer) {
			bufferTarget = buffer;
		} else {
			throw new Error('Either an image link or a file is required for resizing');
		}

		const metadata = await fetchImageMetadata(bufferTarget);
		console.log(metadata);
		const image = await resize(bufferTarget, size || 'SMALL');
		// uploadFile(image);
	},
};

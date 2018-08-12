// @flow
import { fetchImageMetadata, resize } from '../../modules/image';
import { fetchUrlBuffer } from '../../utils';
import { uploadFile } from '../../modules/uploader';


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

		const [metadata, image] = await Promise.all([
			fetchImageMetadata(bufferTarget),
			resize(bufferTarget, size || 'SMALL'),
		]);
		console.log(metadata, image)
		const upload =  await uploadFile(image, metadata.format);
		return {
			link: `http://cdn.hifumi.io/${upload}`,
			...metadata
		}
		// uploadFile(image);
	},
};

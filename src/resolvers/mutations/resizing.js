// @flow
import {fetchImageMetadata, resize, sizing} from '../../modules/image';
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

		const metadata = await fetchImageMetadata(bufferTarget);
		const client = await ctx.db.query.client({
			where: { id: ctx.jwt.userId }
		})

		console.log(sizing[size])
		if (metadata.height < (sizing[size] || 150)) {
			throw new Error("This image is already smaller than the target height")
		}
		const image = await resize(bufferTarget, size || 'SMALL');
		const newMetadata = await fetchImageMetadata(image);
		const upload =  await uploadFile(image, metadata.format);
		const newLink =`http://cdn.hifumi.io/${upload}`;
		console.log(client)
		const newMedia = await ctx.db.mutation.createMedia({
			data: {
				width: newMetadata.width,
				height: newMetadata.height,
				format: newMetadata.format,
				link: newLink
			}
		});

		return {
			before: {
				link,
				width:  metadata.width,
				height: metadata.height,
				format: metadata.format,
			},
			after: newMedia,
		}
		// uploadFile(image);
	},
};

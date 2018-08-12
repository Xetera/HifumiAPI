// @flow
import sharp from 'sharp';

const sizing = {
	Medium: 250,
	Small: 200,
	Smallest: 150,
};

interface MediaMetadata {
	width: number;
	height: number;
	format: string;
	space: string;
	channels: number;
	depth: string;
	density: number;
	hasProfile: boolean;
	hasAlpha: boolean;
}

export const resize = (image: Buffer, size: string): Promise<Buffer> => sharp(image)
	.resize(null, sizing[size])
	.toBuffer();

export const fetchImageMetadata = async (buffer: Buffer): Promise<MediaMetadata> => sharp(buffer).metadata();

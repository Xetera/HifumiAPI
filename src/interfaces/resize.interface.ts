export type IResizeEndpointBody =  IResizableMedia | IResizableMediaArray;

export interface IResizableMediaArray {
	images: IResizableMedia[] | string[];
}

export const isResizableMediaArray = (obj: any): obj is IResizableMediaArray => {
	return 'images' in obj;
};

export interface IResizableMedia {
	url: string;
	height?: number;
	width?: number;
}

export const isResizableMedia = (obj: any): obj is IResizableMedia => {
	return 'url' in obj;
};

export enum EImageDimensions {
	Icon = 64,
	Small = 150,
	Medium = 300
}

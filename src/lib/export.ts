import LZString from 'lz-string';
import { error } from '$lib/logs';

export const jsonToData = <T = unknown>(json: T) => {
	try {
		const str = JSON.stringify(json);
		const data = LZString.compressToEncodedURIComponent(str);
		return data;
	} catch (err) {
		error('Error encoding json data', false, { json, err });
	}
};

export const dataToJson = async <T = unknown>(data: string): Promise<T | undefined> => {
	try {
		const json = LZString.decompressFromEncodedURIComponent(data);
		if (!json) {
			throw new Error('Unable to decompress data');
		}
		return JSON.parse(json) as T;
	} catch (err) {
		error('Error parsing blob data', false, { data, err });
	}
};

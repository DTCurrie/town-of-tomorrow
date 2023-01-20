import { error } from '@sveltejs/kit';

import { browser } from '$app/environment';

import type { Character } from '$lib/db';
import { dataToJson } from '$lib/export';
import { logError } from '$lib/logs';

import { createCharacter } from '$lib/api/characters';

import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	const data = browser && url.searchParams.get('data');
	console.log('data', { data });

	if (data) {
		try {
			const characterData = await dataToJson<Character>(data);
			console.log('characterData', { characterData });

			if (characterData) {
				delete characterData.id;
				const id =
					browser && (await createCharacter({ ...characterData, createdOn: new Date(Date.now()) }));
				const character: Character = {
					...characterData,
					id: parseInt(id.toString(), 10)
				};

				console.log('character', { character });
				return { character };
			}
		} catch (err) {
			logError('Error importing Character', false, { data, url, error: err });
			throw error(500, 'Invalid Character data');
		}
	}

	throw error(404, 'Invalid Character data');
}) satisfies PageLoad;

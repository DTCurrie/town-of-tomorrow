import { error } from '@sveltejs/kit';

import { browser } from '$app/environment';

import type { Character } from '$lib/db';
import { dataToJson } from '$lib/export';
import { logError } from '$lib/logs';

import { createCharacter } from '$lib/api/characters';

import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	const data = browser && url.searchParams.get('data');

	if (data) {
		try {
			const characterData = await dataToJson<Character>(data);
			if (characterData) {
				delete characterData.id;
				const id =
					browser && (await createCharacter({ ...characterData, createdOn: new Date(Date.now()) }));
				const character: Character = {
					...characterData,
					id: parseInt(id.toString(), 10)
				};

				return { character };
			}
		} catch (error) {
			logError('Error importing Character', false, { data, url, error });
		}
	}

	throw error(404, 'Invalid Character data');
}) satisfies PageLoad;

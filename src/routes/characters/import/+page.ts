import { error } from '@sveltejs/kit';

import { createCharacter } from '$lib/api/characters';
import type { Character } from '$lib/db';
import { dataToJson } from '$lib/export';

import type { PageLoad } from './$types';
import { browser } from '$app/environment';

export const load = (async ({ url }) => {
	const data = url.searchParams.get('data');

	if (data) {
		const characterData = await dataToJson<Character>(data);
		if (characterData) {
			delete characterData.id;
			const id = browser && (await createCharacter(characterData));
			const character: Character = {
				id: parseInt(id.toString(), 10),
				...characterData
			};

			return { character };
		}
	}

	throw error(404, 'Invalid Character data');
}) satisfies PageLoad;

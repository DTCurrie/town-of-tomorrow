import { error } from '@sveltejs/kit';

import type { PlayCard } from '$lib/db';
import { dataToJson } from '$lib/export';

import type { PageLoad } from '../../import/$types';
import { browser } from '$app/environment';
import { createPlayCard } from '$lib/api/play-cards';

export const load = (async ({ url }) => {
	const data = url.searchParams.get('data');

	if (data) {
		const playCardData = await dataToJson<PlayCard>(data);
		if (playCardData) {
			delete playCardData.id;
			const id = browser && (await createPlayCard(playCardData));
			const playCard: PlayCard = {
				id: parseInt(id.toString(), 10),
				...playCardData
			};

			return { playCard };
		}
	}

	throw error(404, 'Invalid Character data');
}) satisfies PageLoad;

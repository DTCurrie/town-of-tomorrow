import { error } from '@sveltejs/kit';

import { browser } from '$app/environment';

import type { PlayCard } from '$lib/db';
import { dataToJson } from '$lib/export';
import { logError } from '$lib/logs';
import { createPlayCard } from '$lib/api/play-cards';

import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	const data = url.searchParams.get('data');

	if (data) {
		try {
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
		} catch (error) {
			logError('Error importing Play Card', false, { data, url, error });
		}
	}

	throw error(404, 'Invalid Play Card data');
}) satisfies PageLoad;

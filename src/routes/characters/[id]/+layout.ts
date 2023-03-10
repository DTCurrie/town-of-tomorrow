import { error } from '@sveltejs/kit';
import { writable } from 'svelte/store';
import { liveQuery } from 'dexie';

import { browser } from '$app/environment';

import { db } from '$lib/db';
import type { Details } from '$lib/details';

import type { LayoutLoad } from './$types';

export const load = (async ({ params }) => {
	const id = parseInt(params.id, 10);

	if (id) {
		try {
			const details = writable<Details | undefined>();
			const character = liveQuery(async () =>
				browser ? await db.characters.get({ id }) : undefined
			);
			return { id, character, details };
		} catch (err) {
			throw error(500, `Error reading Character from DB:/n/t${err}`);
		}
	}

	throw error(404, 'Invalid Character ID');
}) satisfies LayoutLoad;

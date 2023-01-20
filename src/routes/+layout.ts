import { error } from '@sveltejs/kit';
import { liveQuery } from 'dexie';

import { browser } from '$app/environment';

import { db } from '$lib/db';

import type { LayoutLoad } from './$types';

// export const prerender = true;
export const trailingSlash = 'always';

export const load = (async () => {
	try {
		const characters = liveQuery(async () => (browser ? await db.characters.toArray() : []));
		return { characters };
	} catch (err) {
		throw error(500, `Error reading Characters from DB:/n/t${err}`);
	}
}) satisfies LayoutLoad;

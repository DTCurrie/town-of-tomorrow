import { writable } from 'svelte/store';
import { error } from '@sveltejs/kit';
import { liveQuery } from 'dexie';

import { browser } from '$app/environment';

import { db } from '$lib/db';
import type { Details } from '$lib/details';

import type { PageLoad } from './$types';

export const load = (async () => {
    try {
        const customPlayCards = liveQuery(async () => browser ? await db.customPlayCards.toArray() : []);
        const details = writable<Details | undefined>();
        return { customPlayCards, details };
    } catch (err) {
        throw error(500, `Error reading custom play cards from DB:/n/t${err}`);
    }
}) satisfies PageLoad;

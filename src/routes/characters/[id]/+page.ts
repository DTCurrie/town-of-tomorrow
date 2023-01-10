import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (({ params }) => {
	if (params.id) {
		return { id: parseInt(params.id, 10) };
	}

	throw error(404, 'Invalid Character ID');
}) satisfies PageLoad<{ id: number }>;

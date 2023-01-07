import type { PageLoad } from './$types';

export const load = (({ params }) => {
	return { id: parseInt(params.id, 10) };
}) satisfies PageLoad;

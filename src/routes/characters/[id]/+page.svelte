<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import type { PageData } from './$types';

	export let data: PageData;

	$: {
		const path = $page.url.pathname.split('/').reverse()[0];
		const hasPath =
			path === 'info' || path === 'play-cards' || path === 'gear' || path === 'rapport';
		if (!hasPath) {
			goto(`/characters/${data.id}/info/`);
		}
	}
</script>

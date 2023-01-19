<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data: PageData;

	$: {
		const path = $page.url.pathname.split('/').reverse()[0];
		const hasPath =
			path === 'info' || path === 'play-cards' || path === 'gear' || path === 'rapport';
		if (!hasPath) {
			goto(`/characters/${data.id}/info`);
		}
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	import type { PageData } from './$types';

	export let data: PageData;

	$: {
		const path = $page.url.pathname.split('/').reverse()[0];
		const hasPath =
			path === 'info' || path === 'play-cards' || path === 'gear' || path === 'rapport';
		if (!hasPath) {
			goto(`${base}/characters/${data.id}/info/`);
		}
	}
</script>

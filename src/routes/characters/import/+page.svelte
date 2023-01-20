<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	import { error } from '$lib/logs';

	import type { PageData } from './$types';

	export let data: PageData;

	$: character = data.character;

	$: {
		if (browser && character) {
			if (!character.id) {
				error('Invalid Character', false, { character });
			} else {
				goto(`/characters/${character.id}/info`);
			}
		}
	}
</script>

<div class="flex w-full h-full justify-center items-center">Importing ...</div>

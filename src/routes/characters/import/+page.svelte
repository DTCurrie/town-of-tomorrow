<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	import { logError } from '$lib/logs';
	import { errorToast } from '$lib/toast';

	import type { PageData } from './$types';

	export let data: PageData;

	$: character = data.character;

	$: {
		if (browser && character) {
			if (!character.id) {
				logError('Invalid Character', false, { character });
				errorToast('Error importing Character, please try again!');
			} else {
				goto(`${base}/characters/${character.id}/info/`);
			}
		}
	}
</script>

<div class="flex w-full h-full justify-center items-center">Importing ...</div>

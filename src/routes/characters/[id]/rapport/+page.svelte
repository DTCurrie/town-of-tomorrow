<script lang="ts">
	import { logError } from '$lib/logs';
	import { errorToast, successToast } from '$lib/toast';

	import { createRapport } from '$lib/api/characters';

	import RapportList from '$lib/components/rapport/RapportList.svelte';
	import NewRapport from '$lib/components/rapport/NewRapport.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	$: character = data.character;
	$: details = data.details;
</script>

<h2 class="text-xl mt-2">Rapport:</h2>

<div class="flex flex-col gap-2">
	<RapportList character={$character} on:select-rapport={({ detail }) => ($details = detail)} />
	<NewRapport
		on:create={async ({ detail }) => {
			try {
				await createRapport($character, detail);
				successToast(`Created ${detail.name}!`);
			} catch (error) {
				logError('Error creating Rapport', false, { detail, character });
				errorToast('Error creating Rapport, please try again!');
			}
		}}
	/>
</div>

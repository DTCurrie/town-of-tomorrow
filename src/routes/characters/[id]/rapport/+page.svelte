<script lang="ts">
	import { createRapport } from '$lib/api/characters';
	import RapportList from '$lib/components/RapportList.svelte';
	import NewRapport from '$lib/components/NewRapport.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: character = data.character;
	$: details = data.details;
</script>

<h2 class="text-xl mt-2">Rapport:</h2>

<div class="flex flex-col gap-2">
	<RapportList character={$character} on:select-rapport={({ detail }) => ($details = detail)} />
	<NewRapport on:create={({ detail }) => createRapport($character, detail)} />
</div>

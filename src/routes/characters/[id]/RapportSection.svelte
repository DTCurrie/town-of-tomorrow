<script lang="ts">
	import RapportList from '$lib/components/RapportList.svelte';
	import NewRapport from '$lib/components/NewRapport.svelte';
	import type { Character, Rapport } from '$lib/db';

	export let character: Character;

	export let setRapport: (character: Character, rapport: Rapport) => Promise<void>;

	export let removeRapport: (character: Character, index: number) => Promise<void>;

	export let createRapport: (character: Character, rapport: Rapport) => Promise<void>;
</script>

<h2 class="text-xl mt-2">Rapport:</h2>

<div class="flex flex-col gap-2">
	<RapportList
		rapport={character.rapport}
		on:set-rapport={({ detail }) => setRapport(character, detail)}
		on:set-overflow={({ detail }) => setRapport(character, detail)}
		on:remove-rapport={({ detail }) => removeRapport(character, detail)}
	/>
	<NewRapport on:create={({ detail }) => createRapport(character, detail)} />
</div>

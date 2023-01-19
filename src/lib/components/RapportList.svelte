<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Character, Rapport } from '$lib/db';
	import RapportCard from './RapportCard.svelte';

	export let character: Character | undefined;

	export let select = (data: Rapport, index: number) =>
		dispatch('select-rapport', {
			component: 'rapport-info',
			data,
			index
		});

	const dispatch = createEventDispatcher();
</script>

<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
	{#if character}
		{#each character.rapport ?? [] as person, i}
			<li>
				<RapportCard {character} rapport={person} index={i} select={() => select(person, i)} />
			</li>
		{/each}
	{/if}
</ul>

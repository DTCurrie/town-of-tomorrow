<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Armor } from '$lib/db';
	import ArmorCard from '$lib/components/armor/ArmorCard.svelte';

	export let armor: Armor[];

	export let select = (data: Armor, index: number) =>
		dispatch('select-armor', {
			component: 'armor-info',
			data,
			index
		});

	const dispatch = createEventDispatcher();
</script>

<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
	{#each armor as piece, i}
		<li class="flex flex-col bg-white items-start rounded-lg shadow-lg">
			<ArmorCard armor={piece} select={() => select(piece, i)} />
		</li>
	{/each}
</ul>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Gear } from '../db';
	import GearCard from '$lib/components/GearCard.svelte';

	export let gear: Gear[];

	export let select = (piece: Gear, index: number) =>
		dispatch('select-gear', {
			piece,
			index
		});

	const dispatch = createEventDispatcher();
</script>

<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
	{#each gear as piece, i}
		<li class="flex flex-col bg-white items-start rounded-lg shadow-lg">
			<GearCard gear={piece} select={() => select(piece, i)} />
		</li>
	{/each}
</ul>

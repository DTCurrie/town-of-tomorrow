<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Weapon } from '../db';
	import WeaponCard from '$lib/components/WeaponCard.svelte';

	export let weapons: Weapon[];

	export let select = (data: Weapon, index: number) =>
		dispatch('select-weapon', {
			component: 'weapon-info',
			data,
			index
		});

	const dispatch = createEventDispatcher();
</script>

<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
	{#each weapons as weapon, i}
		<li class="flex flex-col bg-white items-start rounded-lg shadow-lg">
			<WeaponCard {weapon} select={() => select(weapon, i)} />
		</li>
	{/each}
</ul>

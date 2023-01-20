<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { PlayCard, PlayCards } from '$lib/db';
	import { getIndex, getOthers } from '$lib/play-cards';
	import SelectedPlayCard from '$lib/components/play-cards/SelectedPlayCard.svelte';
	import Button from '$lib/elements/Button.svelte';

	export let playCards: PlayCards;

	export let select = (data: PlayCard | undefined, index: number) =>
		dispatch('select-play-card', {
			component: 'play-card-info',
			data: data as PlayCard,
			index: getIndex(index)
		});

	export let add = (index: number) =>
		dispatch('add-play-card', {
			component: 'play-card-add',
			data: { others: getOthers(playCards, index) },
			index: getIndex(index)
		});

	export let create = (index: number) =>
		dispatch('create-play-card', {
			component: 'play-card-create',
			data: undefined,
			index: getIndex(index)
		});

	const dispatch = createEventDispatcher();
</script>

<ul class="grid grid-cols-1 md:grid-cols-2 w-full gap-2">
	{#each playCards as playCard, i}
		{#if playCard}
			<li>
				<SelectedPlayCard {playCard} select={() => select(playCard, i)} />
			</li>
		{:else}
			<div class="flex flex-col w-full h-full p-2 gap-2 rounded-lg bg-white shadow">
				<Button classes="w-full h-full min-h-[3rem]" color="cyan" on:click={() => add(i)}>
					Add Play Card
				</Button>
				<Button classes="w-full h-full min-h-[3rem]" color="lime" on:click={() => create(i)}>
					Create Play Card
				</Button>
			</div>
		{/if}
	{/each}
</ul>

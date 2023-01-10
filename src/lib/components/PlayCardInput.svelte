<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { getJobColorClass, standardPlayCards } from '$lib/play-cards';
	import type { PlayCard } from '../db';
	import PlayCardInfo from './PlayCardInfo.svelte';
	import deepEqual from 'deep-equal';
	import classNames from 'classnames';
	import Select from './inputs/Select.svelte';

	export let playCard: PlayCard | null;
	export let others: [PlayCard | null, PlayCard | null, PlayCard | null];
	export let classes = '';

	export let select = (selection: PlayCard) => dispatch('select', selection);

	const dispatch = createEventDispatcher();

	let selected: PlayCard | '' = playCard ?? '';

	$: {
		if (selected && !deepEqual(playCard, selected)) {
			select(selected);
		}
	}

	function filterPlayCards(first: PlayCard | null, second: PlayCard | null) {
		return standardPlayCards.filter(({ name }) => name !== first?.name && name !== second?.name);
	}
</script>

<div class={classNames('flex flex-col w-full', classes)}>
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label
		class={classNames(
			'pb-0 rounded-lg rounded-b-none',
			selected && ['p-2', getJobColorClass('bg', selected.job)]
		)}
	>
		<Select
			bind:value={selected}
			classes={classNames(
				selected && ['font-display text-white border-none', getJobColorClass('bg', selected.job)]
			)}
			placeholder="Select a Play Card"
			options={filterPlayCards(others[0], others[1]).map((option) => [option.name, option])}
			required
		/>
	</label>
	{#if selected}
		<PlayCardInfo classes="rounded-t-none" bind:playCard={selected} />
	{/if}
</div>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import classNames from 'classnames';
	import type { PlayCard, Unlockable } from '../db';
	import Merits from './Merits.svelte';
	import Faults from './Faults.svelte';
	import { getJobColorClass } from '$lib/play-cards';
	import Button from './Button.svelte';

	export let playCard: PlayCard;

	export let classes = '';
	export let showName = false;
	export let showUnlocked = false;
	export let showMerits = false;
	export let showFaults = false;
	export let showRemove = false;

	const dispatch = createEventDispatcher();

	export let unlock = (unlockable: Unlockable) => dispatch('unlock', unlockable);
	export let setMerits = (value: 0 | 1 | 2 | 3) => dispatch('set-merits', value);
	export let setFaults = (value: 0 | 1 | 2 | 3) => dispatch('set-faults', value);
	export let removePlayCard = (name: string) => dispatch('remove-play-card', name);

	let removing = false;
</script>

<div
	class={classNames(
		'flex flex-col p-2 gap-0.5 w-full border-4 rounded-lg shadow-lg',
		getJobColorClass('border', playCard.job),
		classes
	)}
>
	{#if showName}
		<p
			class={classNames(
				'text-white p-1 font-display font-bold',
				getJobColorClass('bg', playCard.job)
			)}
		>
			{playCard.name}
		</p>
	{/if}

	<p class="text-gray-700 font-display">
		{playCard.job.name} (+{playCard.job.health} Health)
	</p>

	<div>
		<p class="font-bold">Bonuses:</p>
		<ul class="list-disc pl-8">
			{#each playCard.bonuses as bonus}
				<li class="list-item">{bonus}</li>
			{/each}
		</ul>
	</div>

	<p>
		<span class="font-bold">Pitfall:</span>
		{playCard.pitfall}
	</p>

	<div>
		<p class="font-bold">Unlockables:</p>
		<ul class={classNames({ 'list-disc pl-8': !showUnlocked })}>
			{#each playCard.unlockables as unlockable}
				<li>
					{#if showUnlocked}
						<label>
							<input
								type="checkbox"
								checked={unlockable.unlocked}
								on:change|preventDefault={() => unlock(unlockable)}
								on:click|preventDefault={() => unlock(unlockable)}
								on:input|preventDefault={() => unlock(unlockable)}
							/>
							<span class="font-bold">{unlockable.name}</span>
						</label>
						<p>{unlockable.description}</p>
					{:else}
						<span class="font-bold">{unlockable.name}:</span>
						{unlockable.description}
					{/if}
				</li>
			{/each}
		</ul>
	</div>

	<div
		class={classNames(
			'mt-auto w-full',
			(showMerits || showFaults || showRemove) &&
				playCard && ['border-t-4', getJobColorClass('border', playCard.job)]
		)}
	>
		<div class="flex flex-row justify-evenly p-1 pt-0">
			{#if showMerits}
				<Merits merits={playCard.merits ?? 0} on:set-merits={({ detail }) => setMerits(detail)} />
			{/if}
			{#if showFaults}
				<Faults faults={playCard.faults ?? 0} on:set-faults={({ detail }) => setFaults(detail)} />
			{/if}
		</div>

		{#if showRemove}
			<div class="flex flex-row w-full p-2">
				{#if removing}
					<Button color="cyan" classes="w-20 ml-auto" on:click={() => (removing = false)}>
						Cancel
					</Button>
					<Button color="rose" classes="w-20 ml-2" on:click={() => removePlayCard(playCard.name)}>
						Confirm
					</Button>
				{:else}
					<Button color="rose" classes="w-20 ml-auto" on:click={() => (removing = true)}
						>Remove</Button
					>
				{/if}
			</div>
		{/if}
	</div>
</div>

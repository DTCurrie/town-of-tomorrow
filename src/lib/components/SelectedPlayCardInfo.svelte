<script lang="ts">
	import classNames from 'classnames';
	import type { Character, PlayCard, PlayCardIndex } from '../db';
	import Merits from './Merits.svelte';
	import Faults from './Faults.svelte';
	import { getJobColorClass } from '$lib/play-cards';
	import Button from './Button.svelte';
	import { removePlayCard, updateFaults, updateMerits, updateUnlocked } from '$lib/api/characters';

	export let character: Character | undefined;
	export let playCard: PlayCard | null;
	export let index: PlayCardIndex;

	export let classes = '';
	export let showName = false;
	export let showUnlocked = false;
	export let showMerits = false;
	export let showFaults = false;
	export let showRemove = false;

	let removing = false;
</script>

<div class={classNames('flex flex-col w-full h-full rounded-lg shadow-lg', classes)}>
	{#if playCard}
		{#if showName}
			<p
				class={classNames(
					'text-white px-2 pt-2.5 pb-0.5 font-display font-bold rounded-t-lg',
					getJobColorClass('bg', playCard.job)
				)}
			>
				{playCard.name}
			</p>
		{/if}

		<div
			class={classNames(
				'flex flex-col h-full border-4 rounded-b-lg',
				getJobColorClass('border', playCard.job)
			)}
		>
			<div>
				<p class="font-bold italic px-2 pt-2">
					{playCard.job.name} (+{playCard.job.health} Health)
				</p>

				<div class="px-2">
					<p class="font-bold">Bonuses:</p>
					<ul class="list-disc pl-8">
						{#each playCard.bonuses as bonus}
							<li class="list-item">{bonus}</li>
						{/each}
					</ul>
				</div>

				<div class="px-2 pb-2">
					<p class="font-bold">Unlockables:</p>
					<ul class={classNames({ 'list-disc pl-8': !showUnlocked, 'pl-3': showUnlocked })}>
						{#each playCard.unlockables as unlockable, i}
							<li>
								{#if showUnlocked}
									<label>
										<input
											type="checkbox"
											bind:checked={unlockable.unlocked}
											on:input|preventDefault={() =>
												updateUnlocked(character, index, unlockable, i)}
										/>
										<span class="font-bold">{unlockable.name}</span>
									</label>
									<p class="pl-4">{unlockable.description}</p>
								{:else}
									<span class="font-bold">{unlockable.name}:</span>
									{unlockable.description}
								{/if}
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<div
				class={classNames(
					'mt-auto rounded-b-lg border-t-4',
					getJobColorClass('border', playCard.job)
				)}
			>
				{#if showMerits || showFaults}
					<div class="flex flex-row flex-wrap w-full justify-evenly px-2 pt-0">
						{#if showMerits}
							<Merits
								merits={playCard.merits ?? 0}
								on:set-merits={({ detail }) => updateMerits(character, index, detail)}
							/>
						{/if}
						{#if showFaults}
							<Faults
								faults={playCard.faults ?? 0}
								on:set-faults={({ detail }) => updateFaults(character, index, detail)}
							/>
						{/if}
					</div>
				{/if}

				{#if showRemove}
					<div class="flex flex-row w-full px-2 pb-2 mt-2">
						{#if removing}
							<Button color="cyan" classes="w-20 ml-auto" on:click={() => (removing = false)}>
								Cancel
							</Button>
							<Button
								color="rose"
								classes="w-20 ml-2"
								on:click={() => removePlayCard(character, index)}
							>
								Confirm
							</Button>
						{:else}
							<Button color="rose" classes="w-20 ml-auto" on:click={() => (removing = true)}
								>Remove</Button
							>
						{/if}
					</div>
				{/if}

				<slot />
			</div>
		</div>
	{/if}
</div>

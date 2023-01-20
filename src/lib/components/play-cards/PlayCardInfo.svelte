<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import classNames from 'classnames';

	import type { PlayCard } from '$lib/db';
	import { getJobColorClass } from '$lib/play-cards';

	import { deletePlayCard } from '$lib/api/play-cards';

	import Button from '$lib/elements/Button.svelte';
	import { error } from '$lib/logs';

	export let playCard: PlayCard | undefined;

	export let classes = '';
	export let showRemove = false;

	export let removed = () => dispatch('removed');

	const dispatch = createEventDispatcher();

	let removing = false;

	const confirmDelete = async () => {
		if (playCard && playCard.id !== undefined) {
			try {
			} catch (err) {
				error('Error deleting Play Card', false, { playCard, err });
			}
			await deletePlayCard(playCard.id);
			removed();
		}
	};
</script>

<div class={classNames('flex flex-col w-full h-full rounded-lg shadow-lg', classes)}>
	{#if playCard}
		<p
			class={classNames(
				'text-white px-2 pt-2.5 pb-0.5 font-display font-bold rounded-t-lg',
				getJobColorClass('bg', playCard.job)
			)}
		>
			{playCard.name}
		</p>

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
						{#each playCard.bonusQuestions as bonus, i}
							<li class="list-item">
								<p class="font-bold">{bonus}</p>
								<p class="italic text-sm">
									examples:
									{#each playCard.bonusExamples[i].split(',') as example, i}
										<span class="bg-gray-300">{example}</span>{#if i < 2}<span>, </span>{/if}
									{/each}
								</p>
							</li>
						{/each}
					</ul>
				</div>

				<div class="px-2 pb-2">
					<p class="font-bold">Unlockables:</p>
					<ul class="list-disc pl-4">
						{#each playCard.unlockables as unlockable}
							<li>
								<span class="font-bold">{unlockable.name}:</span>
								{unlockable.description}
							</li>
						{/each}
					</ul>
				</div>
			</div>

			{#if showRemove}
				<div
					class={classNames(
						'mt-auto rounded-b-lg border-t-4',
						getJobColorClass('border', playCard.job)
					)}
				>
					<div class="flex flex-row w-full px-2 pb-2 mt-2">
						{#if removing}
							<Button color="cyan" classes="w-20 ml-auto" on:click={() => (removing = false)}>
								Cancel
							</Button>
							<Button color="rose" classes="w-20 ml-2" on:click={() => confirmDelete()}>
								Confirm
							</Button>
						{:else}
							<Button color="rose" classes="w-20 ml-auto" on:click={() => (removing = true)}
								>Remove</Button
							>
						{/if}
					</div>

					<slot />
				</div>
			{/if}
		</div>
	{/if}
</div>

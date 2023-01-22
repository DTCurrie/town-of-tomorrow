<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { liveQuery } from 'dexie';
	import classNames from 'classnames';

	import { browser } from '$app/environment';

	import { db, type PlayCard } from '$lib/db';
	import { log } from '$lib/logs';
	import { getJobColorClass, standardPlayCards, type OtherPlayCards } from '$lib/play-cards';
	import { errorToast } from '$lib/toast';

	import Select from '$lib/elements/inputs/Select.svelte';
	import TextInput from '$lib/elements/inputs/TextInput.svelte';

	export let others: OtherPlayCards;
	export let classes = '';
	export let playCard: PlayCard | undefined;

	const dispatch = createEventDispatcher();
	const customPlayCards = liveQuery(async () =>
		browser ? await db.customPlayCards.toArray() : []
	);

	let status = '';

	const validate = (): string => {
		log('PlayCardInput validate', false, { newPlayCard });

		if (!newPlayCard) {
			return (status = 'Select a Play Card!');
		}

		if (!newPlayCard.bonuses[0]) {
			return (status = 'Answer your first Bonus question!');
		}

		if (!newPlayCard.bonuses[1]) {
			return (status = 'Answer your second Bonus question!');
		}

		if (!newPlayCard.bonuses[2]) {
			return (status = 'Answer your third Bonus question!');
		}

		return (status = '');
	};

	const save = () => {
		status = validate();

		if (!status) {
			dispatch('saved', newPlayCard);
			return;
		}

		errorToast(status);
	};

	$: newPlayCard = {
		...playCard,
		bonuses: playCard?.bonuses.map((b) => b.trim())
	} as PlayCard;

	$: options = [...standardPlayCards.map((card) => card()), ...($customPlayCards ?? [])].filter(
		({ id, name }) => !(id === playCard?.id && name === playCard?.name)
	);

	$: options.unshift(...(playCard ? [playCard] : []));
</script>

<form
	class={classNames('flex flex-col w-full h-full grow', classes)}
	on:submit|preventDefault={save}
>
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label
		class={classNames(
			'rounded-lg rounded-b-none',
			playCard && ['pt-3 pb-0.5 pl-0.5 pr-2', getJobColorClass('bg', playCard.job)]
		)}
	>
		<Select
			bind:value={playCard}
			classes={classNames(
				!playCard && 'pb-0 pt-0.5',
				playCard && [
					'font-display font-bold text-white border-none rounded-lg rounded-b-none',
					getJobColorClass('bg', playCard.job)
				]
			)}
			options={options
				.filter(
					({ name }) =>
						name !== others[0]?.name && name !== others[1]?.name && name !== others[2]?.name
				)
				.map((option) => [option.name, option])}
			placeholder="Select a Play Card"
			required
		/>
	</label>
	{#if playCard}
		<div class={classNames('flex flex-col w-full h-full rounded-lg shadow-lg', classes)}>
			<div
				class={classNames(
					'flex flex-col h-full border-4 rounded-b-lg bg-white',
					getJobColorClass('border', playCard.job)
				)}
			>
				<div class="flex flex-col gap-2">
					<p class="italic px-2">
						{playCard.job.name} (+{playCard.job.health} Health)
					</p>

					<div class="px-2">
						<p class="font-bold">Bonuses:</p>
						<ul class="flex flex-col list-disc pl-4 gap-2">
							{#each playCard.bonuses as _, i}
								<li class="list-item">
									<!-- svelte-ignore a11y-label-has-associated-control -->
									<label class="w-full ">
										<p class="font-bold">{playCard.bonusQuestions[i]}</p>
										<p class="italic text-sm">
											examples:
											{#each playCard.bonusExamples[i].split(',') as example, i}
												<span class="bg-gray-300">{example}</span>{#if i < 2}<span>, </span>{/if}
											{/each}
										</p>
										<TextInput
											bind:value={playCard.bonuses[i]}
											placeholder="Enter your answer"
											maxlength="240"
											required
										/>
									</label>
								</li>
							{/each}
						</ul>
					</div>

					<div class="px-2 pb-2">
						<p class="font-bold">Unlockables:</p>
						<ul class={classNames('list-disc pl-4')}>
							{#each playCard.unlockables as unlockable, i}
								<li>
									<span class="font-bold">{unlockable.name}:</span>
									{unlockable.description}
								</li>
							{/each}
						</ul>
					</div>
				</div>

				<div
					class={classNames(
						'flex flex-col mt-auto rounded-b-lg border-t-4 p-2 gap-2',
						getJobColorClass('border', playCard.job)
					)}
				>
					{#if status}
						<p class="bg-red-700 text-white p-2">{status}</p>
					{/if}

					<div class="flex flex-row w-full gap-2 ml-auto mt-auto">
						<slot />
					</div>
				</div>
			</div>
		</div>
	{/if}
</form>

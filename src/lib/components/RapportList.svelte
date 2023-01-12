<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import classNames from 'classnames';
	import type { Rapport, RapportValue } from '$lib/db';
	import Button from './Button.svelte';
	import Chevron from './icons/Chevron.svelte';

	export let rapport: Rapport[];

	export let remove = (index: number) => dispatch('remove-rapport', index);

	const dispatch = createEventDispatcher();
	const values: RapportValue[] = [-3, -2, -1, 0, 1, 2, 3];

	let removingIndex = -1;
	let expandedIndex = -1;

	const setRapport = (person: Rapport, value: RapportValue) =>
		dispatch('set-rapport', { ...person, value });

	const setOverflow = (person: Rapport, overflow: boolean) =>
		dispatch('set-rapport', { ...person, overflow });

	const removeRapport = (index: number) => {
		remove(index);
		removingIndex = -1;
	};

	$: removing = removingIndex >= 0;
</script>

<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
	{#each rapport ?? [] as person, i}
		<li class="flex flex-col p-2 bg-white items-start rounded-lg shadow-lg">
			<button
				class="flex w-full text-left"
				on:click|preventDefault={() =>
					expandedIndex === i ? (expandedIndex = -1) : (expandedIndex = i)}
			>
				<div class="flex flex-col w-full">
					<p class="font-display font-bold w-40 overflow-hidden truncate">
						{person.name}
					</p>

					<ul class="flex flex-row gap-1 list-none w-full">
						{#each values as value}
							<li class="flex w-4 lg:w-6">
								<label class="flex flex-col justify-center items-center">
									<input
										type="radio"
										name={`${person.name}|${i}`}
										{value}
										checked={person.value === value}
										class={classNames(
											`appearance-none flex-shrink-0 border-2 border-gray-500 w-4 lg:w-6 h-4 lg:h-6`,
											person.value !== value ? 'bg-white' : 'bg-gray-500'
										)}
										on:click={() => setRapport(person, value)}
									/>
									<p class="font-bold text-sm text-center">{value}</p>
								</label>
							</li>
						{/each}
					</ul>
				</div>
				<span
					class={classNames('w-6 h-6 ml-auto transition-all duration-[250ms] ease-out', {
						'rotate-180': expandedIndex !== i
					})}
				>
					<Chevron />
				</span>
			</button>

			<div
				class={classNames(
					'flex flex-col w-full transition-all duration-[250ms] ease-out overflow-hidden',
					{
						'h-16': expandedIndex === i,
						'h-0': expandedIndex !== i
					}
				)}
			>
				<label class="flex flex-row gap-2 items-center">
					<input
						type="checkbox"
						checked={person.overflow}
						class={classNames(
							`appearance-none flex-shrink-0 border-2 border-gray-500 w-4 lg:w-6 h-4 lg:h-6`,
							!person.overflow ? 'bg-white' : 'bg-gray-500'
						)}
						on:click={() => setOverflow(person, !person.overflow)}
					/>
					<span class="font-bold text-sm">Overflow?</span>
				</label>

				<div class={classNames('grid gap-0.5 ml-auto mt-auto', removing && 'grid-cols-2')}>
					<Button
						classes="w-20 ml-auto"
						color="rose"
						on:click={() => (removingIndex === i ? removeRapport(i) : (removingIndex = i))}
					>
						{#if removing}
							Confirm
						{:else}
							Remove
						{/if}
					</Button>
					{#if removing}
						<Button classes="w-20 ml-auto" color="cyan" on:click={() => (removingIndex = -1)}
							>Cancel</Button
						>
					{/if}
				</div>
			</div>
		</li>
	{/each}
</ul>

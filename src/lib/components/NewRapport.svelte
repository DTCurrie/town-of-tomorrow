<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Rapport } from '$lib/db';
	import Button from './Button.svelte';
	import Chevron from './icons/Chevron.svelte';
	import classNames from 'classnames';
	import TextInput from './inputs/TextInput.svelte';
	import NumberInput from './inputs/NumberInput.svelte';

	const dispatch = createEventDispatcher();

	export let create = () => dispatch('create', newRapport);

	let newRapportName = '';
	let newRapportValue = 0;

	let expanded = false;

	const resetNewRapport = () => {
		newRapportName = '';
		newRapportValue = 0;
	};

	const addRapport = () => {
		create();
		resetNewRapport();
	};

	$: newRapport = {
		name: newRapportName,
		value: newRapportValue,
		overflow: false
	} as Rapport;
</script>

<div class="flex flex-col">
	<button
		class="flex w-full justify-between underline cursor-pointer"
		on:click|preventDefault={() => (expanded = !expanded)}
	>
		New Rapport: <span
			class={classNames('w-6 h-6 ml-auto p-1 transition-all duration-[250ms] ease-out', {
				'rotate-180': !expanded
			})}
		>
			<Chevron />
		</span>
	</button>

	<div
		class={classNames(
			'flex flex-col w-full p-1 transition-all duration-[250ms] ease-out overflow-hidden',
			{
				'h-[344px] lg:h-36': expanded,
				'h-0': !expanded
			}
		)}
	>
		<div class="flex flex-col lg:flex-row gap-2 items-center">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-col lg:flex-row p-2 w-full lg:items-center lg:w-1/3">
				Name:
				<TextInput bind:value={newRapportName} maxlength="25" />
			</label>

			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-col lg:flex-row p-2 w-full lg:items-center lg:w-1/3">
				Value:
				<NumberInput bind:value={newRapportValue} min="-3" max="3" />
			</label>
		</div>
		<Button classes="w-32 ml-auto" color="lime" on:click={addRapport}>Add Rapport</Button>
	</div>
</div>

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

<form class="flex flex-col" on:submit|preventDefault={addRapport}>
	<button
		class="flex w-full justify-between underline border border-black p-2"
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
			'flex flex-col gap-1 lg:gap-2 px-2 w-full transition-all duration-[250ms] ease-out overflow-hidden border border-black border-t-0',
			{
				'h-[176px] lg:h-24 pt-2': expanded,
				'h-0 p-0 border-b-0': !expanded
			}
		)}
	>
		<div class="flex flex-col lg:flex-row gap-2 items-center">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-col lg:flex-row w-full lg:items-center lg:w-1/2">
				Name:
				<TextInput bind:value={newRapportName} classes="lg:ml-2" maxlength="25" required />
			</label>

			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-col lg:flex-row w-full lg:items-center lg:w-32">
				Value:
				<NumberInput bind:value={newRapportValue} classes="lg:ml-2" min="-3" max="3" />
			</label>
		</div>
		<Button type="submit" classes="w-32 ml-auto mt-1" color="lime">Add Rapport</Button>
	</div>
</form>

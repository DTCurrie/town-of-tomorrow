<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import classNames from 'classnames';

	import type { Rapport } from '$lib/db';
	import { log } from '$lib/logs';
	import { errorToast } from '$lib/toast';

	import Chevron from '$lib/elements/icons/Chevron.svelte';
	import TextInput from '$lib/elements/inputs/TextInput.svelte';
	import NumberInput from '$lib/elements/inputs/NumberInput.svelte';
	import Textarea from '$lib/elements/inputs/Textarea.svelte';
	import Button from '$lib/elements/Button.svelte';

	const dispatch = createEventDispatcher();

	export let create = () => dispatch('create', newRapport);

	let newRapportName = '';
	let newRapportValue = 0;
	let newRapportDescription = '';

	let expanded = false;
	let status = '';

	const resetNewRapport = () => {
		newRapportName = '';
		newRapportDescription = '';
		newRapportValue = 0;
	};

	const validate = (): string => {
		log('NewRapport validate', false, { newRapport });

		if (!newRapport.name) {
			return (status = 'Enter a name for your Gear!');
		}

		if (!newRapport.description) {
			return (status = 'Enter a description for your Gear!');
		}

		if (newRapport.value === undefined || newRapport.value < 0) {
			return (status = 'Enter a rating for your Gear!');
		}

		return (status = '');
	};

	const addRapport = () => {
		status = validate();

		if (!status) {
			create();
			resetNewRapport();
			return;
		}

		errorToast(status);
	};

	$: newRapport = {
		name: newRapportName.trim(),
		value: newRapportValue,
		description: newRapportDescription.trim(),
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
				'h-auto pt-2': expanded,
				'h-0 p-0 border-b-0': !expanded
			}
		)}
	>
		<div class="flex flex-col lg:flex-row gap-1 lg:gap-2 items-center">
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

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="flex flex-col w-full">
			Description:
			<Textarea bind:value={newRapportDescription} maxlength="240" />
		</label>

		<div class="flex flex-col p-2 gap-2">
			{#if status}
				<p class="bg-red-700 text-white p-2">{status}</p>
			{/if}

			<Button type="submit" classes="w-32 ml-auto" color="lime">Add Rapport</Button>
		</div>
	</div>
</form>

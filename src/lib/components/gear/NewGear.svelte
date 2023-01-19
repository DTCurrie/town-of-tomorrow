<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import classNames from 'classnames';
	import type { Gear } from '$lib/db';
	import Chevron from '$lib/elements/icons/Chevron.svelte';
	import TextInput from '$lib/elements/inputs/TextInput.svelte';
	import NumberInput from '$lib/elements/inputs/NumberInput.svelte';
	import Textarea from '$lib/elements/inputs/Textarea.svelte';
	import Button from '$lib/elements/Button.svelte';
	import { log } from '$lib/logs';

	const dispatch = createEventDispatcher();

	export let create = () => dispatch('create', newGear);

	let newGearName = '';
	let newGearRating = 0;
	let newGearDescription = '';

	let expanded = false;
	let status = '';

	const resetNewGear = () => {
		newGearName = '';
		newGearRating = 0;
		newGearDescription = '';
	};

	const validate = (): string => {
		log('NewGear validate', false, { newGear });

		if (!newGear.name) {
			return (status = 'Enter a name for your Gear!');
		}

		if (!newGear.description) {
			return (status = 'Enter a description for your Gear!');
		}

		if (newGear.rating === undefined || newGear.rating < 0) {
			return (status = 'Enter a rating for your Gear!');
		}

		return (status = '');
	};

	const addGear = () => {
		status = validate();

		if (!status) {
			create();
			resetNewGear();
		}
	};

	$: newGear = {
		name: newGearName.trim(),
		rating: newGearRating,
		description: newGearDescription.trim()
	} as Gear;
</script>

<form class="flex flex-col" on:submit|preventDefault={addGear}>
	<button
		class="flex w-full justify-between underline border border-black p-2"
		on:click|preventDefault={() => (expanded = !expanded)}
	>
		New Gear:
		<span
			class={classNames('w-6 h-6 ml-auto transition-all duration-[250ms] ease-out', {
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
				<TextInput bind:value={newGearName} classes="lg:ml-2" maxlength="25" required />
			</label>

			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-col lg:flex-row w-full lg:items-center lg:w-24">
				Rating:
				<NumberInput bind:value={newGearRating} classes="lg:ml-2" min="0" max="6" required />
			</label>
		</div>

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="flex flex-col w-full">
			Description:
			<Textarea bind:value={newGearDescription} maxlength="240" />
		</label>

		<div class="flex flex-col p-2 gap-2">
			{#if status}
				<p class="bg-red-700 text-white p-2">{status}</p>
			{/if}

			<Button type="submit" classes="w-32 ml-auto" color="lime">Add Gear</Button>
		</div>
	</div>
</form>

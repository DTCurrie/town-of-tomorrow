<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { armorTypes, type Armor } from '$lib/db';
	import Button from './Button.svelte';
	import classNames from 'classnames';
	import Chevron from './icons/Chevron.svelte';
	import TextInput from './inputs/TextInput.svelte';
	import NumberInput from './inputs/NumberInput.svelte';
	import Select from './inputs/Select.svelte';
	import Textarea from './inputs/Textarea.svelte';

	const dispatch = createEventDispatcher();

	export let create = () => dispatch('create', newArmor);

	let newArmorName = '';
	let newArmorRating = 0;
	let newArmorType = 'Clothing';
	let newArmorDescription = '';

	let expanded = false;

	const resetNewArmor = () => {
		newArmorName = '';
		newArmorRating = 0;
		newArmorType = 'Clothing';
		newArmorDescription = '';
	};

	const addArmor = () => {
		create();
		resetNewArmor();
	};

	$: newArmor = {
		name: newArmorName,
		rating: newArmorRating,
		type: newArmorType,
		description: newArmorDescription
	} as Armor;
</script>

<form class="flex flex-col" on:submit={addArmor}>
	<button
		class="flex w-full justify-between underline border border-black p-2"
		on:click|preventDefault={() => (expanded = !expanded)}
	>
		New Armor:
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
				'h-[344px] lg:h-40 pt-2': expanded,
				'h-0 p-0 border-b-0': !expanded
			}
		)}
	>
		<div class="flex flex-col lg:flex-row gap-1 lg:gap-2 items-center">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-col lg:flex-row w-full lg:items-center lg:w-1/2">
				Name:
				<TextInput bind:value={newArmorName} maxlength="25" required />
			</label>

			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-col lg:flex-row w-full lg:items-center lg:w-24">
				Rating:
				<NumberInput bind:value={newArmorRating} min="0" max="6" required />
			</label>

			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-col lg:flex-row w-full lg:items-center lg:w-72">
				Type:
				<Select bind:value={newArmorType} options={armorTypes.map((key) => [key, key])} required />
			</label>
		</div>

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="flex flex-col lg:flex-row w-full lg:items-center ">
			Description:
			<Textarea bind:value={newArmorDescription} maxlength="240" />
		</label>

		<Button type="submit" classes="w-32 ml-auto" color="lime">Add Armor</Button>
	</div>
</form>

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

<div class="flex flex-col w-full">
	<button
		class="flex p-1 w-full justify-between underline"
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
			'flex flex-col w-full p-1 transition-all duration-[250ms] ease-out overflow-hidden',
			{
				'h-[344px] lg:h-36': expanded,
				'h-0': !expanded
			}
		)}
	>
		<div class="flex flex-col lg:flex-row gap-1 items-center">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-col lg:flex-row w-full lg:items-center lg:w-1/3">
				Name:
				<TextInput bind:value={newArmorName} maxlength="25" />
			</label>

			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-col lg:flex-row w-full lg:items-center lg:w-1/3">
				Rating:
				<NumberInput bind:value={newArmorRating} min="0" max="6" />
			</label>

			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-col lg:flex-row w-full lg:items-center lg:w-1/3">
				Type:
				<Select bind:value={newArmorType} options={armorTypes.map((key) => [key, key])} />
			</label>

			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-col lg:flex-row w-full lg:items-center ">
				Description:
				<Textarea bind:value={newArmorDescription} maxlength="240" />
			</label>

			<Button classes="w-32 ml-auto mt-1" color="lime" on:click={addArmor}>Add Armor</Button>
		</div>
	</div>
</div>

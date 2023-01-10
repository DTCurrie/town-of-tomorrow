<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { weaponTypes, type Weapon } from '$lib/db';
	import Button from './Button.svelte';
	import Chevron from './icons/Chevron.svelte';
	import classNames from 'classnames';
	import TextInput from './inputs/TextInput.svelte';
	import NumberInput from './inputs/NumberInput.svelte';
	import Select from './inputs/Select.svelte';
	import Textarea from './inputs/Textarea.svelte';

	const dispatch = createEventDispatcher();

	export let create = () => dispatch('create', newWeapon);

	let newWeaponName = '';
	let newWeaponRating = 0;
	let newWeaponType = 'Unarmed';
	let newWeaponDescription = '';

	let expanded = false;

	const resetNewWeapon = () => {
		newWeaponName = '';
		newWeaponRating = 0;
		newWeaponType = 'Unarmed';
		newWeaponDescription = '';
	};

	const addWeapon = () => {
		create();
		resetNewWeapon();
	};

	$: newWeapon = {
		name: newWeaponName,
		rating: newWeaponRating,
		type: newWeaponType,
		description: newWeaponDescription
	} as Weapon;
</script>

<div class="flex flex-col">
	<button
		class="flex w-full p-1 justify-between underline"
		on:click|preventDefault={() => (expanded = !expanded)}
	>
		New Weapon: <span
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
				<TextInput bind:value={newWeaponName} maxlength="25" />
			</label>

			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-col lg:flex-row w-full lg:items-center lg:w-1/3">
				Rating:
				<NumberInput
					type="number"
					class="w-full border border-black p-1 text-sm grow lg:ml-2"
					bind:value={newWeaponRating}
					min="0"
					max="6"
				/>
			</label>

			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-col lg:flex-row w-full lg:items-center lg:w-1/3">
				Type:
				<Select bind:value={newWeaponType} options={weaponTypes.map((key) => [key, key])} />
			</label>

			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-col lg:flex-row w-full lg:items-center">
				Description:
				<Textarea bind:value={newWeaponDescription} maxlength="240" />
			</label>

			<Button classes="w-32 ml-auto mt-1" color="lime" on:click={addWeapon}>Add Weapon</Button>
		</div>
	</div>
</div>

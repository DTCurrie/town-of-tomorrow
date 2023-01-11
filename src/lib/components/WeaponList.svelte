<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Weapon } from '../db';
	import Button from './Button.svelte';
	import NumberInput from './inputs/NumberInput.svelte';
	import Select from './inputs/Select.svelte';
	import Textarea from './inputs/Textarea.svelte';
	import TextInput from './inputs/TextInput.svelte';
	import WeaponInfo from './WeaponInfo.svelte';

	export let weapons: Weapon[];

	export let edit = (weapon: Weapon, index: number) => dispatch('edit-weapon', { weapon, index });
	export let remove = (index: number) => dispatch('remove-weapon', index);

	const dispatch = createEventDispatcher();

	let editing = -1;
	let removing = -1;
	let expanded = -1;

	let weaponName = '';
	let weaponRating = 0;
	let weaponType = 'Unarmed';
	let weaponDescription = '';

	$: newWeapon = {
		name: weaponName.trim(),
		rating: weaponRating,
		type: weaponType,
		description: weaponDescription.trim()
	} as Weapon;

	const resetNewWeapon = () => {
		editing = -1;
		weaponName = '';
		weaponRating = 0;
		weaponType = 'Unarmed';
		weaponDescription = '';
	};

	const editWeapon = (index: number) => {
		edit(newWeapon, index);
		resetNewWeapon();
	};

	const removeWeapon = (index: number) => {
		remove(index);
		removing = -1;
	};
</script>

<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
	{#each weapons as weapon, i}
		<li class="flex flex-col bg-white items-start rounded-lg shadow-lg">
			{#if editing === i}
				<div class="flex flex-col gap-0.5 w-full items-center p-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="w-full">
						<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]"> Name:</span>
						<TextInput bind:value={weaponName} maxlength="25" placeholder="Name" required />
					</label>
					<div class="grid grid-cols-2 w-full gap-0.5">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="w-full">
							<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]">Rating:</span>
							<NumberInput
								bind:value={weaponRating}
								min="0"
								max="6"
								placeholder="Rating"
								required
							/>
						</label>
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="w-full">
							<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]">Type:</span>
							<Select
								bind:value={weaponType}
								options={['Unarmed', 'Light', 'Medium', 'Heavy'].map((key) => [key, key])}
								placeholder={null}
								required
							/>
						</label>
					</div>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="w-full">
						<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]">Description:</span>
						<Textarea bind:value={weaponDescription} maxlength="240" placeholder="Description" />
					</label>
					<div class="grid grid-cols-2 gap-0.5 ml-auto mt-auto">
						<Button classes="w-20 ml-auto" color="rose" on:click={() => resetNewWeapon()}>
							Cancel
						</Button>
						<Button classes="w-20 ml-auto" color="lime" on:click={() => editWeapon(i)}>Save</Button>
					</div>
				</div>
			{:else}
				<WeaponInfo
					{weapon}
					removing={removing === i}
					remove={() => (removing === i ? removeWeapon(i) : (removing = i))}
					cancel={() => (removing = -1)}
					expanded={expanded === i}
					expand={() => (expanded === i ? (expanded = -1) : (expanded = i))}
					edit={() => {
						weaponName = weapon.name;
						weaponRating = weapon.rating;
						weaponType = weapon.type;
						weaponDescription = weapon.description;
						editing = i;
					}}
				/>
			{/if}
		</li>
	{/each}
</ul>

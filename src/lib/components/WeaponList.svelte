<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Weapon } from '../db';
	import Button from './Button.svelte';
	import NumberInput from './inputs/NumberInput.svelte';
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
	let weaponDescription = '';

	$: newWeapon = {
		name: weaponName.trim(),
		rating: weaponRating,
		description: weaponDescription.trim()
	} as Weapon;

	const resetNewWeapon = () => {
		editing = -1;
		weaponName = '';
		weaponRating = 0;
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
				<div class="flex flex-col w-full">
					<div
						class="flex flew-row items-center w-full gap-0.5 bg-rose-700 text-white rounded-t-lg px-1"
					>
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="w-full">
							<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]"> Name:</span>
							<TextInput
								bind:value={weaponName}
								classes="border-0 bg-rose-700 text-white rounded-tl-lg"
								maxlength="25"
								placeholder="Name"
								required
							/>
						</label>
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="w-12">
							<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]">Rating:</span>
							<NumberInput
								bind:value={weaponRating}
								classes="border-0 bg-rose-700 text-white rounded-tr-lg"
								min="0"
								placeholder="Rating"
								required
							/>
						</label>
					</div>
					<div class="flex flex-col w-full h-40 rounded-b-lg border-4 border-rose-700">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="w-full h-full">
							<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]">Description:</span>
							<Textarea
								bind:value={weaponDescription}
								classes="h-full border-0"
								maxlength="240"
								placeholder="Description"
							/>
						</label>
						<div
							class="grid grid-cols-2 w-full gap-0.5 ml-auto mt-auto p-2 border-t-4 border-rose-700"
						>
							<Button classes="w-20 ml-auto" color="rose" on:click={() => resetNewWeapon()}>
								Cancel
							</Button>
							<Button classes="w-20 ml-auto" color="lime" on:click={() => editWeapon(i)}
								>Save</Button
							>
						</div>
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
						weaponRating = weapon.rating ?? 0;
						weaponDescription = weapon.description;
						editing = i;
					}}
				/>
			{/if}
		</li>
	{/each}
</ul>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Weapon } from '../db';
	import Button from './Button.svelte';
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

<ul class="grid grid-cols-1 lg:grid-cols-3 gap-2">
	{#each weapons as weapon, i}
		<li class="flex flex-col bg-white items-start rounded-lg shadow-lg">
			{#if editing === i}
				<div class="flex flex-col gap-0.5 w-full items-center p-2">
					<label class="w-full">
						<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]"> Name:</span>
						<input
							type="text"
							class="w-full border border-black p-1 text-sm grow"
							value={weaponName}
							maxlength="25"
							placeholder="Name"
							on:input={() => (weaponName = weaponName.trim())}
						/>
					</label>
					<div class="grid grid-cols-2 w-full gap-0.5">
						<label class="w-full">
							<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]">Rating:</span>
							<input
								type="number"
								class="w-full border border-black p-1 text-sm grow"
								bind:value={weaponRating}
								min="0"
								max="6"
								placeholder="Rating"
							/>
						</label>
						<label class="w-full">
							<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]">Type:</span>
							<select
								bind:value={weaponType}
								class="block w-full p-1 h-[30px] lg:items-center bg-white border border-black rounded-none text-sm focus:ring-black focus:border-black"
							>
								<option value="Unarmed">Unarmed</option>
								<option value="Light">Light</option>
								<option value="Medium">Medium</option>
								<option value="Heavy">Heavy</option>
							</select>
						</label>
					</div>
					<label class="w-full">
						<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]">Description:</span>
						<textarea
							class="w-full h-[86px] lg:h-[151px] border border-black p-1 text-sm grow"
							bind:value={weaponDescription}
							maxlength="240"
							placeholder="Description"
							on:change={() => weaponDescription}
						/>
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

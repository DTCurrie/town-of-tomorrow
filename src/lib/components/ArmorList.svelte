<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Armor } from '../db';
	import ArmorInfo from './ArmorInfo.svelte';
	import Button from './Button.svelte';

	export let armor: Armor[];

	export let edit = (piece: Armor, index: number) =>
		dispatch('edit-armor', { armor: piece, index });

	export let remove = (index: number) => dispatch('remove-armor', index);

	const dispatch = createEventDispatcher();

	let editing = -1;
	let removing = -1;
	let expanded = -1;

	let armorName = '';
	let armorRating = 0;
	let armorType = 'Unarmed';
	let armorDescription = '';

	$: newArmor = {
		name: armorName.trim(),
		rating: armorRating,
		type: armorType,
		description: armorDescription.trim()
	} as Armor;

	const resetNewArmor = () => {
		editing = -1;
		armorName = '';
		armorRating = 0;
		armorType = 'Unarmed';
		armorDescription = '';
	};

	const editArmor = (index: number) => {
		edit(newArmor, index);
		resetNewArmor();
	};

	const removeArmor = (index: number) => {
		remove(index);
		removing = -1;
	};
</script>

<ul class="grid grid-cols-1 lg:grid-cols-3 gap-2">
	{#each armor as piece, i}
		<li class="flex flex-col bg-white items-start rounded-lg shadow-lg">
			{#if editing === i}
				<div class="flex flex-col gap-0.5 w-full items-center p-2">
					<label class="w-full">
						<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]"> Name:</span>
						<input
							type="text"
							class="w-full border border-black p-1 text-sm grow"
							value={armorName}
							maxlength="25"
							placeholder="Name"
							on:input={() => (armorName = armorName.trim())}
						/>
					</label>
					<div class="grid grid-cols-2 w-full gap-0.5">
						<label class="w-full">
							<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]">Rating:</span>
							<input
								type="number"
								class="w-full border border-black p-1 text-sm grow"
								bind:value={armorRating}
								min="0"
								max="4"
								placeholder="Rating"
							/>
						</label>
						<label class="w-full">
							<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]">Type:</span>
							<select
								bind:value={armorType}
								class="block w-full p-1 h-[30px] lg:items-center bg-white border border-black rounded-none text-sm focus:ring-black focus:border-black"
							>
								<option value="Clothing">Clothing</option>
								<option value="Light">Light</option>
								<option value="Medium">Medium</option>
								<option value="Heavy">Heavy</option>
								<option value="Hazard">Hazard</option>
							</select>
						</label>
					</div>
					<label class="w-full">
						<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]">Description:</span>
						<textarea
							class="w-full h-[86px] lg:h-[151px] border border-black p-1 text-sm grow"
							bind:value={armorDescription}
							maxlength="240"
							placeholder="Description"
							on:change={() => armorDescription}
						/>
					</label>
					<div class="grid grid-cols-2 gap-0.5 ml-auto mt-auto">
						<Button classes="w-20 ml-auto" color="rose" on:click={() => resetNewArmor()}>
							Cancel
						</Button>
						<Button classes="w-20 ml-auto" color="lime" on:click={() => editArmor(i)}>Save</Button>
					</div>
				</div>
			{:else}
				<ArmorInfo
					armor={piece}
					removing={removing === i}
					remove={() => (removing === i ? removeArmor(i) : (removing = i))}
					cancel={() => (removing = -1)}
					expanded={expanded === i}
					expand={() => (expanded === i ? (expanded = -1) : (expanded = i))}
					edit={() => {
						armorName = piece.name;
						armorRating = piece.rating;
						armorType = piece.type;
						armorDescription = piece.description;
						editing = i;
					}}
				/>
			{/if}
		</li>
	{/each}
</ul>

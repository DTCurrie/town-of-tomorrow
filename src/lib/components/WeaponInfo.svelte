<script lang="ts">
	import { updateWeapon, removeWeapon } from '$lib/api/characters';
	import NumberInput from '$lib/components/inputs/NumberInput.svelte';
	import Textarea from '$lib/components/inputs/Textarea.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import type { Character, Weapon } from '$lib/db';
	import Button from './Button.svelte';

	export let weapon: Weapon | null;
	export let character: Character | undefined;
	export let index: number;
	export let removing: boolean = false;
	export let editing: boolean = false;

	let weaponName = '';
	let weaponRating = 0;
	let weaponDescription = '';

	$: newWeapon = {
		name: weaponName.trim(),
		rating: weaponRating,
		description: weaponDescription.trim()
	} as Weapon;

	const resetNewWeapon = () => {
		editing = false;
		weaponName = '';
		weaponRating = 0;
		weaponDescription = '';
	};
</script>

<div class="flex flex-col w-full h-full rounded-lg bg-white">
	{#if editing}
		<form on:submit|preventDefault={() => updateWeapon(character, newWeapon, index)}>
			<div
				class="flex flew-row items-center w-full gap-0.5 bg-rose-700 rounded-t-lg border-x-2 border-t-2 border-rose-700"
			>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="w-full">
					<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]"> Name:</span>
					<TextInput
						bind:value={weaponName}
						classes="border-2 border-rose-700 rounded-tl-md"
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
						classes="border-2 border-rose-700 rounded-tr-md"
						min="0"
						placeholder="Rating"
						required
					/>
				</label>
			</div>
			<div
				class="flex flex-col w-full h-full rounded-b-lg border-4 border-t-2 border-rose-700 bg-white"
			>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="w-full h-full">
					<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]">Description:</span>
					<div class="flex w-full h-full">
						<Textarea
							bind:value={weaponDescription}
							classes="h-full border-0 overflow-auto whitespace-spaces"
							maxlength="240"
							placeholder="Description"
						/>
					</div>
				</label>
				<div class="flex flex-row w-full gap-2 ml-auto mt-auto p-2 border-t-4 border-rose-700">
					<Button classes="w-20 ml-auto" color="rose" on:click={() => resetNewWeapon()}
						>Cancel</Button
					>
					<Button type="submit" classes="w-20" color="lime">Save</Button>
				</div>
			</div>
		</form>
	{:else if weapon}
		<div class="flex flex-row w-full text-left bg-rose-700 text-white rounded-t-lg px-2 pt-2">
			<span class="font-display font-bold w-full overflow-x-hidden truncate">
				{weapon.name}
			</span>
			<span class="font-display font-normal">(+{weapon.rating})</span>
		</div>

		<div
			class="flex flex-col w-full h-full transition-all duration-[250ms] ease-out overflow-hidden border-4 border-rose-700 bg-white rounded-b-lg"
		>
			<div class="flex p-1 w-full h-full">
				<pre class="text-sm h-full overflow-auto whitespace-spaces">{weapon.description}</pre>
			</div>

			<div
				class="flex flex-row w-full gap-2 ml-auto mt-auto border-t-4 border-rose-700 p-2 shrink-0"
			>
				<Button
					classes="w-20 ml-auto"
					color="rose"
					on:click={() => (removing ? removeWeapon(character, index) : (removing = true))}
				>
					{#if removing}
						Confirm
					{:else}
						Remove
					{/if}
				</Button>
				{#if removing}
					<Button classes="w-20" color="cyan" on:click={() => (removing = false)}>Cancel</Button>
				{:else}
					<Button
						classes="w-20"
						color="cyan"
						on:click={() => {
							weaponName = weapon?.name ?? '';
							weaponRating = weapon?.rating ?? 0;
							weaponDescription = weapon?.description ?? '';
							editing = true;
						}}
					>
						Edit
					</Button>
				{/if}
			</div>
		</div>
	{/if}
</div>

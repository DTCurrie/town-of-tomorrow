<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { Character, Armor } from '$lib/db';
	import { logError } from '$lib/logs';
	import { errorToast, successToast } from '$lib/toast';

	import { updateArmor, removeArmor } from '$lib/api/characters';

	import NumberInput from '$lib/elements/inputs/NumberInput.svelte';
	import Textarea from '$lib/elements/inputs/Textarea.svelte';
	import TextInput from '$lib/elements/inputs/TextInput.svelte';
	import Button from '$lib/elements/Button.svelte';

	export let armor: Armor | undefined;
	export let character: Character | undefined;
	export let index: number;
	export let removing: boolean = false;
	export let editing: boolean = false;

	export let edited = () => dispatch('edited', newArmor);
	export let removed = () => dispatch('removed');

	const dispatch = createEventDispatcher();

	let pieceName = '';
	let pieceRating = 0;
	let pieceDescription = '';

	$: newArmor = {
		name: pieceName.trim(),
		rating: pieceRating,
		description: pieceDescription.trim()
	} as Armor;

	const resetNewArmor = () => {
		editing = false;
		pieceName = '';
		pieceRating = 0;
		pieceDescription = '';
	};

	const update = async () => {
		try {
			await updateArmor(character, newArmor, index);
			successToast(`Updated ${newArmor.name}!`);
			edited();
			editing = false;
		} catch (error) {
			logError('Error updating Armor', false, { armor, newArmor, character, index });
			errorToast('Error updating Armor, please try again!');
		}
	};

	const remove = async () => {
		try {
			await removeArmor(character, index);
			successToast(`Removed ${armor?.name}!`);
			removed();
		} catch (error) {
			logError('Error removing Armor', false, { armor, newArmor, character, index });
			errorToast('Error removing Armor, please try again!');
		}
	};
</script>

<div class="flex flex-col w-full h-full rounded-lg bg-white">
	{#if editing}
		<form on:submit|preventDefault={update}>
			<div
				class="flex flew-row items-center w-full gap-0.5 bg-lime-700 rounded-t-lg border-x-2 border-t-2 border-lime-700"
			>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="w-full">
					<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]"> Name:</span>
					<TextInput
						bind:value={pieceName}
						classes="border-2 border-lime-700 rounded-tl-md"
						maxlength="25"
						placeholder="Name"
						required
					/>
				</label>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="w-12">
					<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]">Rating:</span>
					<NumberInput
						bind:value={pieceRating}
						classes="border-2 border-lime-700 rounded-tr-md"
						min="0"
						placeholder="Rating"
						required
					/>
				</label>
			</div>
			<div
				class="flex flex-col w-full h-full rounded-b-lg border-4 border-t-2 border-lime-700 bg-white"
			>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="w-full h-full">
					<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]">Description:</span>
					<div class="flex w-full h-full">
						<Textarea
							bind:value={pieceDescription}
							classes="h-full min-h-[10rem] border-0 overflow-auto whitespace-spaces"
							maxlength="240"
							placeholder="Description"
						/>
					</div>
				</label>
				<div class="flex flex-row w-full gap-2 ml-auto mt-auto p-2 border-t-4 border-lime-700">
					<Button classes="w-20 ml-auto" color="rose" on:click={() => resetNewArmor()}>
						Cancel
					</Button>
					<Button type="submit" classes="w-20" color="lime">Save</Button>
				</div>
			</div>
		</form>
	{:else if armor}
		<div class="flex flex-row w-full text-left bg-lime-700 text-white rounded-t-lg px-2 pt-2">
			<span class="font-display font-bold w-full overflow-x-hidden truncate">
				{armor.name}
			</span>
			<span class="font-display font-normal">(+{armor.rating})</span>
		</div>

		<div
			class="flex flex-col w-full h-full transition-all duration-[250ms] ease-out overflow-hidden border-4 border-lime-700 bg-white rounded-b-lg"
		>
			<div class="flex p-1 w-full h-full">
				<pre class="text-sm h-full overflow-auto whitespace-spaces">{armor.description}</pre>
			</div>

			<div
				class="flex flex-row w-full gap-2 ml-auto mt-auto border-t-4 border-lime-700 p-2 shrink-0"
			>
				<Button
					classes="w-20 ml-auto"
					color="rose"
					on:click={() => (removing ? remove() : (removing = true))}
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
							pieceName = armor?.name ?? '';
							pieceRating = armor?.rating ?? 0;
							pieceDescription = armor?.description ?? '';
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

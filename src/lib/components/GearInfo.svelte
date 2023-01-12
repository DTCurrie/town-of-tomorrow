<script lang="ts">
	import { editGear, removeGear } from '$lib/api';
	import NumberInput from '$lib/components/inputs/NumberInput.svelte';
	import Textarea from '$lib/components/inputs/Textarea.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import type { Character, Gear } from '$lib/db';
	import Button from './Button.svelte';

	export let gear: Gear;
	export let character: Character | undefined;
	export let index: number;
	export let removing: boolean = false;
	export let editing: boolean = false;

	let pieceName = '';
	let pieceRating = 0;
	let pieceDescription = '';

	$: newGear = {
		name: pieceName.trim(),
		rating: pieceRating,
		description: pieceDescription.trim()
	} as Gear;

	const resetNewGear = () => {
		editing = false;
		pieceName = '';
		pieceRating = 0;
		pieceDescription = '';
	};
</script>

<div class="w-full">
	{#if editing}
		<div class="flex flex-col w-full">
			<div
				class="flex flew-row items-center w-full gap-0.5 bg-cyan-700 text-white rounded-t-lg px-1"
			>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="w-full">
					<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]"> Name:</span>
					<TextInput
						bind:value={pieceName}
						classes="border-0 bg-cyan-700 text-white rounded-tl-lg"
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
						classes="border-0 bg-cyan-700 text-white rounded-tr-lg"
						min="0"
						placeholder="Rating"
						required
					/>
				</label>
			</div>
			<div class="flex flex-col w-full h-40 rounded-b-lg border-4 border-cyan-700">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="w-full h-full">
					<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]">Description:</span>
					<Textarea
						bind:value={pieceDescription}
						classes="h-full border-0"
						maxlength="240"
						placeholder="Description"
					/>
				</label>
				<div class="grid grid-cols-2 w-full gap-0.5 ml-auto mt-auto p-2 border-t-4 border-cyan-700">
					<Button classes="w-20 ml-auto" color="rose" on:click={() => resetNewGear()}>
						Cancel
					</Button>
					<Button
						classes="w-20 ml-auto"
						color="lime"
						on:click={() => editGear(character, newGear, index)}>Save</Button
					>
				</div>
			</div>
		</div>
	{:else}
		<div class="flex w-full text-left bg-cyan-700 text-white rounded-t-lg px-2 pt-2">
			<div class="flex flex-row w-full">
				<span class="font-display font-bold w-40 overflow-x-hidden truncate">
					{gear.name}
				</span>
				<span class="font-display font-normal">(+{gear.rating})</span>
			</div>
		</div>

		<div
			class="flex flex-col w-full h-full transition-all duration-[250ms] ease-out overflow-hidden border-4 border-cyan-700 rounded-b-lg"
		>
			<div class="p-1 h-full">
				<pre class="text-sm h-full overflow-auto whitespace-spaces">{gear.description}</pre>
			</div>

			<div
				class="flex flex-row w-full gap-2 ml-auto mt-auto border-t-4 border-cyan-700 p-2 shrink-0"
			>
				<Button
					classes="w-20 ml-auto"
					color="rose"
					on:click={() => (removing ? removeGear(character, index) : (removing = true))}
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
							pieceName = gear.name;
							pieceRating = gear.rating ?? 0;
							pieceDescription = gear.description;
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

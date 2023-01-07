<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { db, type PlayCard } from '../../db';
	import PlayCardInput from '../../components/PlayCardInput.svelte';

	let status = '';
	let hasError = false;
	let isSuccessVisible = false;
	let submitted = false;

	let name = '';
	let description = '';
	let pitfall = '';
	let customPitfall = '';
	let avatar = '';
	let firstPlayCard: PlayCard | null;
	let secondPlayCard: PlayCard | null;
	let thirdPlayCard: PlayCard | null;

	async function addCharacter() {
		try {
			// Add the new friend!
			const id = await db.characters.add({
				name,
				description,
				pitfall,
				customPitfall,
				playCards: [firstPlayCard, secondPlayCard, thirdPlayCard, null],
				createdOn: new Date(Date.now()),
				avatar,
				damage: 0
			});

			status = `Character ${name} successfully added`;

			// Reset form:
			name = '';
			description = '';
			pitfall = '';
			customPitfall = '';
			avatar = '';

			firstPlayCard = null;
			secondPlayCard = null;
			thirdPlayCard = null;
		} catch (error) {
			status = `Failed to add ${name}: ${error}`;
		}
	}

	let firstOthers: [PlayCard | null, PlayCard | null];
	let secondOthers: [PlayCard | null, PlayCard | null];
	let thirdOthers: [PlayCard | null, PlayCard | null];

	let pitfalls: string[] = [];

	$: {
		firstOthers = [secondPlayCard, thirdPlayCard];
		secondOthers = [firstPlayCard, thirdPlayCard];
		thirdOthers = [firstPlayCard, secondPlayCard];

		pitfalls = [firstPlayCard, secondPlayCard, thirdPlayCard]
			.filter((card) => card !== null)
			.map((card, index) => card?.pitfall ?? `Select Play Card ${index + 1}`);
	}
</script>

<h1 class="text-2xl font-bold">Make a Character</h1>
<p>Follow these steps to create your Character.</p>
<fieldset class="mt-2">
	<legend><h2 class="text-xl">1. Pick Your Play Cards</h2></legend>

	<div class="flex flex-col lg:flex-row gap-2">
		<PlayCardInput slot="1" bind:playCard={firstPlayCard} bind:others={firstOthers} />
		<PlayCardInput slot="2" bind:playCard={secondPlayCard} bind:others={secondOthers} />
		<PlayCardInput slot="3" bind:playCard={thirdPlayCard} bind:others={thirdOthers} />
	</div>
</fieldset>
<fieldset class="mt-2">
	<legend><h2 class="text-xl">2. Name and Describe Your Character</h2></legend>

	<div class="flex flex-col lg:flex-row gap-2 items-center">
		<label class="flex p-2 w-1/3">
			Name:
			<input type="text" class="border ml-2 grow" bind:value={name} maxlength="30" />
		</label>
		<label class="flex p-2 w-2/3 items-center">
			Description:
			<textarea class="border ml-2 grow" bind:value={description} maxlength="240" />
		</label>
	</div>
</fieldset>
<fieldset class="mt-2">
	<legend><h2 class="text-xl">3. Choose a Pitfall</h2></legend>

	<label>
		Pitfall:
		<select
			bind:value={pitfall}
			class="block w-full p-1 bg-white border border-black rounded-none text-sm focus:ring-black focus:border-black"
		>
			<option value={''}>Select a Pitfall</option>
			{#each pitfalls as option}
				<option value={option}>{option}</option>
			{/each}
		</select>
	</label>
</fieldset>
<fieldset class="mt-2">
	<label class="flex p-2 w-full items-center">
		Custom Pitfall:
		<textarea class="border ml-2 grow" bind:value={customPitfall} maxlength="240" />
	</label>
	<label>
		Avatar:
		<p class="text-sm text-gray-500">
			This must be a URL to the image, the image will not be hosted here
		</p>
		<input type="url" bind:value={avatar} />

		{#if avatar}
			<img
				alt="avatar preview"
				class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
				src={avatar}
			/>
		{/if}
	</label>
	<button on:click={addCharacter}>Add Character</button>
	{#if status}
		<p>{status}</p>
	{/if}
</fieldset>

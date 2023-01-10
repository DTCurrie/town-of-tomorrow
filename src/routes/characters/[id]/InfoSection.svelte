<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import DamageInfo from '$lib/components/DamageInfo.svelte';
	import XpInfo from '$lib/components/XpInfo.svelte';
	import type { Character, Xp } from '$lib/db';
	import classNames from 'classnames';

	export let character: Character;

	export let setDescription: (character: Character, description: string) => Promise<void>;
	export let setPitfall: (character: Character, pitfall: string) => Promise<void>;
	export let setCustomPitfall: (character: Character, pitfall: string) => Promise<void>;

	export let setDamage: (character: Character, damage: number) => Promise<void>;
	export let setCritical: (character: Character, critical: boolean) => Promise<void>;
	export let setDead: (character: Character, dead: boolean) => Promise<void>;

	export let setXp: (character: Character, xp: Xp) => Promise<void>;

	export let setNotes: (character: Character, notes: string) => Promise<void>;

	let newDescription = character.description;
	let newPitfall = character.pitfall;
	let newCustomPitfall = character.customPitfall;
	let newNotes = character.notes;

	$: descriptionChanged = character?.description !== newDescription?.trim();
	$: pitfallChanged = character?.pitfall !== newPitfall?.trim();
	$: customPitfallChanged = character?.customPitfall !== newCustomPitfall?.trim();
	$: notesChanged = character?.notes !== newNotes?.trim();

	$: pitfallOptions = character.playCards.reduce<string[]>((arr, cur) => {
		if (cur && cur.pitfall !== newPitfall) {
			arr.push(cur.pitfall);
		}

		return arr;
	}, []);
</script>

<div class="flex flex-col gap-2">
	<label class="flex flex-col w-full">
		<p class="font-bold py-1">Description:</p>
		<textarea
			class={classNames(
				'w-full max-md:focus:min-h-[10rem] md:min-h-[10rem] border border-black p-1 text-sm grow lg:ml-2',
				descriptionChanged && 'h-[10rem]'
			)}
			bind:value={newDescription}
			maxlength="240"
		/>
	</label>
	{#if descriptionChanged}
		<Button
			classes="w-32 ml-auto"
			color="lime"
			on:click={() => setDescription(character, newDescription)}
		>
			Save Description
		</Button>
	{/if}
</div>

<p class="font-bold py-1">Pitfalls:</p>
<ul>
	<li class="flex flex-col w-100">
		<select
			bind:value={newPitfall}
			class="block w-full p-1 bg-white border border-black rounded-none text-sm focus:ring-black focus:border-black"
		>
			<option value={newPitfall}>{newPitfall}</option>
			{#each pitfallOptions as option}
				<option value={option} selected={newPitfall === option}>{option}</option>
			{/each}
		</select>
		{#if pitfallChanged}
			<Button
				classes="w-32 ml-auto"
				color="lime"
				on:click={() => setPitfall(character, newPitfall)}
			>
				Save Pitfall
			</Button>
		{/if}
	</li>
	<li class="flex flex-col w-100">
		<label class="flex py-2 w-full items-center">
			<textarea
				class="border border-black p-1 text-sm grow lg:ml-2"
				bind:value={newCustomPitfall}
				maxlength="240"
			/>
		</label>
		{#if customPitfallChanged}
			<Button
				classes="w-32 ml-auto"
				color="lime"
				on:click={() => setCustomPitfall(character, newDescription)}
			>
				Save Pitfall
			</Button>
		{/if}
	</li>
</ul>

<div class="flex flex-col md:flex-row md:items-center md:justify-between py-2 gap-2">
	<DamageInfo
		playCards={character.playCards}
		damage={character.damage}
		critical={character.critical}
		dead={character.dead}
		on:set-damage={({ detail }) => setDamage(character, detail)}
		on:set-critical={({ detail }) => setCritical(character, detail)}
		on:set-dead={({ detail }) => setDead(character, detail)}
	/>

	<XpInfo xp={character.xp} on:set-xp={({ detail }) => setXp(character, detail)} />
</div>

<div class="flex flex-col py-2 gap-2">
	<label class="flex flex-col w-full">
		<p class="font-bold">Notes:</p>
		<textarea
			class="w-full max-md:focus:min-h-[10rem] md:min-h-[10rem] border border-black p-1 text-sm grow lg:ml-2"
			bind:value={newNotes}
			maxlength="100000"
		/>
	</label>
	{#if notesChanged}
		<Button classes="w-32 ml-auto" color="lime" on:click={() => setNotes(character, newNotes)}>
			Save Notes
		</Button>
	{/if}
</div>

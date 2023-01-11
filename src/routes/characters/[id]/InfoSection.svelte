<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import DamageInfo from '$lib/components/DamageInfo.svelte';
	import Select from '$lib/components/inputs/Select.svelte';
	import Textarea from '$lib/components/inputs/Textarea.svelte';
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

	$: pitfallOptions = character.playCards.reduce<[string, string][]>((arr, cur) => {
		if (cur) {
			const pitfall = cur.pitfall;
			if (pitfall === newPitfall) {
				return [[pitfall, pitfall], ...arr];
			}

			if (pitfall !== newPitfall) {
				return [...arr, [pitfall, pitfall]];
			}
		}

		return arr;
	}, []);
</script>

<div class="flex flex-col gap-2">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="flex flex-col w-full">
		<p class="font-display font-bold">Description:</p>
		<Textarea
			classes={classNames(
				'max-md:focus:min-h-[10rem] md:min-h-[10rem]',
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

<p class="font-display font-bold mt-2">Pitfalls:</p>
<div class="flex flex-col gap-2">
	<ul class="flex flex-col gap-2">
		<li class="flex flex-col w-100">
			<Select bind:value={newPitfall} options={pitfallOptions} placeholder={null} />
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
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex py-2 w-full items-center">
				<Textarea
					bind:value={newCustomPitfall}
					classes="max-md:focus:min-h-[10rem] md:min-h-[10rem]"
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
</div>

<div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 max-w-[30rem]">
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

<div class="flex flex-col gap-2 mt-2">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="flex flex-col w-full">
		<p class="font-display font-bold">Notes:</p>
		<Textarea
			classes="max-md:focus:min-h-[10rem] md:min-h-[10rem]"
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

<script lang="ts">
	import {
		updateCritical,
		updateDamage,
		updateDead,
		updateDescription,
		updateNotes,
		updatePitfall,
		updateXp
	} from '$lib/api/characters';
	import Button from '$lib/components/Button.svelte';
	import DamageInfo from '$lib/components/DamageInfo.svelte';
	import Textarea from '$lib/components/inputs/Textarea.svelte';
	import XpInfo from '$lib/components/XpInfo.svelte';
	import classNames from 'classnames';
	import type { PageData } from './$types';

	export let data: PageData;

	$: character = data.character;

	let editingDescription = false;
	let editingPitfall = false;
	let editingNotes = false;

	let newDescription = '';
	let newPitfall = '';
	let newNotes = '';

	$: {
		if (!editingDescription) {
			newDescription = $character?.description ?? '';
		}
	}

	$: {
		if (!editingPitfall) {
			newPitfall = $character?.pitfall ?? '';
		}
	}

	$: {
		if (!editingNotes) {
			newNotes = $character?.notes ?? '';
		}
	}

	$: descriptionChanged = $character?.description !== newDescription?.trim();
	$: pitfallChanged = $character?.pitfall !== newPitfall?.trim();
	$: notesChanged = $character?.notes !== newNotes?.trim();
</script>

{#if $character}
	<div class="flex flex-col gap-2">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="flex flex-col w-full">
			<p class="font-display font-bold">Description:</p>
			<Textarea
				classes={classNames(
					'max-md:focus:min-h-[7rem] md:min-h-[7rem]',
					descriptionChanged && 'h-[7rem]'
				)}
				bind:value={newDescription}
				readonly={!editingDescription}
				maxlength="240"
			/>
		</label>
		{#if editingDescription}
			<div class="flex flex-row gap-2">
				<Button classes="w-24 ml-auto" color="rose" on:click={() => (editingDescription = false)}>
					Cancel
				</Button>
				<Button
					classes="w-36 "
					color="lime"
					disabled={!descriptionChanged}
					on:click={async () => {
						await updateDescription($character, newDescription);
						editingDescription = false;
					}}
				>
					Save Description
				</Button>
			</div>
		{:else}
			<Button classes="w-36 ml-auto" color="cyan" on:click={() => (editingDescription = true)}>
				Edit Description
			</Button>
		{/if}
	</div>

	<div class="flex flex-col gap-2">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="flex flex-col w-full">
			<p class="font-display font-bold mt-2">Pitfall:</p>
			<Textarea
				bind:value={newPitfall}
				classes={classNames(
					'max-md:focus:min-h-[7rem] md:min-h-[7rem]',
					pitfallChanged && 'h-[7rem]'
				)}
				readonly={!editingPitfall}
				maxlength="240"
			/>
		</label>
		{#if editingPitfall}
			<div class="flex flex-row gap-2">
				<Button classes="w-24 ml-auto" color="rose" on:click={() => (editingPitfall = false)}>
					Cancel
				</Button>
				<Button
					classes="w-36"
					color="lime"
					disabled={!pitfallChanged}
					on:click={async () => {
						await updatePitfall($character, newPitfall);
						editingPitfall = false;
					}}
				>
					Save Pitfall
				</Button>
			</div>
		{:else}
			<Button classes="w-36 ml-auto" color="cyan" on:click={() => (editingPitfall = true)}>
				Edit Pitfall
			</Button>
		{/if}
	</div>

	<div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 max-w-[30rem]">
		<DamageInfo
			playCards={$character.playCards}
			damage={$character.damage}
			critical={$character.critical}
			dead={$character.dead}
			showCritical
			showDead
			on:set-damage={({ detail }) => updateDamage($character, detail)}
			on:set-critical={({ detail }) => updateCritical($character, detail)}
			on:set-dead={({ detail }) => updateDead($character, detail)}
		/>

		<XpInfo xp={$character.xp} on:set-xp={({ detail }) => updateXp($character, detail)} />
	</div>

	<div class="flex flex-col gap-2 mt-2">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="flex flex-col w-full">
			<p class="font-display font-bold">Notes:</p>
			<Textarea
				classes="max-md:focus:min-h-[7rem] md:min-h-[7rem]"
				bind:value={newNotes}
				readonly={!editingNotes}
				maxlength="100000"
			/>
		</label>

		{#if editingNotes}
			<div class="flex flex-row gap-2">
				<Button classes="w-24 ml-auto" color="rose" on:click={() => (editingNotes = false)}>
					Cancel
				</Button>
				<Button
					classes="w-36"
					color="lime"
					disabled={!notesChanged}
					on:click={async () => {
						await updateNotes($character, newNotes);
						editingNotes = false;
					}}
				>
					Save Notes
				</Button>
			</div>
		{:else}
			<Button classes="w-36 ml-auto" color="cyan" on:click={() => (editingNotes = true)}>
				Edit Notes
			</Button>
		{/if}
	</div>
{/if}

<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import PlayCardInfo from '$lib/components/PlayCardInfo.svelte';
	import PlayCardInput from '$lib/components/PlayCardInput.svelte';
	import type {
		Character,
		Fault,
		Merit,
		PlayCard,
		PlayCardIndex,
		PlayCards,
		Unlockable
	} from '$lib/db';
	import { getOthers } from '$lib/play-cards';

	export let character: Character;

	export let setUnlocked: (character: Character, unlock: Unlockable) => Promise<void>;

	export let setMerits: (
		character: Character,
		index: PlayCardIndex,
		merits: Merit
	) => Promise<void>;

	export let setFaults: (
		character: Character,
		index: PlayCardIndex,
		faults: Fault
	) => Promise<void>;

	export let removePlayCard: (character: Character, playCardName: string) => Promise<void>;

	export let addPlayCard: (
		character: Character,
		playCard: PlayCard | null,
		index: number
	) => Promise<void>;

	let addingPlayCard = [false, false, false, false];
	let playCardsToAdd: PlayCards = [null, null, null, null];

	let getIndex = (i: number): PlayCardIndex => i as PlayCardIndex;
</script>

<h2 class="text-xl mt-2">Play Cards:</h2>

<div class="grid w-full grid-cols-1 lg:grid-cols-2 gap-2">
	{#each character.playCards ?? [null, null, null, null] as playCard, i}
		{#if playCard}
			<PlayCardInfo
				bind:playCard
				showName={true}
				showUnlocked
				showMerits
				showFaults
				showRemove
				on:unlock={({ detail }) => setUnlocked(character, detail)}
				on:set-merits={({ detail }) => setMerits(character, getIndex(i), detail)}
				on:set-faults={({ detail }) => setFaults(character, getIndex(i), detail)}
				on:remove-play-card={({ detail }) => removePlayCard(character, detail)}
			/>
		{:else if addingPlayCard[i]}
			<PlayCardInput
				bind:playCard
				others={getOthers(character.playCards, i)}
				on:select={(event) => (playCardsToAdd[i] = event.detail)}
			>
				<div class="flex gap-1 p-2 mt-auto">
					<Button
						classes="w-24 ml-auto"
						color="lime"
						on:click={() => {
							addPlayCard(character, playCardsToAdd[i], i);
							addingPlayCard[i] = false;
						}}>Confirm</Button
					>
					<Button classes="w-24" color="red" on:click={() => (addingPlayCard[i] = false)}>
						Cancel
					</Button>
				</div>
			</PlayCardInput>
		{:else}
			<button
				class="flex flex-col flex-grow justify-center items-center border border-black w-full"
				on:click|preventDefault={() => (addingPlayCard[i] = true)}
			>
				Add Play Card
			</button>
		{/if}
	{/each}
</div>

<script lang="ts">
	import type { PlayCard } from '../db';
	import { playCards } from '$lib/play-cards';

	function filterPlayCards(first: PlayCard | null, second: PlayCard | null) {
		return playCards.filter(({ name }) => name !== first?.name && name !== second?.name);
	}

	export let playCard: PlayCard | null;
	export let slot: string;
	export let others: [PlayCard | null, PlayCard | null];
</script>

<div class="flex flex-col p-2 w-full grow border border-black">
	<label>
		Play Card {slot}:
		<select
			bind:value={playCard}
			class="block w-full p-1 bg-white border border-black rounded-none text-sm focus:ring-black focus:border-black"
		>
			<option value={null}>Select a Play Card</option>
			{#each filterPlayCards(others[0], others[1]) as option}
				<option value={option}>{option.name}</option>
			{/each}
		</select>
	</label>
	{#if playCard}
		<p class="text-sm text-gray-500">{playCard.job.name} (+{playCard.job.health} Health)</p>
		<p class="font-bold">Bonuses:</p>
		<ul class="list-disc pl-8">
			{#each playCard.bonuses as bonus}
				<li class="list-item">{bonus}</li>
			{/each}
		</ul>
		<p><span class="font-bold">Pitfall:</span> {playCard.pitfall}</p>
		<p class="font-bold">Unlockables:</p>
		<ul class="list-none">
			{#each playCard.unlockables as unlockable}
				<li>
					<label>
						<input type="checkbox" bind:value={unlockable.unlocked} />
						<span class="font-bold">{unlockable.name}</span>
					</label>
					<p>
						{unlockable.description}
					</p>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<script lang="ts">
	import { standardPlayCards } from '$lib/play-cards';

	import PlayCardCard from '$lib/components/play-cards/PlayCardCard.svelte';
	import Button from '$lib/elements/Button.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	$: customPlayCards = data.customPlayCards;
	$: details = data.details;

	$: playCards = [...($customPlayCards ?? []), ...standardPlayCards.map((c) => c())];
</script>

<h1 class="md:text-2xl font-bold">Your Play Cards</h1>

<div class="flex flex-row w-full h-full">
	<div class="flex flex-col w-full h-full grow">
		{#if playCards}
			<div class="grid gap-2 md:grid-cols-2 lg:grid-cols-3 w-full">
				<Button
					classes="w-full h-full min-h-[10.375rem] rounded-lg"
					color="lime"
					on:click={() =>
						($details = {
							component: 'play-card-create',
							data: undefined,
							index: 0
						})}
				>
					Create Play Card
				</Button>
				{#each playCards as card}
					<PlayCardCard
						bind:playCard={card}
						select={() =>
							($details = {
								component: 'play-card-info',
								data: card,
								index: 0
							})}
					/>
				{/each}
			</div>
		{/if}
	</div>
</div>

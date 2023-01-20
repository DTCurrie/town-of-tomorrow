<script lang="ts">
	import type { PlayCard } from '$lib/db';

	import { createPlayCard } from '$lib/api/play-cards';

	import NewPlayCard from '$lib/components/play-cards/NewPlayCard.svelte';
	import PlayCardInfo from '$lib/components/play-cards/PlayCardInfo.svelte';
	import Details from '$lib/components/Details.svelte';

	import type { PageData } from './$types';
	import { successToast } from '$lib/toast';
	import { logError } from '$lib/logs';

	export let data: PageData;

	$: details = data.details;
	$: playCard = $details && ($details.data as PlayCard);
</script>

<slot />

<Details bind:details={$details}>
	{#if $details}
		<div class="flex p-2 w-full h-full">
			{#if $details.component === 'play-card-info'}
				<PlayCardInfo bind:playCard showActions={playCard?.id !== undefined} />
			{:else if $details.component === 'play-card-create'}
				<NewPlayCard
					on:created={async ({ detail }) => {
						try {
							const id = await createPlayCard(detail);
							$details = {
								component: 'play-card-info',
								data: { ...detail, id },
								index: 0
							};
							successToast(`Created ${detail.name}`);
						} catch (error) {
							logError('Error creating Play Card', false, { playCard, detail, error });
						}
					}}
				/>
			{/if}
		</div>
	{/if}
</Details>

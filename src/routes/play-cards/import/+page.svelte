<script lang="ts">
	import { onMount } from 'svelte';

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import type { PlayCard } from '$lib/db';
	import { dataToJson } from '$lib/export';
	import { logError } from '$lib/logs';
	import { errorToast } from '$lib/toast';

	import { createPlayCard } from '$lib/api/play-cards';

	import Button from '$lib/elements/Button.svelte';
	import UrlInput from '$lib/elements/inputs/UrlInput.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	$: details = data.details;

	let errored = false;
	let importing = false;

	let inputData = '';

	const importData = async (data: string) => {
		try {
			const playCardData = await dataToJson<PlayCard>(data);
			if (playCardData) {
				delete playCardData.id;
				const id = browser && (await createPlayCard(playCardData));
				const playCard: PlayCard = {
					id: parseInt(id.toString(), 10),
					...playCardData
				};

				if (!playCard.id) {
					logError('Invalid Play Card', false, { playCard });
					errorToast('Error importing Play Card, please try again!');
				} else {
					$details = {
						component: 'play-card-info',
						data: playCard,
						index: 0
					};

					goto(`/play-cards/`);
				}
			}
		} catch (error) {
			logError('Error importing Play Card', false, { data, url: $page.url, error });
		}
	};

	onMount(async () => {
		const data = $page.url.searchParams.get('data');

		if (data) {
			await importData(data);
		}
	});
</script>

{#if errored}
	<div class="flex w-screen h-screen justify-center items-center text-2xl font-display font-bold">
		Error!
	</div>
{:else if importing}
	<div class="flex w-screen h-screen justify-center items-center text-2xl font-display font-bold">
		Importing ...
	</div>
{:else}
	<h1 class="font-display font-bold text-2xl">Import a Play Card</h1>
	<div class="flex flex-col gap-2">
		<p>
			You can use the "Copy Import Link" button when viewing a Play Card to copy an import url for
			the Play Card to your clipboard. You can share this link with other devices or people, and
			when opened the Play Card should be automatically added to the device.
		</p>
		<p>
			You can also paste the import link into the input below, and click "Import Play Card" button
			to add the Play Card to this device.
		</p>
		<form
			on:submit|preventDefault={() => importData(new URL(inputData).searchParams.get('data') ?? '')}
			class="flex flex-col w-full gap-2"
		>
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label>
				Import Link:
				<UrlInput bind:value={inputData} required />
			</label>
			<!-- svelte-ignore missing-declaration -->
			<Button type="submit" color="lime" classes="w-36 ml-auto">Import Play Card</Button>
		</form>
	</div>
{/if}

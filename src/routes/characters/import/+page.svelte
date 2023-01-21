<script lang="ts">
	import { onMount } from 'svelte';

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import type { Character } from '$lib/db';
	import { dataToJson } from '$lib/export';
	import { logError, logInfo } from '$lib/logs';
	import { errorToast } from '$lib/toast';

	import { createCharacter } from '$lib/api/characters';

	import UrlInput from '$lib/elements/inputs/UrlInput.svelte';
	import Button from '$lib/elements/Button.svelte';

	let errored = false;
	let importing = false;

	let inputData = '';

	const importData = async (data: string) => {
		errored = false;
		importing = true;

		try {
			const characterData = await dataToJson<Character>(data);
			logInfo('characterData', false, { characterData });

			if (characterData) {
				delete characterData.id;
				const id =
					browser && (await createCharacter({ ...characterData, createdOn: new Date(Date.now()) }));
				const character: Character = {
					...characterData,
					id: parseInt(id.toString(), 10)
				};

				logInfo('character', false, { character });
				goto(`/characters/${character.id}/info/`);
			}
		} catch (err) {
			logError('Error importing Character', false, { data, url: $page.url, error: err });
			errorToast('Error importing your Character, please refresh to try again!');
			errored = true;
			importing = false;
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
	<h1 class="font-display font-bold text-2xl">Import a Character</h1>
	<div class="flex flex-col gap-2">
		<p>
			You can use the "Copy Import Link" button when viewing a Character to copy an import url for
			the Character to your clipboard. You can share this link with other devices or people, and
			when opened the Character should be automatically added to the device.
		</p>
		<p>
			You can also paste the import link into the input below, and click "Import Character" button
			to add the Character to this device.
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
			<Button type="submit" color="lime" classes="w-36 ml-auto">Import Character</Button>
		</form>
	</div>
{/if}

<script lang="ts">
	import { tick } from 'svelte';
	import classNames from 'classnames';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import type { Gear, PlayCard, Rapport } from '$lib/db';
	import type { PlayCardAddData } from '$lib/details';
	import { jsonToData } from '$lib/export';
	import { logError } from '$lib/logs';
	import { getIndex, getOthers, type OtherPlayCards } from '$lib/play-cards';
	import { errorToast, successToast } from '$lib/toast';

	import { deleteCharacter, updatePlayCard } from '$lib/api/characters';
	import { createPlayCard } from '$lib/api/play-cards';

	import ArmorInfo from '$lib/components/armor/ArmorInfo.svelte';
	import GearInfo from '$lib/components/gear/GearInfo.svelte';
	import NewPlayCard from '$lib/components/play-cards/NewPlayCard.svelte';
	import PlayCardInput from '$lib/components/play-cards/PlayCardInput.svelte';
	import SelectedPlayCardInfo from '$lib/components/play-cards/SelectedPlayCardInfo.svelte';
	import RapportInfo from '$lib/components/rapport/RapportInfo.svelte';
	import WeaponInfo from '$lib/components/weapons/WeaponInfo.svelte';
	import Details from '$lib/components/Details.svelte';

	import Button from '$lib/elements/Button.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let removing = false;

	$: character = data.character;
	$: details = data.details;

	$: index = $details?.index ?? -1;
	$: gear = $details && ($details.data as Gear);
	$: playCard = $details && ($details.data as PlayCard);
	$: rapport = $details && ($details.data as Rapport);
	$: addPlayCard = {
		others: (($details?.data as PlayCardAddData)?.others ?? [
			undefined,
			undefined,
			undefined
		]) as OtherPlayCards,
		selected: ($details?.data as PlayCardAddData)?.selected
	};

	$: tab = $page.url.pathname.split('/').reverse()[0];

	const selectTab = (tab: string) => goto(`/characters/${data.id}/${tab}/`);
	const closeDetails = () => ($details = undefined);

	$: exportCharacter = async () => {
		const data = jsonToData($character);

		if (data) {
			const url = `${$page.url.origin}/characters/import?data=${data}`;

			try {
				await navigator.clipboard.writeText(url);
				await tick();
				successToast(`Copied import link for ${$character?.name}`);
			} catch (err) {
				logError('Error copying to clipboard', false, { url });
				errorToast('Error copying import link, please try again!');
			}
		}
	};
</script>

{#if $character}
	<div class="flex flex-col lg:flex-row gap-2 lg:justify-between">
		<h1 class="md:text-2xl font-bold">{$character.name}</h1>
		<div class="flex flex-row gap-2">
			{#if removing}
				<Button
					color="rose"
					classes="w-24"
					on:click={async () => {
						try {
							await deleteCharacter($character?.id);
							successToast(`Removed ${$character?.name}`);
							goto(`/`);
						} catch (error) {
							logError('Error deleting Character', false, { character });
							errorToast('Error deleting Character, please try again!');
						}
					}}
				>
					Confirm
				</Button>
			{:else}
				<Button color="rose" classes="w-24" on:click={() => (removing = true)}>Remove</Button>
			{/if}
			<Button color="cyan" classes="w-40" on:click={exportCharacter}>Copy Import URL</Button>
		</div>
	</div>

	<div class="flex flex-row w-full h-full">
		<div class="flex flex-col w-full h-full grow">
			<ul class="relative flex text-sm font-medium text-center border-b border-black my-2">
				<li class={classNames('relative ', tab === 'info' && 'z-10')}>
					<button
						class={classNames(
							'rounded-t-lg bg-white w-16 md:w-24 py-3 shadow hover:underline',
							tab === 'info' && 'font-bold underline shadow-lg'
						)}
						on:click|preventDefault={() => selectTab('info')}
					>
						Info
					</button>
				</li>
				<li
					class={classNames(
						'relative max-md:-translate-x-3 md:-left-1',
						tab === 'play-cards' && 'z-10'
					)}
				>
					<button
						aria-current="page"
						class={classNames(
							'rounded-t-lg bg-white w-24 md:w-24 py-3 shadow hover:underline',
							tab === 'play-cards' && 'font-bold underline shadow-lg'
						)}
						on:click|preventDefault={() => selectTab('play-cards')}
					>
						Play Cards
					</button>
				</li>
				<li
					class={classNames('relative max-md:-translate-x-4 md:-left-1', tab === 'gear' && 'z-10')}
				>
					<button
						class={classNames(
							'rounded-t-lg bg-white w-16 md:w-24 py-3 shadow hover:underline',
							tab === 'play-cards' && 'font-bold underline shadow-lg'
						)}
						on:click|preventDefault={() => selectTab('gear')}
					>
						Gear
					</button>
				</li>
				<li
					class={classNames(
						'relative max-md:-translate-x-5 md:-left-1',
						tab === 'rapport' && 'z-10'
					)}
				>
					<button
						class={classNames(
							'rounded-t-lg bg-white w-[5.5rem] md:w-24 py-3 shadow hover:underline',
							tab === 'rapport' && 'font-bold underline shadow-lg'
						)}
						on:click|preventDefault={() => selectTab('rapport')}
					>
						Rapport
					</button>
				</li>
			</ul>

			<slot />
		</div>
	</div>
	<Details bind:details={$details}>
		{#if $details}
			<div class="flex p-2 w-full h-full">
				{#if $details.component === 'gear-info'}
					<GearInfo bind:character={$character} bind:gear {index} />
				{:else if $details.component === 'weapon-info'}
					<WeaponInfo bind:character={$character} bind:weapon={gear} {index} />
				{:else if $details.component === 'armor-info'}
					<ArmorInfo bind:character={$character} bind:armor={gear} {index} />
				{:else if $details.component === 'rapport-info'}
					<RapportInfo bind:character={$character} bind:rapport {index} />
				{:else if $details.component === 'play-card-info'}
					<SelectedPlayCardInfo
						bind:playCard
						bind:character={$character}
						index={getIndex(index)}
						showName={true}
						showUnlocked
						showMerits
						showFaults
						showRemove
					/>
				{:else if $details.component === 'play-card-add'}
					<PlayCardInput
						others={addPlayCard.others}
						bind:playCard={addPlayCard.selected}
						on:saved={({ detail }) => {
							updatePlayCard($character, detail, getIndex(index));
							closeDetails();
						}}
					>
						<Button type="submit" classes="w-32" color="lime">Add Play Card</Button>
					</PlayCardInput>
				{:else if $details.component === 'play-card-create'}
					<NewPlayCard
						on:created={async ({ detail }) => {
							const id = await createPlayCard(detail);
							$details = {
								component: 'play-card-add',
								data: {
									others: getOthers($character?.playCards, getIndex(index)),
									selected: { ...detail, id }
								},
								index
							};
						}}
					/>
				{/if}
			</div>
		{/if}
	</Details>
{/if}

<script lang="ts">
	import { browser } from '$app/environment';
	import type { PageData } from './$types';
	import { db, type Character } from '$lib/db';
	import { liveQuery, type Observable } from 'dexie';
	import classNames from 'classnames';
	import InfoSection from './InfoSection.svelte';
	import PlayCardsSection from './PlayCardsSection.svelte';
	import GearSection from './GearSection.svelte';
	import RapportSection from './RapportSection.svelte';
	import {
		addPlayCard,
		createArmor,
		createGear,
		createRapport,
		createWeapon,
		editArmor,
		editGear,
		editWeapon,
		removeArmor,
		removeGear,
		removePlayCard,
		removeRapport,
		removeWeapon,
		setCritical,
		setCustomPitfall,
		setDamage,
		setDead,
		setDescription,
		setFaults,
		setMerits,
		setNotes,
		setPitfall,
		setRapport,
		setUnlocked,
		setXp
	} from '$lib/api';
	import classnames from 'classnames';
	import GearInfo from '$lib/components/GearInfo.svelte';
	import type { DetailComponent } from './utils';
	import { clickOutside } from '$lib/click-outside';

	export let data: PageData & { id: number };

	let tab: 'info' | 'play-cards' | 'gear' | 'rapport' = 'info';
	let details: any & { component: DetailComponent };

	$: character = liveQuery(async () => {
		return browser ? await db.characters.get({ id: data.id }) : undefined;
	}) as Observable<Character | undefined>;
</script>

{#if $character}
	<h1 class="md:text-2xl font-bold">{$character.name}</h1>

	<div class="flex flex-row w-full h-full">
		<div class="flex flex-col w-full h-full grow">
			<ul class="relative flex text-sm font-medium text-center border-b border-black my-2">
				<li class={classNames('relative ', tab === 'info' && 'z-10')}>
					<button
						class={classNames(
							'rounded-t-lg bg-white w-16 md:w-24 py-3 shadow hover:underline',
							tab === 'info' && 'font-bold underline shadow-lg'
						)}
						on:click|preventDefault={() => (tab = 'info')}
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
						on:click|preventDefault={() => (tab = 'play-cards')}
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
						on:click|preventDefault={() => (tab = 'gear')}
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
						on:click|preventDefault={() => (tab = 'rapport')}
					>
						Rapport
					</button>
				</li>
			</ul>

			{#if tab === 'info'}
				<InfoSection
					bind:character={$character}
					{...{
						setDescription,
						setPitfall,
						setCustomPitfall,
						setDamage,
						setCritical,
						setDead,
						setXp,
						setNotes
					}}
				/>
			{/if}

			{#if tab === 'play-cards'}
				<PlayCardsSection
					bind:character={$character}
					{...{ setUnlocked, setMerits, setFaults, addPlayCard, removePlayCard }}
				/>
			{/if}

			{#if tab === 'gear'}
				<GearSection
					bind:character={$character}
					{...{
						editGear,
						removeGear,
						createGear,
						editWeapon,
						removeWeapon,
						createWeapon,
						editArmor,
						removeArmor,
						createArmor,
						selectGear: (detail) => (details = { component: 'gear-info', ...detail }),
						selectArmor: (detail) => (details = { component: 'armor-info', ...detail })
					}}
				/>
			{/if}

			{#if tab === 'rapport'}
				<RapportSection
					bind:character={$character}
					{...{ setRapport, removeRapport, createRapport }}
				/>
			{/if}
		</div>
	</div>
	<div class="relative flex flex-col z-50">
		<div
			id="details"
			class={classnames(
				'fixed flex flex-col top-0 right-0 pl-[72px] lg:pl-[96px] p-2 bg-pattern h-screen border-r shadow-lg shadow-slate-400 transition-all duration-[250ms] ease-out',
				{
					'w-full md:w-3/4 lg:w-2/3 max-w-[600px]': details,
					'left-full': !details
				}
			)}
			aria-expanded={details ? 'true' : false}
			use:clickOutside={() => (details = null)}
		>
			{#if details}
				<button
					class="relative flex flex-row items-center px-2 lg:px-4 h-11 ml-auto border-r-4 border-transparent hover:border-gray-800"
					on:click|preventDefault={() => (details = null)}
					aria-label="details"
					aria-controls="details"
				>
					<span
						class={classnames(
							'w-11 h-11 ml-auto inline-flex justify-center items-center transition-all duration-[250ms] ease-out',
							{
								'rotate-90': details !== null,
								'-rotate-90': details === null
							}
						)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</span>
				</button>
				{#if details.component === 'gear-info'}
					<GearInfo bind:character={$character} gear={details.piece} index={details.index} />
				{/if}
				{#if details.component === 'gear-info'}
					<GearInfo bind:character={$character} gear={details.piece} index={details.index} />
				{/if}
			{/if}
		</div>
	</div>
{/if}

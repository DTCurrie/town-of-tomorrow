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
		createRapport,
		createWeapon,
		editArmor,
		editWeapon,
		removeArmor,
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

	export let data: PageData & { id: number };

	let tab: 'info' | 'play-cards' | 'gear' | 'rapport' = 'info';

	$: character = liveQuery(async () => {
		return browser ? await db.characters.get({ id: data.id }) : undefined;
	}) as Observable<Character | undefined>;
</script>

{#if $character}
	<h1 class="md:text-2xl font-bold">{$character.name}</h1>

	<ul class="relative flex text-sm font-medium text-center border-b border-black mt-2 lg:hidden">
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
		<li class={classNames('relative max-md:-translate-x-4 md:-left-1', tab === 'gear' && 'z-10')}>
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
			class={classNames('relative max-md:-translate-x-5 md:-left-1', tab === 'rapport' && 'z-10')}
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

	<!-- mobile -->
	<div class="lg:hidden">
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
				{...{ editWeapon, removeWeapon, createWeapon, editArmor, removeArmor, createArmor }}
			/>
		{/if}

		{#if tab === 'rapport'}
			<RapportSection
				bind:character={$character}
				{...{ setRapport, removeRapport, createRapport }}
			/>
		{/if}
	</div>

	<!-- desktop -->
	<div class="max-lg:hidden">
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

		<PlayCardsSection
			bind:character={$character}
			{...{ setUnlocked, setMerits, setFaults, addPlayCard, removePlayCard }}
		/>

		<GearSection
			bind:character={$character}
			{...{ editWeapon, removeWeapon, createWeapon, editArmor, removeArmor, createArmor }}
		/>

		<RapportSection bind:character={$character} {...{ setRapport, removeRapport, createRapport }} />
	</div>
{/if}

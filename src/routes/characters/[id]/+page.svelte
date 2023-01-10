<script lang="ts">
	import { browser } from '$app/environment';
	import type { PageData } from './$types';
	import {
		db,
		type Armor,
		type Character,
		type Fault,
		type Merit,
		type PlayCard,
		type Rapport,
		type Unlockable,
		type Weapon,
		type Xp
	} from '$lib/db';
	import { log } from '$lib/logs';
	import { liveQuery, type Observable } from 'dexie';
	import classNames from 'classnames';
	import InfoSection from './InfoSection.svelte';
	import PlayCardsSection from './PlayCardsSection.svelte';
	import GearSection from './GearSection.svelte';
	import RapportSection from './RapportSection.svelte';

	export let data: PageData;

	let tab: 'info' | 'play-cards' | 'gear' | 'rapport' = 'info';

	$: character = liveQuery(async () => {
		return browser ? await db.characters.get({ id: data.id }) : undefined;
	}) as Observable<Character | undefined>;

	export const editCharacter = async (next?: Character) => {
		log('characters/id editCharacter', false, { next });
		try {
			await db.characters.update(data.id, { ...next });
		} catch (error) {
			console.error('error updating character', { toUpdate: next, error });
		}
	};

	const setDescription = async (character: Character | undefined, description: string) => {
		log('characters/id setDescription', false, { character, description });
		if (!character) {
			return;
		}

		const trimmed = description.trim();
		const next = { ...character, description: trimmed };
		await editCharacter(next);
	};

	const setPitfall = async (character: Character | undefined, pitfall: string) => {
		log('characters/id setPitfall', false, { character, pitfall });
		if (!character) {
			return;
		}

		const trimmed = pitfall.trim();
		const next = { ...character, pitfall: trimmed };
		await editCharacter(next);
	};

	const setCustomPitfall = async (character: Character | undefined, pitfall: string) => {
		log('characters/id setPitfall', false, { character, pitfall });
		if (!character) {
			return;
		}

		const trimmed = pitfall.trim();
		const next = { ...character, customPitfall: trimmed };
		await editCharacter(next);
	};

	const setDamage = async (character: Character | undefined, damage: number) => {
		log('characters/id setDamage', false, { character, damage });
		if (!character) {
			return;
		}

		const next = { ...character, damage: character.damage === damage ? damage - 1 : damage };

		await editCharacter(next);
	};

	const setCritical = async (character: Character | undefined, value: boolean) => {
		log('characters/id setCritical', false, { character, value });
		if (!character) {
			return;
		}

		const next = { ...character, critical: value };

		await editCharacter(next);
	};

	const setDead = async (character: Character | undefined, value: boolean) => {
		log('characters/id setDead', false, { character, value });
		if (!character) {
			return;
		}

		const next = { ...character, dead: value };

		await editCharacter(next);
	};

	const setXp = async (character: Character | undefined, xp: Xp) => {
		log('characters/id setXp', false, { character, xp });
		if (!character) {
			return;
		}

		const next = { ...character, xp: (character.xp === xp ? xp - 1 : xp) as Xp };

		await editCharacter(next);
	};

	const setNotes = async (character: Character | undefined, notes: string) => {
		log('characters/id setNotes', false, { character, notes });
		if (!character) {
			return;
		}

		const trimmed = notes.trim();
		const next = { ...character, notes: trimmed };
		await editCharacter(next);
	};

	const setUnlocked = async (character: Character | undefined, unlockable: Unlockable) => {
		log('characters/id setUnlocked', false, { character, unlockable });
		if (!character) {
			return;
		}

		const next = { ...character };

		for (let i = 0; i < next.playCards.length; i++) {
			const card = next.playCards[i];

			if (!card) {
				continue;
			}

			for (let j = 0; j < card?.unlockables.length; j++) {
				const element = card.unlockables[j];

				if (element?.name === unlockable?.name) {
					element.unlocked = !element.unlocked;
					card.unlockables[j] = element;
					next.playCards[i] = card;
					await editCharacter(next);
					return;
				}
			}
		}
	};

	const addPlayCard = async (
		character: Character | undefined,
		playCard: PlayCard | null,
		index: number
	) => {
		log('characters/id addPlayCard', false, { character, playCard, index });
		if (!character) {
			return;
		}

		const next = { ...character };

		next.playCards[index] = playCard;
		await editCharacter(next);
	};

	const removePlayCard = async (character: Character | undefined, playCardName: string) => {
		log('characters/id addPlayCard', false, { character, playCardName });
		if (!character) {
			return;
		}

		const next = { ...character };
		const index = next.playCards.findIndex((card) => card?.name === playCardName);

		if (index === -1) {
			return;
		}

		next.playCards[index] = null;
		await editCharacter(next);
	};

	const setMerits = async (character: Character | undefined, playCard: number, value: Merit) => {
		log('characters/id setMerits', false, { character, playCard, value });
		if (!character || !character.playCards[playCard]) {
			return;
		}

		const next = { ...character };
		const merits = next.playCards[playCard]!.merits ?? 0;

		next.playCards[playCard]!.merits = (merits === value ? value - 1 : value) as Merit;
		await editCharacter(next);
	};

	const setFaults = async (character: Character | undefined, playCard: number, value: Fault) => {
		log('characters/id setFaults', false, { character, playCard, value });
		if (!character || !character.playCards[playCard]) {
			return;
		}

		const next = { ...character };
		const faults = next.playCards[playCard]!.faults ?? 0;

		next.playCards[playCard]!.faults = (faults === value ? value - 1 : value) as Fault;
		await editCharacter(next);
	};

	const createWeapon = async (character: Character | undefined, weapon: Weapon) => {
		log('characters/id createWeapon', false, { character, weapon });
		if (!character) {
			return;
		}

		const next = { ...character, weapons: [...character.weapons, weapon] };

		await editCharacter(next);
	};

	const editWeapon = async (character: Character | undefined, weapon: Weapon, index: number) => {
		log('characters/id editWeapon', false, { character, weapon, index });
		if (!character) {
			return;
		}

		const next = { ...character };
		next.weapons[index] = weapon;

		await editCharacter(next);
	};

	const removeWeapon = async (character: Character | undefined, index: number) => {
		log('characters/id removeWeapon', false, { character, index });
		if (!character) {
			return;
		}

		const next = { ...character };
		next.weapons.splice(index, 1);

		await editCharacter(next);
	};

	const createArmor = async (character: Character | undefined, armor: Armor) => {
		log('characters/id createArmor', false, { character, armor });
		if (!character) {
			return;
		}

		const next = { ...character, armor: [...character.armor, armor] };

		await editCharacter(next);
	};

	const editArmor = async (character: Character | undefined, piece: Armor, index: number) => {
		log('characters/id editArmor', false, { character, piece, index });
		if (!character) {
			return;
		}

		const next = { ...character };
		next.armor[index] = piece;

		await editCharacter(next);
	};

	const removeArmor = async (character: Character | undefined, index: number) => {
		log('characters/id removeArmor', false, { character, index });
		if (!character) {
			return;
		}

		const next = { ...character };
		next.armor.splice(index, 1);

		await editCharacter(next);
	};

	const setRapport = async (character: Character | undefined, rapport: Rapport) => {
		log('characters/id setRapport', false, { character, rapport });
		if (!character) {
			return;
		}

		const next = { ...character };
		const index = next.rapport.findIndex(({ name }) => name === rapport.name);

		if (index === -1) {
			return;
		}

		next.rapport[index] = rapport;
		await editCharacter(next);
	};

	const createRapport = async (character: Character | undefined, rapport: Rapport) => {
		log('characters/id createRapport', false, { character, rapport });
		if (!character) {
			return;
		}

		const next = { ...character, rapport: [...character.rapport, rapport] };

		await editCharacter(next);
	};

	const removeRapport = async (character: Character | undefined, index: number) => {
		log('characters/id removeRapport', false, { character, index });
		if (!character) {
			return;
		}

		const next = { ...character };
		next.rapport.splice(index, 1);

		await editCharacter(next);
	};
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

import {
	type Character,
	db,
	type Xp,
	type Unlockable,
	type PlayCard,
	type Merit,
	type Fault,
	type Weapon,
	type Armor,
	type Rapport,
	type PlayCardIndex,
	type PlayCards
} from '$lib/db';
import { error, log } from '$lib/logs';

export const editCharacter = async (id: number, next?: Partial<Character>) => {
	log('api editCharacter', false, { id, next });
	try {
		await db.characters.update(id, { ...next });
	} catch (error) {
		console.error('error updating character', { toUpdate: next, error });
	}
};

export const setDescription = async (character: Character | undefined, description: string) => {
	log('api setDescription', false, { character, description });
	if (!character || !character.id) {
		error('api setDescription invalid character', false, { character });
		return;
	}

	const trimmed = description.trim();
	const next = { description: trimmed };
	await editCharacter(character.id, next);
};

export const setPitfall = async (character: Character | undefined, pitfall: string) => {
	log('api setPitfall', false, { character, pitfall });
	if (!character || !character.id) {
		error('api setPitfall invalid character', false, { character });
		return;
	}

	const trimmed = pitfall.trim();
	const next = { pitfall: trimmed };
	await editCharacter(character.id, next);
};

export const setCustomPitfall = async (character: Character | undefined, pitfall: string) => {
	log('api setCustomPitfall', false, { character, pitfall });
	if (!character || !character.id) {
		error('api setCustomPitfall invalid character', false, { character });
		return;
	}

	const trimmed = pitfall.trim();
	const next = { customPitfall: trimmed };
	await editCharacter(character.id, next);
};

export const setDamage = async (character: Character | undefined, damage: number) => {
	log('api setDamage', false, { character, damage });
	if (!character || !character.id) {
		error('api setDamage invalid character', false, { character });
		return;
	}

	const next = { damage: character.damage === damage ? damage - 1 : damage };

	await editCharacter(character.id, next);
};

export const setCritical = async (character: Character | undefined, value: boolean) => {
	log('api setCritical', false, { character, value });
	if (!character || !character.id) {
		error('api setCritical invalid character', false, { character });
		return;
	}

	const next = { critical: value };

	await editCharacter(character.id, next);
};

export const setDead = async (character: Character | undefined, value: boolean) => {
	log('api setDead', false, { character, value });
	if (!character || !character.id) {
		error('api setDead invalid character', false, { character });
		return;
	}

	const next = { dead: value };

	await editCharacter(character.id, next);
};

export const setXp = async (character: Character | undefined, xp: Xp) => {
	log('api setXp', false, { character, xp });
	if (!character || !character.id) {
		error('api setXp invalid character', false, { character });
		return;
	}

	const next = { xp: (character.xp === xp ? xp - 1 : xp) as Xp };

	await editCharacter(character.id, next);
};

export const setNotes = async (character: Character | undefined, notes: string) => {
	log('api setNotes', false, { character, notes });
	if (!character || !character.id) {
		error('api setNotes invalid character', false, { character });
		return;
	}

	const trimmed = notes.trim();
	const next = { notes: trimmed };
	await editCharacter(character.id, next);
};

export const setUnlocked = async (character: Character | undefined, unlockable: Unlockable) => {
	log('api setUnlocked', false, { character, unlockable });
	if (!character || !character.id) {
		error('api setUnlocked invalid character', false, { character });
		return;
	}

	const next: Pick<Character, 'playCards'> = { playCards: [...character.playCards] as PlayCards };

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
				await editCharacter(character.id, next);
				return;
			}
		}
	}
};

export const addPlayCard = async (
	character: Character | undefined,
	playCard: PlayCard | null,
	index: number
) => {
	log('api addPlayCard', false, { character, playCard, index });
	if (!character || !character.id) {
		error('api addPlayCard invalid character', false, { character });
		return;
	}

	const next: Pick<Character, 'playCards'> = { playCards: character.playCards };

	next.playCards[index] = playCard;
	await editCharacter(character.id, next);
};

export const removePlayCard = async (character: Character | undefined, playCardName: string) => {
	log('api removePlayCard', false, { character, playCardName });
	if (!character || !character.id) {
		error('api removePlayCard invalid character', false, { character });
		return;
	}

	const next: Pick<Character, 'playCards'> = { playCards: character.playCards };
	const index = next.playCards.findIndex((card) => card?.name === playCardName);

	if (index === -1) {
		error('api removePlayCard invalid play card name', false, { character, playCardName });
		return;
	}

	next.playCards[index] = null;
	await editCharacter(character.id, next);
};

export const setMerits = async (
	character: Character | undefined,
	playCard: PlayCardIndex,
	value: Merit
) => {
	log('api setMerits', false, { character, playCard, value });
	if (!character || !character.id) {
		error('api setMerits invalid character', false, { character });
		return;
	}

	if (!character.playCards[playCard]) {
		error('api setMerits invalid play card index', false, { character, playCard });
		return;
	}

	const next: Pick<Character, 'playCards'> = { playCards: character.playCards };
	const merits = ((next.playCards[playCard]?.merits ?? 0) === value ? value - 1 : value) as Merit;

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	next.playCards[playCard]!.merits = merits;
	await editCharacter(character.id, next);
};

export const setFaults = async (
	character: Character | undefined,
	playCard: number,
	value: Fault
) => {
	log('api setFaults', false, { character, playCard, value });
	if (!character || !character.id) {
		error('api setFaults invalid character', false, { character });
		return;
	}

	if (!character.playCards[playCard]) {
		error('api setFaults invalid play card index', false, { character, playCard });
		return;
	}

	const next: Pick<Character, 'playCards'> = { playCards: character.playCards };
	const faults = ((next.playCards[playCard]?.faults ?? 0) === value ? value - 1 : value) as Fault;

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	next.playCards[playCard]!.faults = faults;
	await editCharacter(character.id, next);
};

export const createWeapon = async (character: Character | undefined, weapon: Weapon) => {
	log('api createWeapon', false, { character, weapon });
	if (!character || !character.id) {
		error('api createWeapon invalid character', false, { character });
		return;
	}

	const next = { weapons: [...character.weapons, weapon] };

	await editCharacter(character.id, next);
};

export const editWeapon = async (
	character: Character | undefined,
	weapon: Weapon,
	index: number
) => {
	log('api editWeapon', false, { character, weapon, index });
	if (!character || !character.id) {
		error('api editWeapon invalid character', false, { character });
		return;
	}

	const next = { weapons: [...character.weapons] };
	next.weapons[index] = weapon;

	await editCharacter(character.id, next);
};

export const removeWeapon = async (character: Character | undefined, index: number) => {
	log('api removeWeapon', false, { character, index });
	if (!character || !character.id) {
		error('api removeWeapon invalid character', false, { character });
		return;
	}

	const next = { weapons: [...character.weapons] };
	next.weapons.splice(index, 1);

	await editCharacter(character.id, next);
};

export const createArmor = async (character: Character | undefined, armor: Armor) => {
	log('api createArmor', false, { character, armor });
	if (!character || !character.id) {
		error('api createArmor invalid character', false, { character });
		return;
	}

	const next = { armor: [...character.armor, armor] };

	await editCharacter(character.id, next);
};

export const editArmor = async (character: Character | undefined, piece: Armor, index: number) => {
	log('api editArmor', false, { character, piece, index });
	if (!character || !character.id) {
		error('api editArmor invalid character', false, { character });
		return;
	}

	const next = { armor: [...character.armor] };
	next.armor[index] = piece;

	await editCharacter(character.id, next);
};

export const removeArmor = async (character: Character | undefined, index: number) => {
	log('api removeArmor', false, { character, index });
	if (!character || !character.id) {
		error('api removeArmor invalid character', false, { character });
		return;
	}

	const next = { armor: [...character.armor] };
	next.armor.splice(index, 1);

	await editCharacter(character.id, next);
};

export const createGear = async (character: Character | undefined, gear: Armor) => {
	log('api createGear', false, { character, gear });
	if (!character || !character.id) {
		error('api createGear invalid character', false, { character });
		return;
	}

	const next = { gear: [...character.gear, gear] };

	await editCharacter(character.id, next);
};

export const editGear = async (character: Character | undefined, piece: Armor, index: number) => {
	log('api editGear', false, { character, piece, index });
	if (!character || !character.id) {
		error('api editGear invalid character', false, { character });
		return;
	}

	const next = { gear: [...character.gear] };
	next.gear[index] = piece;

	await editCharacter(character.id, next);
};

export const removeGear = async (character: Character | undefined, index: number) => {
	log('api removeGear', false, { character, index });
	if (!character || !character.id) {
		error('api removeGear invalid character', false, { character });
		return;
	}

	const next = { gear: [...character.gear] };
	next.gear.splice(index, 1);

	await editCharacter(character.id, next);
};

export const setRapport = async (character: Character | undefined, rapport: Rapport) => {
	log('api setRapport', false, { character, rapport });
	if (!character || !character.id) {
		error('api setRapport invalid character', false, { character });
		return;
	}

	const next = { rapport: [...character.rapport] };
	const index = next.rapport.findIndex(({ name }) => name === rapport.name);

	if (index === -1) {
		error('api setRapport invalid rapport name', false, { character, rapport });
		return;
	}

	next.rapport[index] = rapport;
	await editCharacter(character.id, next);
};

export const createRapport = async (character: Character | undefined, rapport: Rapport) => {
	log('api createRapport', false, { character, rapport });
	if (!character || !character.id) {
		error('api setDescription invalid character', false, { character });
		return;
	}

	const next = { rapport: [...character.rapport, rapport] };

	await editCharacter(character.id, next);
};

export const removeRapport = async (character: Character | undefined, index: number) => {
	log('api removeRapport', false, { character, index });
	if (!character || !character.id) {
		error('api setDescription invalid character', false, { character });
		return;
	}

	const next = { rapport: [...character.rapport] };
	next.rapport.splice(index, 1);

	await editCharacter(character.id, next);
};

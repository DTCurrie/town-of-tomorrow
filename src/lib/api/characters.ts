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
    type PlayCards,
    type Gear
} from '$lib/db';
import { error, log } from '$lib/logs';
import { isValidIndex } from '$lib/play-cards';

export const createCharacter = async (character: Character) => {
    log('api/characters createCharacter', false, { character });

    try {
        return await db.characters.add(character);
    } catch (error) {
        console.error('error creating character', { character, error });
        return -1;
    }
}

export const updateCharacter = async (id: number, next?: Partial<Character>) => {
    log('api/characters updateCharacter', false, { id, next });
    try {
        return await db.characters.update(id, { ...next });
    } catch (error) {
        console.error('error updating character', { next, error });
        return -1;
    }
};

export const updateDescription = async (character: Character | undefined, description: string) => {
    log('api/characters updateDescription', false, { character, description });
    if (!character || !character.id) {
        error('api/characters updateDescription invalid character', false, { character });
        return;
    }

    const trimmed = description.trim();
    const next = { description: trimmed };
    return await updateCharacter(character.id, next);
};

export const updatePitfall = async (character: Character | undefined, pitfall: string) => {
    log('api/characters updatePitfall', false, { character, pitfall });
    if (!character || !character.id) {
        error('api/characters updatePitfall invalid character', false, { character });
        return;
    }

    const trimmed = pitfall.trim();
    const next = { pitfall: trimmed };
    return await updateCharacter(character.id, next);
};

export const updateDamage = async (character: Character | undefined, damage: number) => {
    log('api/characters updateDamage', false, { character, damage });
    if (!character || !character.id) {
        error('api/characters updateDamage invalid character', false, { character });
        return;
    }

    const next = { damage: character.damage === damage ? damage - 1 : damage };

    return await updateCharacter(character.id, next);
};

export const updateCritical = async (character: Character | undefined, value: boolean) => {
    log('api/characters updateCritical', false, { character, value });
    if (!character || !character.id) {
        error('api/characters updateCritical invalid character', false, { character });
        return;
    }

    const next = { critical: value };

    return await updateCharacter(character.id, next);
};

export const updateDead = async (character: Character | undefined, value: boolean) => {
    log('api/characters updateDead', false, { character, value });
    if (!character || !character.id) {
        error('api/characters updateDead invalid character', false, { character });
        return;
    }

    const next = { dead: value };

    return await updateCharacter(character.id, next);
};

export const updateXp = async (character: Character | undefined, xp: Xp) => {
    log('api/characters updateXp', false, { character, xp });
    if (!character || !character.id) {
        error('api/characters updateXp invalid character', false, { character });
        return;
    }

    const next = { xp: (character.xp === xp ? xp - 1 : xp) as Xp };

    return await updateCharacter(character.id, next);
};

export const updateNotes = async (character: Character | undefined, notes: string) => {
    log('api/characters updateNotes', false, { character, notes });
    if (!character || !character.id) {
        error('api/characters updateNotes invalid character', false, { character });
        return;
    }

    const trimmed = notes.trim();
    const next = { notes: trimmed };
    return await updateCharacter(character.id, next);
};

export const updatePlayCard = async (
    character: Character | undefined,
    playCard: PlayCard | null,
    playCardIndex: PlayCardIndex
) => {
    log('api/characters updatePlayCard', false, { character, playCard, index: playCardIndex });
    if (!character || !character.id) {
        error('api/characters updatePlayCard invalid character', false, { character });
        return;
    }

    const next: Pick<Character, 'playCards'> = { playCards: character.playCards };

    next.playCards[playCardIndex] = playCard;
    return await updateCharacter(character.id, next);
};

export const removePlayCard = async (character: Character | undefined, playCardIndex: PlayCardIndex | undefined) => {
    log('api/characters removePlayCard', false, { character, playCardIndex });
    if (!character || !character.id) {
        error('api/characters removePlayCard invalid character', false, { character });
        return;
    }

    if (playCardIndex === undefined || !isValidIndex(playCardIndex)) {
        error('api/characters removePlayCard invalid play card index', false, { character, playCardIndex });
        return
    }

    const next: Pick<Character, 'playCards'> = { playCards: character.playCards };

    if (!next.playCards[playCardIndex]) {
        error('api/characters removePlayCard invalid play card index', false, { character, playCardIndex });
        return;
    }

    next.playCards[playCardIndex] = null;
    return await updateCharacter(character.id, next);
};

export const updateUnlocked = async (
    character: Character | undefined,
    playCardIndex: PlayCardIndex | undefined,
    unlockable: Unlockable,
    unlockableIndex: number
) => {
    log('api/characters updateUnlocked', false, { character, unlockable });
    if (!character || !character.id) {
        error('api/characters updateUnlocked invalid character', false, { character });
        return;
    }

    if (playCardIndex === undefined || !isValidIndex(playCardIndex)) {
        error('api/characters updateUnlocked invalid play card index', false, { character, playCardIndex });
        return
    }

    const next: Pick<Character, 'playCards'> = { playCards: [...character.playCards] as PlayCards };
    const playCard = next.playCards[playCardIndex];

    if (!playCard) {
        error('api/characters updateUnlocked invalid play card index', false, { character, playCardIndex });
        return;
    }

    unlockable.unlocked = !unlockable.unlocked;
    playCard.unlockables[unlockableIndex] = unlockable
    next.playCards[playCardIndex] = playCard;

    return await updateCharacter(character.id, next);
};

export const updateMerits = async (
    character: Character | undefined,
    playCardIndex: PlayCardIndex | undefined,
    value: Merit
) => {
    log('api/characters updateMerits', false, { character, playCardIndex, value });
    if (!character || !character.id) {
        error('api/characters updateMerits invalid character', false, { character });
        return;
    }

    if (playCardIndex === undefined || !isValidIndex(playCardIndex)) {
        error('api/characters updateMerits invalid play card index', false, { character, playCardIndex });
        return
    }

    const next: Pick<Character, 'playCards'> = { playCards: character.playCards };
    const playCard = next.playCards[playCardIndex];

    if (!playCard) {
        error('api/characters updateMerits invalid play card index', false, { character, playCard: playCardIndex });
        return;
    }

    playCard.merits = (playCard.merits === value ? value - 1 : value) as Merit;
    next.playCards[playCardIndex] = playCard;
    return await updateCharacter(character.id, next);
};

export const updateFaults = async (
    character: Character | undefined,
    playCardIndex: PlayCardIndex | undefined,
    value: Fault
) => {
    log('api/characters updateFaults', false, { character, playCard: playCardIndex, value });
    if (!character || !character.id) {
        error('api/characters updateFaults invalid character', false, { character });
        return;
    }

    if (playCardIndex === undefined || !isValidIndex(playCardIndex)) {
        error('api/characters updateFaults invalid play card index', false, { character, playCardIndex });
        return
    }

    const next: Pick<Character, 'playCards'> = { playCards: character.playCards };
    const playCard = next.playCards[playCardIndex];

    if (!playCard) {
        error('api/characters updateFaults invalid play card index', false, { character, playCard: playCardIndex });
        return;
    }


    playCard.faults = (playCard.faults === value ? value - 1 : value) as Fault;
    next.playCards[playCardIndex] = playCard;
    return await updateCharacter(character.id, next);
};

export const createWeapon = async (character: Character | undefined, weapon: Weapon) => {
    log('api/characters createWeapon', false, { character, weapon });
    if (!character || !character.id) {
        error('api/characters createWeapon invalid character', false, { character });
        return;
    }

    const next = { weapons: [...character.weapons, weapon] };

    return await updateCharacter(character.id, next);
};

export const updateWeapon = async (
    character: Character | undefined,
    weapon: Weapon,
    weaponIndex: number
) => {
    log('api/characters updateWeapon', false, { character, weapon, index: weaponIndex });
    if (!character || !character.id) {
        error('api/characters updateWeapon invalid character', false, { character });
        return;
    }

    const next = { weapons: [...character.weapons] };
    next.weapons[weaponIndex] = weapon;

    return await updateCharacter(character.id, next);
};

export const removeWeapon = async (character: Character | undefined, weaponIndex: number) => {
    log('api/characters removeWeapon', false, { character, index: weaponIndex });
    if (!character || !character.id) {
        error('api/characters removeWeapon invalid character', false, { character });
        return;
    }

    const next = { weapons: [...character.weapons] };
    next.weapons.splice(weaponIndex, 1);

    return await updateCharacter(character.id, next);
};

export const createArmor = async (character: Character | undefined, armor: Armor) => {
    log('api/characters createArmor', false, { character, armor });
    if (!character || !character.id) {
        error('api/characters createArmor invalid character', false, { character });
        return;
    }

    const next = { armor: [...character.armor, armor] };

    return await updateCharacter(character.id, next);
};

export const updateArmor = async (character: Character | undefined, piece: Armor, armorIndex: number) => {
    log('api/characters updateArmor', false, { character, piece, index: armorIndex });
    if (!character || !character.id) {
        error('api/characters updateArmor invalid character', false, { character });
        return;
    }

    const next = { armor: [...character.armor] };
    next.armor[armorIndex] = piece;

    return await updateCharacter(character.id, next);
};

export const removeArmor = async (character: Character | undefined, armorIndex: number) => {
    log('api/characters removeArmor', false, { character, index: armorIndex });
    if (!character || !character.id) {
        error('api/characters removeArmor invalid character', false, { character });
        return;
    }

    const next = { armor: [...character.armor] };
    next.armor.splice(armorIndex, 1);

    return await updateCharacter(character.id, next);
};

export const createGear = async (character: Character | undefined, gear: Armor) => {
    log('api/characters createGear', false, { character, gear });
    if (!character || !character.id) {
        error('api/characters createGear invalid character', false, { character });
        return;
    }

    const next = { gear: [...character.gear, gear] };

    return await updateCharacter(character.id, next);
};

export const updateGear = async (character: Character | undefined, piece: Gear, gearIndex: number) => {
    log('api/characters updateGear', false, { character, piece, index: gearIndex });
    if (!character || !character.id) {
        error('api/characters updateGear invalid character', false, { character });
        return;
    }

    const next = { gear: [...character.gear] };
    next.gear[gearIndex] = piece;

    return await updateCharacter(character.id, next);
};

export const removeGear = async (character: Character | undefined, gearIndex: number) => {
    log('api/characters removeGear', false, { character, index: gearIndex });
    if (!character || !character.id) {
        error('api/characters removeGear invalid character', false, { character });
        return;
    }

    const next = { gear: [...character.gear] };
    next.gear.splice(gearIndex, 1);

    return await updateCharacter(character.id, next);
};

export const updateRapport = async (character: Character | undefined, rapport: Rapport, rapportIndex: number) => {
    log('api/characters updateRapport', false, { character, rapport });
    if (!character || !character.id) {
        error('api/characters updateRapport invalid character', false, { character });
        return;
    }

    const next = { rapport: [...character.rapport] };

    if (rapportIndex === -1) {
        error('api/characters updateRapport invalid rapport index', false, { character, rapport });
        return;
    }

    next.rapport[rapportIndex] = rapport;
    return await updateCharacter(character.id, next);
};

export const createRapport = async (character: Character | undefined, rapport: Rapport) => {
    log('api/characters createRapport', false, { character, rapport });
    if (!character || !character.id) {
        error('api/characters updateDescription invalid character', false, { character });
        return;
    }

    const next = { rapport: [...character.rapport, rapport] };

    return await updateCharacter(character.id, next);
};

export const removeRapport = async (character: Character | undefined, rapportIndex: number) => {
    log('api/characters removeRapport', false, { character, index: rapportIndex });
    if (!character || !character.id) {
        error('api/characters updateDescription invalid character', false, { character });
        return;
    }

    const next = { rapport: [...character.rapport] };
    next.rapport.splice(rapportIndex, 1);

    return await updateCharacter(character.id, next);
};
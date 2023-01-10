import Dexie, { type Table } from 'dexie';

export type JobType = 'Detective' | 'Liaison' | 'Specialist' | 'Hot Shot' | 'Sage';

export interface Job {
	name: JobType;
	health: number;
}

export type bonuses = [string, string, string];

export interface Unlockable {
	name: string;
	description: string;
	unlocked: boolean;
}

export type Merit = 0 | 1 | 2 | 3;
export type Fault = 0 | 1 | 2 | 3;

export interface PlayCard {
	name: string;
	job: Job;
	bonuses: bonuses;
	pitfall: string;
	unlockables: [Unlockable, Unlockable];
	merits?: Merit;
	faults?: Fault;
}

export type PlayCardIndex = 0 | 1 | 2 | 3;
export type PlayCards = [PlayCard | null, PlayCard | null, PlayCard | null, PlayCard | null] &
	Record<PlayCardIndex, PlayCard | null>;

export type RapportValue = -3 | -2 | -1 | 0 | 1 | 2 | 3;
export interface Rapport {
	name: string;
	value: RapportValue;
	overflow: boolean;
}

export interface Gear {
	name: string;
	rating: number;
	description: string;
}

export type WeaponType = 'Unarmed' | 'Light' | 'Medium' | 'Heavy';
export const weaponTypes = ['Unarmed', 'Light', 'Medium', 'Heavy'];

export interface Weapon extends Gear {
	type: WeaponType;
}

export type ArmorType = 'Clothing' | 'Light' | 'Medium' | 'Heavy' | 'Hazard';
export const armorTypes = ['Clothing', 'Light', 'Medium', 'Heavy', 'Hazard'];

export interface Armor extends Gear {
	type: ArmorType;
}

export type Xp = 0 | 1 | 2 | 3 | 4 | 5;

export interface Character {
	id?: number;
	name: string;
	description: string;
	pitfall: string;
	customPitfall: string;
	playCards: PlayCards;
	avatar?: string;
	createdOn: Date;
	damage: number;
	critical?: boolean;
	dead?: boolean;
	rapport: Rapport[];
	fieldOfStudy?: string;
	weapons: Weapon[];
	armor: Armor[];
	xp: Xp;
	notes: string;
}

export class MySubClassedDexie extends Dexie {
	characters!: Table<Character>;

	constructor() {
		super('town-of-tomorrow');
		this.version(1).stores({
			characters: '++id, name, description' // Primary key and indexed props
		});
	}
}

export const db = new MySubClassedDexie();

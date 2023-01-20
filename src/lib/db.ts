import { browser } from '$app/environment';
import { generateCharacter } from '$lib/generate';
import Dexie, { type Table } from 'dexie';

import { error } from '$lib/logs';

export type JobType = 'Detective' | 'Liaison' | 'Specialist' | 'Hot Shot' | 'Sage';
export type JobHealth = 1 | 2 | 3;

export interface Job {
	name: JobType;
	health: JobHealth;
}

export type Bonuses = [
	string, // max-length 25
	string, // max-length 25
	string // max-length 25
];

export interface Unlockable {
	name: string; // max-length of 30
	description: string; // max-length of 240
	unlocked: boolean;
}

export type Unlockables = [Unlockable, Unlockable];

export type Merit = 0 | 1 | 2 | 3;
export type Fault = 0 | 1 | 2 | 3;

export interface PlayCard {
	id?: number;
	name: string; // max-length 25
	job: Job;
	bonuses: Bonuses;
	bonusQuestions: [string, string, string]; // max-length 240
	bonusExamples: [string, string, string]; // max-length 80
	unlockables: Unlockables;
	merits?: Merit;
	faults?: Fault;
}

export type PlayCardIndex = 0 | 1 | 2 | 3;
export type PlayCards = [PlayCard | undefined, PlayCard | undefined, PlayCard | undefined, PlayCard | undefined] &
	Record<PlayCardIndex, PlayCard | undefined>;

export type RapportValue = -3 | -2 | -1 | 0 | 1 | 2 | 3;
export interface Rapport {
	name: string; // max-length 25
	description: string; // max-length 
	value: RapportValue;
	overflow: boolean;
}

export interface Gear {
	name: string; // max-length 25
	description: string; // max-length 240
	rating?: number; // min 0
}

export type Weapon = Gear;
export type Armor = Gear;

export type Xp = 0 | 1 | 2 | 3 | 4 | 5;

export interface Character {
	id?: number;
	name: string; // max-length 25
	description: string; // max-length 240
	pitfall: string; // max-length 240, point-of-view second person
	playCards: PlayCards;
	avatar?: string; // max-length 480
	createdOn: Date;
	damage: number;
	critical?: boolean;
	dead?: boolean;
	rapport: Rapport[];
	fieldOfStudy?: string; // max-length 25
	gear: Gear[];
	weapons: Weapon[];
	armor: Armor[];
	xp: Xp;
	notes: string; // max-length 10000
}

export class MySubClassedDexie extends Dexie {
	characters!: Table<Character>;
	customPlayCards!: Table<PlayCard>;

	constructor() {
		super('town-of-tomorrow');
		this.version(1).stores({
			characters: '++id, name, description', // Primary key and indexed props
			customPlayCards: '++id, name' // Primary key and indexed props
		});
	}
}

export const db = new MySubClassedDexie();

if (import.meta.env.DEV) {
	(async () => {
		try {
			const characters = browser ? await db.characters.toArray() : [];
			if (!characters.length) {
				await db.characters.bulkAdd([
					generateCharacter(),
					generateCharacter(),
					generateCharacter()
				]);
			}
		} catch (err) {
			error('error generating characters', false, err);
		}
	})();
}

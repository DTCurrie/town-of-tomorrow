import Dexie, { type Table } from 'dexie';

export interface Job {
	name: string;
	health: number;
}

export type bonuses = [string, string, string];

export interface Unlockable {
	name: string;
	description: string;
	unlocked: boolean;
}

export interface PlayCard {
	name: string;
	job: Job;
	bonuses: bonuses;
	pitfall: string;
	unlockables: [Unlockable, Unlockable];
}

export type PlayCards = [PlayCard | null, PlayCard | null, PlayCard | null, PlayCard | null];

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

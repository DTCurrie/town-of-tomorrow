import type { Gear, PlayCard, Rapport } from '$lib/db';
import type { OtherPlayCards } from '$lib/play-cards';

export type DetailComponent =
	| 'play-card-info'
	| 'play-card-add'
	| 'play-card-create'
	| 'gear-info'
	| 'weapon-info'
	| 'armor-info'
	| 'rapport-info';

export type PlayCardAddData = { others: OtherPlayCards; selected: PlayCard | undefined };
export type DetailType = Gear | Rapport | PlayCard | PlayCardAddData;
export type Details = { data?: DetailType; index: number; component: DetailComponent };

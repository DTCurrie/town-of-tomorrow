import { getColorClass, type Color } from './color';
import type { Job, PlayCard, PlayCards } from './db';
import { detective, hotShot, liaison, sage, specialist } from './jobs';

export const marshal: PlayCard = {
	name: 'Marshal',
	job: detective,
	bonuses: ['Tracking', 'Protection', 'An Offroad Vehicle'],
	pitfall: 'You follow the letter of the law, even when it’s hard to do.',
	unlockables: [
		{
			name: 'Take A Bullet',
			description: 'When you use a Marshal Bonus to Protect Someone, you can Reroll.',
			unlocked: false
		},
		{
			name: 'Marshal’s Intuition',
			description:
				'When you use a Marshal Bonus to Investigate a Scene, you can convert a Miss to a Complicated Success.',
			unlocked: false
		}
	]
};

export const intelligence: PlayCard = {
	name: 'Intelligence',
	job: detective,
	bonuses: ['Espionage', 'Security', 'A Fancy Spy Gadget'],
	pitfall: 'People in the Town have difficulty trusting the “spy.”',
	unlockables: [
		{
			name: 'Sabotage',
			description:
				'When you use an Intelligence Bonus to Cause a Problem, you can convert a Miss to a Complicated Success.',
			unlocked: false
		},
		{
			name: 'Gather Intel',
			description:
				'When you use an Intelligence Bonus to Investigate A Scene, you can add +1 to the Roll.',
			unlocked: false
		}
	]
};

export const investigator: PlayCard = {
	name: 'Investigator',
	job: detective,
	bonuses: ['Investigation', 'Interrogation', 'An All-Purpose Sensor'],
	pitfall: 'You will pursue a good lead, no matter the consequences or danger.',
	unlockables: [
		{
			name: 'And One More Thing',
			description:
				'When you use an Investigator Bonus to Be Convincing, you can add +1 to the Roll.',
			unlocked: false
		},
		{
			name: 'Sherlock',
			description: 'When you use an Investigator Bonus to Investigate A Scene, you can Reroll.',
			unlocked: false
		}
	]
};

export const researcher: PlayCard = {
	name: 'Researcher',
	job: liaison,
	bonuses: ['Research', 'Field Study', 'A Private Lab'],
	pitfall: 'You are a by-the-book academic and never want to break the rules.',
	unlockables: [
		{
			name: 'Still Got It',
			description:
				'When you use a Researcher Bonus to Use Science!, you can convert a Miss to a Complicated Success.',
			unlocked: false
		},
		{
			name: 'Let Me Look It Up',
			description: 'When you use a Researcher Bonus to Be Convincing, you can add +1 to the Roll.',
			unlocked: false
		}
	]
};

export const agent: PlayCard = {
	name: 'Agent',
	job: liaison,
	bonuses: ['Inspection', 'Debate', 'A Standard-Issue Sidearm'],
	pitfall: 'You put up the “red tape” that slows progress at the Establishment.',
	unlockables: [
		{
			name: 'Eye For Detail',
			description: 'When you use an Agent Bonus to Investigate A Scene, you can Reroll.',
			unlocked: false
		},
		{
			name: 'Pull Some Strings',
			description:
				'When you use an Agent Bonus to Be Convincing, you can convert a Miss to a Complicated Success.',
			unlocked: false
		}
	]
};

export const corporate: PlayCard = {
	name: 'Corporate',
	job: liaison,
	bonuses: ['Negotiation', 'Mediation', 'An Executive Assistant'],
	pitfall: 'You judge by “who would buy this” instead of “who does this help.”',
	unlockables: [
		{
			name: 'Scan The Room',
			description:
				'When you use a Corporate Bonus to Read The Room, you can convert a Miss to a Complicated Success.',
			unlocked: false
		},
		{
			name: 'Art of the Deal',
			description: 'When you use a Corporate Bonus to Be Convincing, you can Reroll.',
			unlocked: false
		}
	]
};

export const military: PlayCard = {
	name: 'Military',
	job: specialist,
	bonuses: ['Combat', 'Tactics', 'A Personalized Firearm'],
	pitfall: 'You tend to get caught up with the action and take things too far.',
	unlockables: [
		{
			name: 'Ambusher',
			description: 'When you use a Military Bonus to Set a Trap, you can Reroll.',
			unlocked: false
		},
		{
			name: 'Sharpshooter',
			description:
				'When you use a Military Bonus to Get Your Hands Dirty, you can convert a Miss to a Complicated Success.description: ',
			unlocked: false
		}
	]
};

export const security: PlayCard = {
	name: 'Security',
	job: specialist,
	bonuses: ['Fighting', 'Awareness', 'Threat Assessment Device'],
	pitfall: 'You hope someone swings first so you can enjoy defending yourself.',
	unlockables: [
		{
			name: 'Ocular Assessment',
			description:
				'When you use a Security Bonus to Read the Room, you can convert a Miss to a Complicated Success.',
			unlocked: false
		},
		{
			name: 'Pugilist',
			description:
				'When you use a Security Bonus to Get Your Hands Dirty, you can add +1 to the Roll.',
			unlocked: false
		}
	]
};

export const ordnance: PlayCard = {
	name: 'Ordnance',
	job: specialist,
	bonuses: ['Shooting', 'Piloting', 'A Military Vehicle'],
	pitfall: 'You tend to go overboard with your choice of weapons.',
	unlockables: [
		{
			name: 'Loud And Proud',
			description: 'When you use an Ordnance Bonus to Cause A Problem, you can add +1 to the Roll.',
			unlocked: false
		},
		{
			name: 'Find The Weak Point',
			description: 'When you use an Ordnance Bonus to Get Your Hands Dirty, you can Reroll.',
			unlocked: false
		}
	]
};

export const inventor: PlayCard = {
	name: 'Inventor',
	job: hotShot,
	bonuses: ['Tinkering', 'Problem-Solving', 'A High-Tech Tool'],
	pitfall: 'You let everyone know you’re the best whether or not you are.',
	unlockables: [
		{
			name: 'Hands-On',
			description: 'When you use an Inventor Bonus to Get Your Hands Dirty, you can Reroll.',
			unlocked: false
		},
		{
			name: 'Spark Of Inspiration',
			description: 'When you use an Inventor Bonus to Use Science!, you can add +1 to the Roll.',
			unlocked: false
		}
	]
};

export const analyst: PlayCard = {
	name: 'Analyst',
	job: hotShot,
	bonuses: ['Analysis', 'Prediction', 'A Super-Computer'],
	pitfall: 'You think nothing is worth doing if you can’t do it correctly.',
	unlockables: [
		{
			name: 'Spotting Patterns',
			description: 'When you use an Analyst Bonus to Read The Room, you can add +1 to the Roll.',
			unlocked: false
		},
		{
			name: 'Reliable Model',
			description:
				'When you use an Analyst Bonus to Use Science!, you can convert a Miss to a Complicated Success.',
			unlocked: false
		}
	]
};

export const engineer: PlayCard = {
	name: 'Engineer',
	job: hotShot,
	bonuses: ['Manufacturing', 'Software', 'A Robotic Assistant'],
	pitfall: 'You believe getting results is all that matters.',
	unlockables: [
		{
			name: 'Design A Clever Trap',
			description:
				'When you use an Engineer Bonus to Set A Trap, you can convert a Miss to a Complicated Success.',
			unlocked: false
		},
		{
			name: 'Curious Nature',
			description: 'When you use an Engineer Bonus to Use Science!, you can Reroll.',
			unlocked: false
		}
	]
};

export const teacher: PlayCard = {
	name: 'Teacher',
	job: sage,
	bonuses: ['Instruction', 'Empathy', 'A Portable Hologram Device'],
	pitfall: 'You think science should be free of influence.',
	unlockables: [
		{
			name: 'Teacher’s Eye',
			description: 'When you use a Teacher Bonus to Lend a Hand, you can add Reroll.',
			unlocked: false
		},
		{
			name: 'Kill Them With Kindness',
			description:
				'When you use a Teacher Bonus to Cause A Problem, you can add your RAP rating as positive (-2 RAP becomes +2 RAP.)',
			unlocked: false
		}
	]
};

export const proprietor: PlayCard = {
	name: 'Proprietor',
	job: sage,
	bonuses: ['Barter', 'Gossip', 'A Local Business'],
	pitfall: 'You always take a chance to rebel against the Government.',
	unlockables: [
		{
			name: 'Heard It On The Grapevine',
			description: 'When you use a Proprietor Bonus to Be Convincing, you can add +1 to the Roll.',
			unlocked: false
		},
		{
			name: 'Safe Space',
			description:
				'Any Threat causing Damage to something inside your business from the outside does -3 Damage.',
			unlocked: false
		}
	]
};

export const politician: PlayCard = {
	name: 'Politician',
	job: sage,
	bonuses: ['Politics', 'Speech', 'A Political Position'],
	pitfall: 'You tend to bloviate, especially with an audience.',
	unlockables: [
		{
			name: 'Motivational Speaker',
			description:
				'When you use a Politician Bonus to Be Convincing, you can convert a Miss to a Complicated Success.',
			unlocked: false
		},
		{
			name: 'Popular',
			description: 'You can add +1 RAP with every new NPC you meet.',
			unlocked: false
		}
	]
};

export const standardPlayCards = [
	marshal,
	intelligence,
	investigator,
	researcher,
	agent,
	corporate,
	military,
	security,
	ordnance,
	inventor,
	analyst,
	engineer,
	teacher,
	proprietor,
	politician
];

export const getOthers = (
	playCards: PlayCards | undefined,
	index: number
): [PlayCard | null, PlayCard | null, PlayCard | null] => {
	const others = [...(playCards ?? [null, null, null, null])];
	return others.filter((_, i) => i !== index) as [
		PlayCard | null,
		PlayCard | null,
		PlayCard | null
	];
};

export const standardJobColors: Record<string, Color> = {
	Detective: 'sky',
	Liaison: 'amber',
	Specialist: 'emerald',
	'Hot Shot': 'pink',
	Sage: 'violet'
};

export const getJobColor = (job: string): Color => {
	if (standardJobColors[job]) {
		return standardJobColors[job];
	}

	return 'teal';
};

export type JobColorShade = '300' | '500' | '700';
export const getJobColorClass = (setting: string, job: Job, shade: JobColorShade = '500') =>
	getColorClass(setting, getJobColor(job.name), shade);

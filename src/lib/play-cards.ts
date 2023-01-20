import { getColorClass, type Color } from './color';
import type { Job, PlayCard, PlayCardIndex, PlayCards } from './db';
import { detective, hotShot, liaison, sage, specialist } from './jobs';

export type OtherPlayCards = [PlayCard | undefined, PlayCard | undefined, PlayCard | undefined];

export const marshal = (): PlayCard => ({
	name: 'Marshal',
	job: detective,
	bonuses: ['', '', ''],
	bonusQuestions: [
		'How do you apprehend suspects?',
		'How do you protect others?',
		'What make you handy in a chase?',
	],
	bonusExamples: [
		'ambush, find any trail, my robo-dog companion',
		'sixth-sense, calm under pressure, my anti-ballistic shield',
		'athletics, situational awareness, my offroad vehicle',
	],
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
});

export const intelligence = (): PlayCard => ({
	name: 'Intelligence',
	job: detective,
	bonuses: ['', '', ''],
	bonusQuestions: [
		'What made you a great at intelligence gathering?',
		'How do you respond to danger?',
		'What gadgets do you have?',
	],
	bonusExamples: [
		'disguises, roguish charm,  my spy-vision contacts',
		'cool head, get out of the way, my trusty sidearm',
		'laser watch, concealed taser, my secret comm device',
	],
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
});

export const investigator = (): PlayCard => ({
	name: 'Investigator',
	job: detective,
	bonuses: ['', '', ''],
	bonusQuestions: [
		'What do you use to find clues?',
		'How do you conduct interviews?',
		'What unusual technique do you use in your investigations?',
	],
	bonusExamples: [
		'forensics, attention to detail, my all-purpose scanner',
		'interrogation, play dumb, my trusty recorder',
		'meditation, encylopediac knowledge, my cyber-Watson computer',
	],
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
});

export const researcher = (): PlayCard => ({
	name: 'Researcher',
	job: liaison,
	bonuses: ['', '', ''],
	bonusQuestions: [
		'What do you research?',
		'Where is your favorite place to work?',
		'What tools do you use?',
	],
	bonusExamples: [
		'policy, scientific artifacts, my therapeutic process',
		'library, out in the field, my private lab',
		'sketchpad, backpacking supplies, my AI assistant',
	],
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
});

export const agent = (): PlayCard => ({
	name: 'Agent',
	job: liaison,
	bonuses: ['', '', ''],
	bonusQuestions: [
		'What is your responsibility in the Town?',
		'What skills got you into your position?',
		'What privileges come with the job?',
	],
	bonusExamples: [
		'regulation, protecting government assets, my postal system',
		'debate, knowing the rules, my way with people',
		'clearance, insider knowledge, my standard issue sidearm',
	],
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
});

export const corporate = (): PlayCard => ({
	name: 'Corporate',
	job: liaison,
	bonuses: ['', '', ''],
	bonusQuestions: [
		'What is your biggest strength?',
		'What value do you add to the team?',
		'What is your favorite thing about your role?',
	],
	bonusExamples: [
		'negotiation, time management, my great attitude',
		'efficiency, good with people, my business network',
		'company car, access to “gizmos”, my executive assistant',
	],
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
});

export const military = (): PlayCard => ({
	name: 'Military',
	job: specialist,
	bonuses: ['', '', ''],
	bonusQuestions: [
		'What did you get specialized training in?',
		'What special maneuver, skill, or trait did you learn?',
		'How do you like to relax?',
	],
	bonusExamples: [
		'martial arts, small-unit tactics, my firearm collection',
		'dodge, jury-rigging equipment, my steel nerves',
		'video games, playing baseball,  my vintage motorcycle',
	],
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
});

export const security = (): PlayCard => ({
	name: 'Security',
	job: specialist,
	bonuses: ['', '', ''],
	bonusQuestions: [
		'How do you deal with a fight breaking out?',
		'What do you use to detect danger?',
		'What qualities have you picked up over the years?',
	],
	bonusExamples: [
		'deescalation, jump right in, my stun baton',
		'instincts, keen eye, my threat assessment monocle',
		'paranoid, can take a punch,  my poker face',
	],
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
});

export const ordnance = (): PlayCard => ({
	name: 'Ordnance',
	job: specialist,
	bonuses: ['', '', ''],
	bonusQuestions: [
		'What is your favorite piece of equipment in your collection?',
		'How do you maintain your equipment?',
		'What is the most unexpected piece in your collection?',
	],
	bonusExamples: [
		'grenade launcher, support drones, my hover-APC',
		'repair kit, firearms workshop , my mechanic friend',
		'rubber ducky, fancy wine, my weaponized robo-kitten',
	],
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
});

export const inventor = (): PlayCard => ({
	name: 'Inventor',
	job: hotShot,
	bonuses: ['', '', ''],
	bonusQuestions: [
		'What is your process for inventing?',
		'How would you generally describe your inventions?',
		'What is your most important invention?',
	],
	bonusExamples: [
		'tinkering, careful planning, my mechanical intuition',
		'eclectic, a junkyard of unfinished projects, my android farm',
		'cold fusion, anti-gravity boots, my portal gun',
	],
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
});

export const analyst = (): PlayCard => ({
	name: 'Analyst',
	job: hotShot,
	bonuses: ['', '', ''],
	bonusQuestions: [
		'How do you normally conduct your analysis?',
		'What technology do you use for your work?',
		'What trick, skill, or quality have you picked up through your work?',
	],
	bonusExamples: [
		'statistics, modeling and simulation, my predictive algorithm',
		'notebook, machine learning, my super computer',
		'life hacking, counting cards, my ability to solve puzzles',
	],
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
});

export const engineer = (): PlayCard => ({
	name: 'Engineer',
	job: hotShot,
	bonuses: ['', '', ''],
	bonusQuestions: [
		'What is your favorite part of the engineering process?',
		'What is your specialty?',
		'What makes you feel pride in your work?',
	],
	bonusExamples: [
		'design, putting things together, my omnitool',
		'MacGyvering, software engineering, my auto-fabricator',
		'problem solving, lots of patents, my robotic assistant',
	],
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
});

export const mentor = (): PlayCard => ({
	name: 'Mentor',
	job: sage,
	bonuses: ['', '', ''],
	bonusQuestions: [
		'What kind of work do you do?',
		'Who do you mentor?',
		'What are you known in the Town for?',
	],
	bonusExamples: [
		'school teacher, advising at the Compound, my offsite lab',
		'math students, Dr. Eugene Putz, my niece Sara',
		'empathy, a selection of unique outfits, my portable hologram device',
	],
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
});

export const proprietor = (): PlayCard => ({
	name: 'Proprietor',
	job: sage,
	bonuses: ['', '', ''],
	bonusQuestions: [
		'What kind of business do you operate?',
		'How do you interact with customers?',
		'Who or what do you rely on to succeed?',
	],
	bonusExamples: [
		'mechanic, the local salon, my bar Archimedes’ Screw',
		'gossip, let’s make a deal, my customers are family',
		'jeweler’s tools, delivery boy Rod Hobson, my multi-function work truck',
	],
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
});

export const politician = (): PlayCard => ({
	name: 'Politician',
	job: sage,
	bonuses: ['', '', ''],
	bonusQuestions: [
		'How do you serve the town?',
		'What is your platform?',
		'Where do you prefer to work from?',
	],
	bonusExamples: [
		'mayor, Government representative, my activism',
		'workplace safety, science free from influence, my recreation initiative',
		'town hall, the local diner, my office at the Compound',
	],
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
});

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
	mentor,
	proprietor,
	politician
];

export const customPlayCard: Omit<PlayCard, 'job' | 'bonuses' | 'bonusQuestions'> = {
	name: 'Play Card Name',
	bonusExamples: [
		'What is your specialty? What do you do? How do you do your job?',
		'What makes you unique? Who do work with? Where do you work?',
		'What do you know? What traits do you have? What tools do you use?',
	],
	unlockables: [
		{
			name: 'First Unlockable',
			description:
				'Create a Custom Move based on your Bonuses. Common mechanics are: you can Reroll, you can convert a Miss to a Complicated Success, or you can add +1 to the Roll.',
			unlocked: false
		},
		{
			name: 'Second Unlockable',
			description: 'Create another Custom Move based on your Bonuses or something unique about you. This could be one of the common mechanics or something special, work with the Director to make sure it makes sense.',
			unlocked: false
		}
	]
}

export const getOthers = (
	playCards: PlayCards | undefined,
	index: number
): OtherPlayCards => {
	const others = [...(playCards ?? [undefined, undefined, undefined, undefined])];
	return others.filter((_, i) => i !== index) as [
		PlayCard | undefined,
		PlayCard | undefined,
		PlayCard | undefined
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
export const getJobColorClass = (setting: string, job?: Job, shade: JobColorShade = '500') =>
	getColorClass(setting, getJobColor(job?.name ?? ''), shade);

export const getIndex = (i: number): PlayCardIndex => i as PlayCardIndex;
export const isValidIndex = (i: number): boolean => i >= 0 && i < 4;
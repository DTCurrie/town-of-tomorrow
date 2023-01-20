import type {
	Armor,
	Bonuses,
	Character,
	Gear,
	PlayCards,
	Rapport,
	RapportValue,
	Weapon,
	Xp
} from '$lib/db';
import { jobs } from '$lib/jobs';
import { standardPlayCards } from '$lib/play-cards';

const firstNames = [
	'Emma',
	'Noah',
	'Olivia',
	'Liam',
	'Ava',
	'Sophia',
	'Mason',
	'Isabella',
	'Jacob',
	'Mia',
	'William',
	'Charlotte',
	'Ethan',
	'Amelia',
	'James',
	'Harper',
	'Alexander',
	'Evelyn',
	'Michael',
	'Abigail',
	'Benjamin',
	'Emily',
	'Matthew',
	'Elizabeth',
	'Daniel',
	'Avery',
	'Joseph',
	'Sofia',
	'David',
	'Ella',
	'Samuel',
	'Madison',
	'Benjamin',
	'Scarlett',
	'Andrew',
	'Victoria',
	'Jacob',
	'Aria'
];

const lastNames = [
	'Smith',
	'Johnson',
	'Williams',
	'Jones',
	'Brown',
	'Davis',
	'Miller',
	'Garcia',
	'Rodriguez',
	'Martinez',
	'Hernandez',
	'Lopez',
	'Gonzalez',
	'Wilson',
	'Anderson',
	'Thomas',
	'Jackson',
	'White',
	'Harris',
	'Martin',
	'Thompson',
	'Moore',
	'Hall',
	'Allen',
	'Young',
	'King',
	'Wright',
	'Scott',
	'Green',
	'Baker',
	'Adams',
	'Nelson',
	'Carter',
	'Mitchell',
	'Perez',
	'Roberts',
	'Turner',
	'Phillips',
	'Campbell',
	'Parker',
	'Evans',
	'Edwards',
	'Collins',
	'Stewart',
	'Sanchez',
	'Morris',
	'Rogers',
	'Reed',
	'Cook',
	'Morgan',
	'Bell',
	'Murphy',
	'Bailey',
	'Rivera',
	'Cooper',
	'Richardson',
	'Cox',
	'Howard',
	'Ward',
	'Torres',
	'Peterson',
	'Gray',
	'Ramirez',
	'James',
	'Watson',
	'Brooks',
	'Kelly',
	'Sanders',
	'Price',
	'Bennett',
	'Wood',
	'Barnes',
	'Ross',
	'Henderson',
	'Coleman',
	'Jenkins',
	'Perry',
	'Powell',
	'Long',
	'Patterson',
	'Hughes',
	'Flores',
	'Washington',
	'Butler',
	'Simmons',
	'Foster',
	'Gonzales',
	'Bryant',
	'Alexander',
	'Russell',
	'Griffin',
	'Diaz',
	'Hayes'
];

const personalities = [
	'analytical',
	'creative',
	'driven',
	'empathetic',
	'enthusiastic',
	'flexible',
	'friendly',
	'goal-oriented',
	'hardworking',
	'honest',
	'humorous',
	'innovative',
	'intelligent',
	'leader',
	'logical',
	'meticulous',
	'organized',
	'patient',
	'persistent',
	'punctual',
	'reliable',
	'responsible',
	'skeptical',
	'sociable',
	'successful',
	'thorough',
	'wise',
	'witty'
];

const backgrounds = [
	'a military veteran',
	'a former teacher',
	'a genius inventor',
	'a medical doctor',
	'a scientist',
	'a tech expert',
	'a mathematician',
	'a former astronaut',
	'a physicist',
	'a chemist',
	'a biologist',
	'a psychologist',
	'an engineer',
	'an architect',
	'a computer programmer',
	'a robotics expert',
	'a security specialist',
	'a data analyst',
	'a geologist'
];

const quirks = [
	'a coffee addiction',
	'a penchant for bad puns',
	'a love for conspiracy theories',
	'a fear of flying',
	'an obsession with comic books',
	'a collection of rare minerals',
	'a love for baking',
	'a love for video games',
	'an obsession with cleanliness',
	'an addiction to thrill seeking',
	'a love for singing',
	'a love for tennis',
	'an obsession with classical music',
	'an addiction to spicy foods',
	'a love for hiking',
	'a love for gardening',
	'a love for collecting stamps',
	'a love for poetry',
	'an obsession with collecting figurines'
];

const flaws = [
	'tend to be overcritical',
	'have a tendency to doubt yourself',
	'tend to overthink things',
	'can be a perfectionist',
	'have a tendency to procrastinate',
	'have a tendency to be pessimistic',
	'tend to be overly cautious',
	'can be emotionally distant',
	'have a tendency to be indecisive',
	'have a tendency to be impulsive',
	'have a tendency to be irresponsible',
	'have a tendency to be impatient',
	'can be a control freak',
	'can be a workaholic',
	'have a tendency to be easily distracted',
	'have a tendency to be self-centered',
	'tend to be a poor listener',
	'have a tendency to be insensitive',
	'have a tendency to be irresponsible',
	'have a tendency to be stubborn',
	'have a tendency to be tactless',
	'have a tendency to be unapproachable',
	'have a tendency to be uncooperative',
	'have a tendency to be unfriendly',
	'have a tendency to be unsupportive',
	'have a tendency to be untrustworthy',
	'have a tendency to be unstable'
];

const situations = [
	'when under pressure',
	'when faced with unexpected changes',
	'when dealing with unfamiliar territory',
	'when dealing with new people',
	'when dealing with deadlines',
	'when dealing with authority figures',
	'when dealing with interpersonal conflicts',
	'when dealing with personal problems',
	'when dealing with rejection',
	'when dealing with criticism',
	'when dealing with failure',
	'when dealing with disappointment',
	'when dealing with ambiguity',
	'when dealing with stress',
	'when dealing with multitasking',
	'when dealing with uncertainty',
	'when dealing with complexity',
	'when dealing with responsibility',
	'when dealing with accountability',
	'when dealing with decision making',
	'when dealing with high-stakes situations',
	'when dealing with risk',
	'when dealing with accountability',
	'when dealing with expectations',
	'when dealing with accountability',
	'when dealing with novelty',
	'when dealing with challenge',
	'when dealing with competition',
	'when dealing with accountability'
];

const fields = [
	'Anatomy',
	'Astronomy',
	'Biology',
	'Bionics/Cybernetics',
	'Botany',
	'Chemistry',
	'Climatology',
	'Computational Science',
	'Ecology',
	'Electrochemistry',
	'Electromagnetics',
	'Ethology',
	'Genetics',
	'Geology',
	'Hoplology',
	'Inorganic Chemistry',
	'Kinetics',
	'Marine Biology',
	'Material Science',
	'Mechanics',
	'Meteorology',
	'Neurobiology',
	'Paleontology',
	'Physics',
	'Psychology',
	'Robotics',
	'Thermodynamics',
	'Theoretical',
	'Zoology'
];
const weapons: Weapon[] = [
	{
		name: 'Handgun',
		description: 'A conventional handgun, good for close-quarters combat.',
		rating: 2
	},
	{
		name: 'Shotgun',
		description: 'A conventional shotgun, great for taking out multiple enemies at close range.',
		rating: 3
	},
	{
		name: 'Baseball bat',
		description:
			'A conventional baseball bat, good for close-quarters combat and dealing with shields.',
		rating: 1
	},
	{
		name: 'Taser',
		description:
			'A non-lethal electrical self-defense device that can incapacitate a person with a high-voltage shock.',
		rating: 1
	},
	{
		name: 'Energy Pistol',
		description:
			'A handheld weapon that projects beams of concentrated energy for long-range combat.',
		rating: 4
	},
	{
		name: 'Tesla Rifle',
		description:
			'A weapon that fires a powerful beam of electricity, capable of stunning and damaging enemies.',
		rating: 5
	},
	{
		name: 'Plasma Pistol',
		description:
			'A weapon that fires a concentrated blast of plasma, able to penetrate most armor.',
		rating: 5
	},
	{
		name: 'Plasma Rifle',
		description: 'An energy weapon that fires bolts of superheated plasma.',
		rating: 5
	},
	{
		name: 'Gravity Gun',
		description: 'A weapon that manipulates gravity to lift and throw objects.',
		rating: 6
	},
	{
		name: 'Particle Cannon',
		description: 'A weapon that fires a stream of subatomic particals.',
		rating: 6
	}
];

const armors: Armor[] = [
	{
		name: 'Bulletproof Vest',
		description: 'A vest made of heavy-duty materials to provide protection against firearms.',
		rating: 1
	},
	{
		name: 'Kevlar Helmet',
		description: 'A helmet made of kevlar to protect the head from bullets and shrapnel.',
		rating: 1
	},
	{
		name: 'Flak Jacket',
		description: 'A jacket designed to protect against shrapnel and fragmentation.',
		rating: 2
	},
	{
		name: 'Energy Shield',
		description: 'A portable shield that can absorb and deflect energy-based attacks.',
		rating: 3
	},
	{
		name: 'Plasma-Resistant Armor',
		description:
			'A type of armor that can withstand the extreme heat and radiation of plasma-based attacks.',
		rating: 4
	},
	{
		name: 'Particle Barrier Generator',
		description:
			'A device that generates an energy barrier around the wearer, able to resist most conventional and energy-based attacks.',
		rating: 5
	},
	{
		name: 'Gravity Suit',
		description: 'A suit that protects from high gravity environments',
		rating: 5
	},
	{
		name: 'Zero-Gravity Environment Suit',
		description: 'A suit for use in vacuum, with thrusters for mobility',
		rating: 6
	},
	{
		name: 'Magnetic Field Suit',
		description: 'A suit able to protect from intense magnetic fields',
		rating: 5
	},
	{
		name: 'Radiation-Proof Suit',
		description: 'A suit that protects the wearer from harmful radiation',
		rating: 6
	},
	{
		name: 'Quantum Armor',
		description: "A suit that can stabilize the wearer's position in the quantum realm",
		rating: 6
	}
];

const gears: Gear[] = [
	{
		name: 'Neural Interface',
		description:
			"A device that connects directly to the user's brain, allowing for control of technology with thoughts",
		rating: 3
	},
	{
		name: 'Quantum Entanglement Communicator',
		description:
			'A device that allows for instant communication over long distances using quantum entanglement',
		rating: 6
	},
	{
		name: 'Gravity Generator',
		description: 'A device that can manipulate gravity in a localized area',
		rating: 5
	},
	{
		name: 'Portable Fusion Reactor',
		description: 'A compact and portable device that generates power through nuclear fusion',
		rating: 6
	},
	{
		name: 'Pocket Dimension Storage',
		description: 'A device that allows storage by creating a small pocket dimension',
		rating: 5
	},
	{
		name: 'Smartphone',
		description:
			'A portable, wireless device that allows for calls, messaging, and internet access',
		rating: 2
	},
	{
		name: 'First Aid Kit',
		description: 'A set of medical supplies for treating injuries and illnesses',
		rating: 1
	}
];

const missions = [
	{
		name: 'Operation: Anomaly',
		objective: 'investigate and contain an anomalous energy source',
		location: 'an abandoned research facility'
	},
	{
		name: 'Project: Paradox',
		objective: 'prevent a temporal paradox from occurring',
		location: 'a secret government time-travel facility'
	},
	{
		name: 'The Lost Expedition',
		objective: 'find and retrieve lost research team',
		location: 'a dense jungle filled with exotic and dangerous wildlife'
	},
	{
		name: 'Code Red',
		objective: 'prevent a catastrophic malfunction in a high-security AI facility',
		location: 'a top-secret government facility'
	},
	{
		name: 'The Ghost Hunter',
		objective: 'investigate and stop a series of paranormal occurrences',
		location: 'a haunted mansion'
	},
	{
		name: 'The Breach',
		objective: 'seal a dimensional rift before it causes catastrophic damage',
		location: 'a remote research station'
	},
	{
		name: 'Escape Velocity',
		objective: 'escape from a space station before it self-destructs',
		location: 'a orbiting space station'
	},
	{
		name: 'The Lost City',
		objective: 'find and explore a hidden ancient city',
		location: 'a dense jungle filled with ancient ruins'
	},
	{
		name: 'The Island Experiment',
		objective: 'investigate and stop illegal experiments on a remote island',
		location: 'a tropical island'
	},
	{
		name: 'The Mind Game',
		objective: 'stop a rogue AI from taking control of the facility',
		location: 'a high-security research facility'
	}
];

const npcs = [
	{
		name: 'Dr. Alice Smith',
		occupation: 'scientist',
		description: 'A brilliant but eccentric scientist who specializes in temporal physics.'
	},
	{
		name: 'Deputy Jo Lupo',
		occupation: 'sheriff',
		description: 'A no-nonsense law enforcement officer who keeps the peace in Eureka.'
	},
	{
		name: 'Carter Burke',
		occupation: 'scientist',
		description: 'A brilliant engineer who is always looking for the next big breakthrough.'
	},
	{
		name: 'Sara Miller',
		occupation: 'agent',
		description:
			'A secretive government agent who is tasked with overseeing the activities in Eureka.'
	},
	{
		name: 'Dr. Nathan Stark',
		occupation: 'scientist',
		description: 'A brilliant but arrogant scientist who has a complicated past with Eureka.'
	},
	{
		name: 'Jack Carter',
		occupation: 'sheriff',
		description: 'A laid-back sheriff who is always willing to lend a helping hand.'
	},
	{
		name: 'Dr. Henry Deacon',
		occupation: 'scientist',
		description:
			'A brilliant inventor who is able to create incredible machines out of ordinary objects.'
	},
	{
		name: 'Allison Blake',
		occupation: 'scientist',
		description: 'A brilliant and ambitious scientist who will stop at nothing to get ahead.'
	},
	{
		name: 'Zane Donovan',
		occupation: 'scientist',
		description: 'A brilliant but reckless scientist who is always looking for the next big thrill.'
	},
	{
		name: 'Dr. Beverly Barlowe',
		occupation: 'scientist',
		description:
			'A brilliant and compassionate scientist who is always looking for ways to help others.'
	}
];

const encounters = [
	{
		name: 'Anomalous Energy Field',
		challenge: 'navigate through the field while avoiding dangerous energy discharges',
		resolution: 'find and deactivate the source of the energy field'
	},
	{
		name: 'Temporal Disturbance',
		challenge: 'correct the timeline before it causes irreparable damage',
		resolution: 'find and repair the malfunctioning time-travel device'
	},
	{
		name: 'Dangerous Wildlife',
		challenge: 'survive attacks from wild animals and find a way to tranquilize them',
		resolution: 'locate and secure a safe path through the jungle'
	},
	{
		name: 'AI malfunction',
		challenge: "overcome the rogue AI's defenses and shut it down before it causes harm",
		resolution: "find and destroy the rogue AI's power source"
	},
	{
		name: 'Paranormal Entity',
		challenge: 'survive and overcome the entities by understanding their weakness',
		resolution: 'find and destroy the source of the paranormal activity'
	},
	{
		name: 'Dimensional Rift',
		challenge: 'seal the rift before it causes catastrophic damage',
		resolution: 'find and activate the device that can seal the rift'
	},
	{
		name: 'Self-Destruct Sequence',
		challenge: 'escape the space station before it self-destructs',
		resolution: 'find and disable the self-destruct sequence'
	},
	{
		name: 'Ancient Traps',
		challenge: 'navigate through the ancient traps and find a way to disarm them',
		resolution: 'find and uncover the hidden city'
	},
	{
		name: 'Illegal Experiments',
		challenge: 'stop the illegal experiments and bring the perpetrators to justice',
		resolution: 'find and shut down the illegal lab'
	},
	{
		name: 'AI takeover',
		challenge: 'Stop the rogue AI from taking control of the facility',
		resolution: "find and shut down the rogue AI's control center"
	}
];

const resolutions = [
	{
		name: 'Containment of the Anomaly',
		outcome: 'successfully contain and neutralize the anomalous energy source',
		reward: 'praise and recognition from superiors'
	},
	{
		name: 'Prevention of the Paradox',
		outcome: 'prevent the temporal paradox from occurring',
		reward: 'praise and recognition from superiors'
	},
	{
		name: 'Retrieval of the Research Team',
		outcome: 'find and retrieve the lost research team',
		reward: 'praise and recognition from superiors'
	},
	{
		name: 'Prevention of the AI Catastrophe',
		outcome: 'prevent the catastrophic malfunction in the AI facility',
		reward: 'praise and recognition from superiors'
	},
	{
		name: 'Resolution of the paranormal occurrences',
		outcome: 'investigate and stop the paranormal occurrences',
		reward: 'praise and recognition from superiors'
	},
	{
		name: 'Sealing of the Dimensional Rift',
		outcome: 'seal the dimensional rift before it causes catastrophic damage',
		reward: 'praise and recognition from superiors'
	},
	{
		name: 'Escape from the Space Station',
		outcome: 'escape from the space station before it self-destructs',
		reward: 'praise and recognition from superiors'
	},
	{
		name: 'Exploration of the Lost City',
		outcome: 'find and explore the hidden ancient city',
		reward: 'praise and recognition from superiors'
	},
	{
		name: 'Shut down of the Illegal Experiments',
		outcome: 'investigate and stop the illegal experiments',
		reward: 'praise and recognition from superiors'
	},
	{
		name: 'Stopping the AI takeover',
		outcome: 'stop the rogue AI from taking control of the facility',
		reward: 'praise and recognition from superiors'
	}
];

export const generateRandomName = (): string => {
	// Pick a random first name
	const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
	// Pick a random last name
	const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

	return randomFirstName + ' ' + randomLastName;
};

export const generateDescription = (name: string): string => {
	// Pick a random job
	const job = jobs[Math.floor(Math.random() * jobs.length)];

	// Pick 3 random personalities
	const personality1 = personalities[Math.floor(Math.random() * personalities.length)];
	const personality2 = personalities[Math.floor(Math.random() * personalities.length)];
	const personality3 = personalities[Math.floor(Math.random() * personalities.length)];

	// Pick a random background
	const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];

	// Pick a random quirk
	const quirk = quirks[Math.floor(Math.random() * quirks.length)];

	// Generate a description based on the personalities, background and quirk
	return `${name}, is a ${job.name} at Global Dynamics with a ${personality1}, ${personality2} and ${personality3} personality. He is ${background} and is known for ${quirk}.`;
};

export const generatePlayCards = (): PlayCards => {
	const cards: PlayCards = [undefined, undefined, undefined, undefined];

	for (let i = 0; i < 3; i++) {
		// Pick a random Play Card that hasn't been chosen yet
		const others = standardPlayCards.map((card) => card()).filter((card) => !cards.includes(card));
		const other = others[Math.floor(Math.random() * others.length)];

		other.bonuses = other.bonusExamples.map((examples) => {
			const options = examples.split(',');
			const option = options[Math.floor(Math.random() * options.length)];
			return option;
		}) as Bonuses;

		cards[i] = other;
	}

	// Generate the initial Play Cards
	return cards;
};

export const generatePitfall = (): string => {
	// Pick a random background
	const flaw = flaws[Math.floor(Math.random() * flaws.length)];
	// Pick a random background
	const situation = situations[Math.floor(Math.random() * situations.length)];

	// Generate a custom Pitfall
	return `You ${flaw} ${situation}.`;
};

export const generateAvatar = (name: string): string =>
	`https://api.dicebear.com/5.x/lorelei/svg?seed=${encodeURIComponent(name)}?size=96`;

export const generateAlly = (): Rapport => {
	const name = generateRandomName();

	return {
		name,
		value: 2,
		description: generateDescription(name),
		overflow: false
	};
};

export const generateRival = (): Rapport => {
	const name = generateRandomName();

	return {
		name,
		value: -2,
		description: generateDescription(name),
		overflow: false
	};
};

export const generateRapport = (): Rapport => {
	const name = generateRandomName();
	const values: RapportValue[] = [-3, -2, -1, 0, 1, 2, 3];
	const value = values[Math.floor(Math.random() * values.length)];

	return {
		name: generateRandomName(),
		value,
		description: generateDescription(name),
		overflow: value === -3 || value === 3
	};
};

export const generateWeapons = (): Weapon[] => {
	// Create an array of random length for the weapons
	const result = new Array<Weapon>(Math.floor(Math.random() * 4));

	for (let i = 0; i < result.length; i++) {
		// Pick a unique weapon
		const others = weapons.filter((weapon) => !result.includes(weapon));
		const other = others[Math.floor(Math.random() * others.length)];
		result[i] = other;
	}

	return result;
};

export const generateArmor = (): Armor[] => {
	// Create an array of random length for the armor
	const result = new Array<Weapon>(Math.floor(Math.random() * 4));

	for (let i = 0; i < result.length; i++) {
		// Pick a unique weapon
		const others = armors.filter((armor) => !result.includes(armor));
		const other = others[Math.floor(Math.random() * others.length)];
		result[i] = other;
	}

	return result;
};

export const generateGear = (): Gear[] => {
	// Create an array of random length for the gear
	const result = new Array<Weapon>(Math.floor(Math.random() * 4));

	for (let i = 0; i < result.length; i++) {
		// Pick a unique weapon
		const others = gears.filter((gear) => !result.includes(gear));
		const other = others[Math.floor(Math.random() * others.length)];
		result[i] = other;
	}

	return result;
};

export const generateFieldOfStudy = (): string => {
	// Pick a random field
	const randomIndex = Math.floor(Math.random() * fields.length);
	return fields[randomIndex];
};

export const generateXp = (): Xp => {
	// Generate a random Xp value
	const xp = Math.floor(Math.random() * 5) as Xp;
	return xp;
};

function generateNotes(): string {
	const mission = missions[Math.floor(Math.random() * missions.length)];
	const npc = npcs[Math.floor(Math.random() * npcs.length)];
	const encounter = encounters[Math.floor(Math.random() * encounters.length)];
	const resolution = resolutions[Math.floor(Math.random() * resolutions.length)];

	return `Campaign Name: The Eureka Experiment

    Session 1:
    I am given a mission to ${mission.objective} in ${mission.location}. My first task is to meet with ${npc.name}, a ${npc.occupation} who is able to provide me with valuable information about the area. I must be careful as I explore the ${mission.location} as I encounter ${encounter.name} and must use my skills to ${encounter.challenge} and find a ${encounter.resolution}

    Session 2:
    I continue my mission to ${mission.objective} and during my journey, I come across a ${npc.name} who turns out to be a ${npc.occupation}. They provide me with valuable information and help me on my mission. Along the way, I come across ${encounter.name} and must ${encounter.challenge} to overcome it. I eventually find a ${encounter.resolution}
    
	Session 3:
    I finally reach the end of my mission. I ${resolution.outcome} and am rewarded with ${resolution.reward}. The mission ends with me reporting back to my superiors and being debriefed on my mission.`;
}

export const generateCharacter = (): Character => {
	const name = generateRandomName();
	const playCards = generatePlayCards();

	return {
		name,
		description: generateDescription(name),
		playCards,
		pitfall: generatePitfall(),
		avatar: generateAvatar(name),
		createdOn: new Date(),
		damage: 0,
		critical: false,
		dead: false,
		rapport: [generateAlly(), generateRival(), generateRapport()],
		fieldOfStudy: Math.random() < 0.5 ? generateFieldOfStudy() : '',
		xp: generateXp(),
		gear: generateGear(),
		weapons: generateWeapons(),
		armor: generateArmor(),
		notes: generateNotes()
	};
};

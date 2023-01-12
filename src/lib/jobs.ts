import type { Job, JobHealth, JobType } from './db';

export const jobHealth: Record<JobType, JobHealth> = {
	Detective: 2,
	Liaison: 2,
	Specialist: 3,
	'Hot Shot': 1,
	Sage: 1
};

const jobFactory = (type: JobType): Job => ({ name: type, health: jobHealth[type] });

export const detective: Job = jobFactory('Detective');
export const liaison: Job = jobFactory('Liaison');
export const specialist: Job = jobFactory('Specialist');
export const hotShot: Job = jobFactory('Hot Shot');
export const sage: Job = jobFactory('Sage');

export const jobs = [detective, liaison, specialist, hotShot, sage];

export const jobAbbreviations: Record<JobType, string> = {
	Detective: 'Det.',
	Liaison: 'Lias.',
	Specialist: 'Spec.',
	'Hot Shot': 'Hot',
	Sage: 'Sage'
};

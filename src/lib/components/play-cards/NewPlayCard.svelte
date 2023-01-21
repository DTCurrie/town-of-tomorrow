<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import classNames from 'classnames';

	import type { Job, PlayCard, Unlockables } from '$lib/db';
	import { jobs } from '$lib/jobs';
	import { log } from '$lib/logs';
	import { customPlayCard, getJobColorClass } from '$lib/play-cards';
	import { errorToast } from '$lib/toast';

	import Button from '$lib/elements/Button.svelte';
	import Select from '$lib/elements/inputs/Select.svelte';
	import TextInput from '$lib/elements/inputs/TextInput.svelte';
	import Textarea from '$lib/elements/inputs/Textarea.svelte';

	export let create = () => dispatch('created', newPlayCard);

	const dispatch = createEventDispatcher();

	let status = '';

	let newPlayCardName = '';
	let newPlayCardJob: Job | undefined;
	let newPlayCardBonusQuestions = ['', '', ''];
	let newPlayCardBonusExamples = ['', '', ''];
	let newPlayCardUnlockables: Unlockables = [
		{ name: '', description: '', unlocked: false },
		{ name: '', description: '', unlocked: false }
	];

	const resetNewPlayCard = () => {
		newPlayCardName = '';
		newPlayCardJob = undefined;
		newPlayCardBonusQuestions = ['', '', ''];
		newPlayCardBonusExamples = ['', '', ''];
		newPlayCardUnlockables = [
			{ name: '', description: '', unlocked: false },
			{ name: '', description: '', unlocked: false }
		];
	};

	const validate = (): string => {
		log('NewPlayCard validate', false, { newPlayCard });

		if (!newPlayCard.name) {
			return (status = 'Enter a name for your Play Card!');
		}

		if (!newPlayCard.job) {
			return (status = 'Select a Job for your Play Card!');
		}

		if (!newPlayCard.bonusQuestions[0]) {
			return (status = 'Enter your first Bonus question!');
		}

		let examples = newPlayCard.bonusExamples[0].split(',');
		if (examples.length !== 3 || examples.some((v) => !v)) {
			return (status = 'Enter three examples for your first Bonus question!');
		}

		if (!newPlayCard.bonusQuestions[1]) {
			return (status = 'Enter your second Bonus question!');
		}

		examples = newPlayCard.bonusExamples[1].split(',');
		if (examples.length !== 3 || examples.some((v) => !v)) {
			return (status = 'Enter three examples for your second Bonus question!');
		}

		if (!newPlayCard.bonusQuestions[2]) {
			return (status = 'Enter your third Bonus question!');
		}

		examples = newPlayCard.bonusExamples[2].split(',');
		if (examples.length !== 3 || examples.some((v) => !v)) {
			return (status = 'Enter three examples for your third Bonus question!');
		}

		if (!newPlayCard.unlockables[0].name) {
			return (status = 'Enter a name for your first Unlockable!');
		}

		if (!newPlayCard.unlockables[0].description) {
			return (status = 'Enter a description for your first Unlockable!');
		}

		if (!newPlayCard.unlockables[1].name) {
			return (status = 'Enter a name for your second Unlockable!');
		}

		if (!newPlayCard.unlockables[1].description) {
			return (status = 'Enter a description for your second Unlockable!');
		}

		return (status = '');
	};

	export const addPlayCard = () => {
		log('NewPlayCard addPlayCard', false, { newPlayCard });

		status = validate();

		if (!status) {
			create();
			resetNewPlayCard();
			return;
		}

		errorToast(status);
	};

	$: newPlayCard = {
		name: newPlayCardName.trim(),
		job: newPlayCardJob,
		bonuses: ['', '', ''],
		bonusQuestions: newPlayCardBonusQuestions.map((v) => v.trim()),
		bonusExamples: newPlayCardBonusExamples.map((v) =>
			v
				.split(',')
				.map((e) => e.trim())
				.join(', ')
				.trim()
		),
		unlockables: newPlayCardUnlockables.map((v) => ({
			...v,
			name: v.name.trim(),
			description: v.description.trim()
		}))
	} as PlayCard;
</script>

<form
	class="flex flex-col w-full h-full max-h-full overflow-y-auto rounded-lg bg-white"
	on:submit|preventDefault={() => addPlayCard()}
>
	<div
		class={classNames(
			'flex flew-row items-center w-full gap-0.5 px-2 pt-0.5 rounded-t-lg border-2',
			getJobColorClass('bg', newPlayCard.job ?? {}),
			getJobColorClass('border', newPlayCard.job ?? {})
		)}
	>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="w-full">
			<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]"> Name:</span>
			<TextInput
				bind:value={newPlayCardName}
				classes={classNames(
					'font-display font-bold content-center border-2 border-white text-white placeholder:text-white placeholder:translate-y-0.5 focus:border-gray-300 focus:outline-none',
					getJobColorClass('bg', newPlayCard.job ?? {})
				)}
				maxlength="25"
				placeholder={customPlayCard.name}
				required
			/>
		</label>
	</div>
	<div
		class={classNames(
			'flex flex-col w-full h-full rounded-b-lg border-4 border-t-2 bg-white',
			getJobColorClass('border', newPlayCard.job ?? {})
		)}
	>
		<div class="flex flex-col w-full h-full gap-2 py-2">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-row gap-2 px-2 w-full items-center">
				<span class="font-bold">Job:</span>
				<Select
					bind:value={newPlayCardJob}
					options={jobs.map((job) => [job.name, job])}
					placeholder="Job"
					required
				/>
			</label>

			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-col gap-2 px-2">
				<p class="font-bold">Bonus Questions:</p>

				<ul class="flex flex-col gap-2">
					{#each newPlayCardBonusQuestions as _, i}
						<li class="list-item">
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<label class="w-full ">
								<p class="font-bold">Question #{i + 1}:</p>
								<p class="italic text-sm">
									examples:
									{#each customPlayCard.bonusExamples[i]
										.split('?')
										.filter((v) => v !== '') as example, i}
										<span class="bg-gray-300">{example}?</span>{#if i < 2}<span>&nbsp;</span>{/if}
									{/each}
								</p>
								<TextInput
									bind:value={newPlayCardBonusQuestions[i]}
									placeholder="Enter a question"
									aria-label="Bonus question #{i}"
									maxlength="240"
									required
								/>
							</label>
							<label class="w-full ">
								<p>Answer Examples:</p>
								<p class="text-sm text-gray-700 italic" />
								<TextInput
									bind:value={newPlayCardBonusExamples[i]}
									placeholder="something, some other thing, my specific thing"
									aria-label="Examples for Bonus question #{i}"
									maxlength="80"
									required
								/>
							</label>
						</li>
					{/each}
				</ul>
			</label>

			<div class="flex flex-col gap-2 px-2">
				<p class="font-bold">Unlockables:</p>
				<div class="flex flex-col gap-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="w-full h-full">
						<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]">Name:</span>
						<div class="flex w-full h-full">
							<TextInput
								bind:value={newPlayCardUnlockables[0].name}
								aria-label="First Unlockable name"
								placeholder={customPlayCard.unlockables[0].name}
								maxlength="25"
								required
							/>
						</div>
					</label>

					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="w-full h-full">
						<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]">Description:</span>
						<div class="flex w-full h-full">
							<Textarea
								bind:value={newPlayCardUnlockables[0].description}
								classes="h-full max-lg:focus:min-h-[8rem] lg:min-h-[8rem] overflow-auto whitespace-spaces"
								aria-label="First Unlockable description"
								placeholder={customPlayCard.unlockables[0].description}
								maxlength="240"
								required
							/>
						</div>
					</label>
				</div>
			</div>

			<hr class="mx-2" />

			<div class="flex flex-col gap-2 px-2">
				<div class="flex flex-col gap-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="w-full h-full">
						<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]">Name:</span>
						<div class="flex w-full h-full">
							<TextInput
								bind:value={newPlayCardUnlockables[1].name}
								aria-label="First Unlockable name"
								placeholder={customPlayCard.unlockables[1].name}
								maxlength="25"
								required
							/>
						</div>
					</label>

					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="w-full h-full">
						<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]">Description:</span>
						<div class="flex w-full h-full">
							<Textarea
								bind:value={newPlayCardUnlockables[1].description}
								classes="h-full max-lg:focus:min-h-[8rem] lg:min-h-[8rem] overflow-auto whitespace-spaces"
								aria-label="First Unlockable description"
								placeholder={customPlayCard.unlockables[1].description}
								maxlength="240"
								required
							/>
						</div>
					</label>
				</div>
			</div>
		</div>

		<div
			class={classNames(
				'flex flex-col gap-2 border-t-4 p-2',
				getJobColorClass('border', newPlayCard.job ?? {})
			)}
		>
			{#if status}
				<p class="bg-red-700 text-white p-2">{status}</p>
			{/if}
			<div class="flex flex-row w-full gap-2 mt-auto  ">
				<Button type="submit" classes="w-32 ml-auto" color="lime">Save Play Card</Button>
			</div>
		</div>
	</div>
</form>

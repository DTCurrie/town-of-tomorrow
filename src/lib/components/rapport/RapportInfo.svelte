<script lang="ts">
	import classNames from 'classnames';
	import { createEventDispatcher } from 'svelte';

	import type { Character, Rapport } from '$lib/db';
	import { rapportValues } from '$lib/rapport';

	import { updateRapport, removeRapport } from '$lib/api/characters';

	import Textarea from '$lib/elements/inputs/Textarea.svelte';
	import TextInput from '$lib/elements/inputs/TextInput.svelte';
	import Button from '$lib/elements/Button.svelte';
	import { errorToast, successToast } from '$lib/toast';
	import { logError } from '$lib/logs';

	export let rapport: Rapport | undefined;
	export let character: Character | undefined;
	export let index: number;
	export let removing: boolean = false;
	export let editing: boolean = false;

	export let edited = () => dispatch('edited', newRapport);
	export let removed = () => dispatch('removed');

	const dispatch = createEventDispatcher();

	let rapportName = '';
	let rapportValue = 0;
	let rapportDescription = '';
	let rapportOverflow = false;

	$: newRapport = {
		name: rapportName.trim(),
		value: rapportValue,
		description: rapportDescription.trim(),
		overflow: rapportOverflow
	} as Rapport;

	const resetNewRapport = () => {
		editing = false;
		rapportName = '';
		rapportValue = 0;
		rapportDescription = '';
		rapportOverflow = false;
	};

	const update = async () => {
		try {
			await updateRapport(character, newRapport, index);
			successToast(`Updated ${newRapport.name}!`);
			edited();
			editing = false;
		} catch (error) {
			logError('Error updating Rapport', false, { rapport, newRapport, character, index });
			errorToast('Error updating Rapport, please try again!');
		}
	};

	const remove = async () => {
		try {
			await removeRapport(character, index);
			successToast(`Removed ${rapport?.name}!`);
			removed();
		} catch (error) {
			logError('Error removing Rapport', false, { rapport, character, index });
			errorToast('Error removing Rapport, please try again!');
		}
	};
</script>

<div class="flex flex-col w-full h-full rounded-lg bg-white">
	{#if editing}
		<form on:submit|preventDefault={update}>
			<div
				class="flex flew-row items-center w-full gap-0.5 bg-gray-700 rounded-t-lg border-x-2 border-t-2 border-gray-700"
			>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="w-full">
					<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]"> Name:</span>
					<TextInput
						bind:value={rapportName}
						classes="border-2 border-gray-700 rounded-tl-md"
						maxlength="25"
						placeholder="Name"
						required
					/>
				</label>
			</div>
			<div
				class="flex flex-col w-full h-full gap-2 rounded-b-lg border-4 border-t-2 border-gray-700 bg-white"
			>
				<ul class="flex flex-row gap-1 pt-2 px-2 list-none w-full">
					{#each rapportValues() as value}
						<li class="flex w-4 lg:w-6">
							<label class="flex flex-col justify-center items-center">
								<input
									type="radio"
									name={`${rapportName}|${index}`}
									{value}
									checked={rapportValue === value}
									class={classNames(
										`appearance-none flex-shrink-0 border-2 border-gray-500 w-4 lg:w-6 h-4 lg:h-6`,
										rapportValue !== value ? 'bg-white' : 'bg-gray-500'
									)}
									on:click={() => (rapportValue = value)}
								/>
								<p class="font-bold text-sm text-center">{value}</p>
							</label>
						</li>
					{/each}
				</ul>

				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="w-full h-full px-2">
					<span class="absolute w-[1px] h-[1px] transparent z-0 text-[0px]">Description:</span>
					<div class="flex w-full h-full">
						<Textarea
							bind:value={rapportDescription}
							classes="h-full min-h-[10rem] border-0 overflow-auto whitespace-spaces"
							maxlength="240"
							placeholder="Description"
						/>
					</div>
				</label>

				<label class="flex flex-row px-2 gap-2 items-center">
					<input
						type="checkbox"
						bind:checked={rapportOverflow}
						class={classNames(
							`appearance-none flex-shrink-0 border-2 border-gray-500 w-4 lg:w-6 h-4 lg:h-6`,
							!rapportOverflow ? 'bg-white' : 'bg-gray-500'
						)}
					/>
					<span class="font-bold text-sm">Overflow?</span>
				</label>

				<div class="flex flex-row w-full pb-2 gap-2 ml-auto mt-auto border-t-4 border-gray-700">
					<Button classes="w-20 ml-auto" color="rose" on:click={() => resetNewRapport()}
						>Cancel</Button
					>
					<Button type="submit" classes="w-20" color="lime">Save</Button>
				</div>
			</div>
		</form>
	{:else if rapport}
		<div class="flex flex-row w-full text-left bg-gray-700 text-white rounded-t-lg px-2 pt-2">
			<span class="font-display font-bold w-full overflow-x-hidden truncate">
				{rapport.name}
			</span>
			<span class="font-display font-normal">({rapport.value})</span>
		</div>

		<div
			class="flex flex-col w-full h-full transition-all duration-[250ms] ease-out overflow-hidden border-4 border-gray-700 bg-white rounded-b-lg"
		>
			<ul class="flex flex-row gap-1 pt-2 px-2 list-none w-full">
				{#each rapportValues() as value}
					<li class="flex w-4 lg:w-6">
						<label class="flex flex-col justify-center items-center">
							<input
								type="radio"
								name={`${rapport.name}|${index}`}
								{value}
								checked={rapport.value === value}
								class={classNames(
									`appearance-none flex-shrink-0 border-2 border-gray-500 w-4 lg:w-6 h-4 lg:h-6`,
									rapport.value !== value ? 'bg-white' : 'bg-gray-500'
								)}
								readonly
							/>
							<p class="font-bold text-sm text-center">{value}</p>
						</label>
					</li>
				{/each}
			</ul>

			<div class="flex p-1 w-full h-full px-2">
				<pre class="text-sm h-full overflow-auto whitespace-spaces">{rapport.description}</pre>
			</div>

			<label class="flex flex-row pb-2 px-2 gap-2 items-center">
				<input
					type="checkbox"
					checked={rapport.overflow}
					class={classNames(
						`appearance-none flex-shrink-0 border-2 border-gray-500 w-4 lg:w-6 h-4 lg:h-6`,
						!rapportOverflow ? 'bg-white' : 'bg-gray-500'
					)}
					readonly
				/>
				<span class="font-bold text-sm">Overflow?</span>
			</label>

			<div
				class="flex flex-row w-full gap-2 ml-auto mt-auto border-t-4 border-gray-700 p-2 shrink-0"
			>
				<Button
					classes="w-20 ml-auto"
					color="rose"
					on:click={() => (removing ? remove() : (removing = true))}
				>
					{#if removing}
						Confirm
					{:else}
						Remove
					{/if}
				</Button>
				{#if removing}
					<Button classes="w-20" color="cyan" on:click={() => (removing = false)}>Cancel</Button>
				{:else}
					<Button
						classes="w-20"
						color="cyan"
						on:click={() => {
							rapportName = rapport?.name ?? '';
							rapportValue = rapport?.value ?? 0;
							rapportDescription = rapport?.description ?? '';
							editing = true;
						}}
					>
						Edit
					</Button>
				{/if}
			</div>
		</div>
	{/if}
</div>

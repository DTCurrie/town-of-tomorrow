<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import classNames from 'classnames';
	import type { Weapon } from '$lib/db';
	import Chevron from '$lib/elements/icons/Chevron.svelte';
	import TextInput from '$lib/elements/inputs/TextInput.svelte';
	import NumberInput from '$lib/elements/inputs/NumberInput.svelte';
	import Textarea from '$lib/elements/inputs/Textarea.svelte';
	import Button from '$lib/elements/Button.svelte';
	import { log } from '$lib/logs';
	import { errorToast } from '$lib/toast';

	const dispatch = createEventDispatcher();

	export let create = () => dispatch('create', newWeapon);

	let newWeaponName = '';
	let newWeaponRating = 0;
	let newWeaponDescription = '';

	let expanded = false;
	let status = '';

	const resetNewWeapon = () => {
		newWeaponName = '';
		newWeaponRating = 0;
		newWeaponDescription = '';
	};

	const validate = (): string => {
		log('NewWeapon validate', false, { newWeapon });

		if (!newWeapon.name) {
			return (status = 'Enter a name for your Weapon!');
		}

		if (!newWeapon.description) {
			return (status = 'Enter a description for your Weapon!');
		}

		if (newWeapon.rating === undefined || newWeapon.rating < 0) {
			return (status = 'Enter a rating for your Weapon!');
		}

		return (status = '');
	};

	const addWeapon = () => {
		status = validate();

		if (!status) {
			create();
			resetNewWeapon();
			return;
		}

		errorToast(status);
	};

	$: newWeapon = {
		name: newWeaponName.trim(),
		rating: newWeaponRating,
		description: newWeaponDescription.trim()
	} as Weapon;
</script>

<form class="flex flex-col" on:submit|preventDefault={addWeapon}>
	<button
		class="flex w-full justify-between underline border border-black p-2"
		on:click|preventDefault={() => (expanded = !expanded)}
	>
		New Weapon:
		<span
			class={classNames('w-6 h-6 ml-auto transition-all duration-[250ms] ease-out', {
				'rotate-180': !expanded
			})}
		>
			<Chevron />
		</span>
	</button>

	<div
		class={classNames(
			'flex flex-col gap-1 lg:gap-2 px-2 w-full transition-all duration-[250ms] ease-out overflow-hidden border border-black border-t-0',
			{
				'h-[264px] lg:h-48 pt-2': expanded,
				'h-0 p-0 border-b-0': !expanded
			}
		)}
	>
		<div class="flex flex-col lg:flex-row gap-2 items-center">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-col lg:flex-row w-full lg:items-center lg:w-1/2">
				Name:
				<TextInput bind:value={newWeaponName} classes="lg:ml-2" maxlength="25" required />
			</label>

			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-col lg:flex-row w-full lg:items-center lg:w-32">
				Rating:
				<NumberInput
					type="number"
					bind:value={newWeaponRating}
					classes="lg:ml-2"
					min="0"
					max="6"
					required
				/>
			</label>
		</div>

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="flex flex-col w-full">
			Description:
			<Textarea bind:value={newWeaponDescription} classes="lg:ml-2" maxlength="240" />
		</label>

		<div class="flex flex-col p-2 gap-2">
			{#if status}
				<p class="bg-red-700 text-white p-2">{status}</p>
			{/if}

			<Button type="submit" classes="w-32 ml-auto mt-1" color="lime">Add Weapon</Button>
		</div>
	</div>
</form>

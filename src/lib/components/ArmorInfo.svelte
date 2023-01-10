<script lang="ts">
	import type { Armor } from '$lib/db';
	import classNames from 'classnames';
	import Button from './Button.svelte';
	import Chevron from './icons/Chevron.svelte';

	export let armor: Armor;
	export let removing: boolean = false;
	export let expanded = false;

	export let remove: () => void;
	export let cancel: () => void;
	export let edit: () => void;
	export let expand: () => void;
</script>

<div class="grid w-full p-2 gap-0.5">
	<button class="flex w-full text-left" on:click|preventDefault={expand}>
		<div class="flex w-full flex-col">
			<p class="font-bold w-64 overflow-hidden truncate">{armor.name}</p>
			<p class="text-gray-700">({armor.type} +{armor.rating})</p>
		</div>
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
			'flex flex-col w-full transition-all duration-[250ms] ease-out overflow-hidden',
			{
				'h-36': expanded,
				'h-0': !expanded
			}
		)}
	>
		<p class="text-sm h-24 break-all overflow-y-scroll border border-black p-0.5">
			{armor.description}
		</p>

		<div class="grid grid-cols-2 gap-0.5 ml-auto mt-auto">
			<Button classes="w-20 ml-auto" color="rose" on:click={remove}>
				{#if removing}
					Confirm
				{:else}
					Remove
				{/if}
			</Button>
			{#if removing}
				<Button classes="w-20 ml-auto" color="cyan" on:click={cancel}>Cancel</Button>
			{:else}
				<Button classes="w-20 ml-auto" color="cyan" on:click={edit}>Edit</Button>
			{/if}
		</div>
	</div>
</div>

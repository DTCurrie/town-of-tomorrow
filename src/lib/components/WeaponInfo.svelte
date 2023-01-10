<script lang="ts">
	import type { Weapon } from '$lib/db';
	import classNames from 'classnames';
	import Button from './Button.svelte';
	import Chevron from './icons/Chevron.svelte';

	export let weapon: Weapon;
	export let removing: boolean = false;
	export let expanded = false;

	export let remove: () => void;
	export let cancel: () => void;
	export let edit: () => void;
	export let expand: () => void;
</script>

<div class="grid w-full p-2 gap-0.5">
	<button class="flex w-full text-left" on:click|preventDefault={expand}>
		<div class="flex flex-col w-full">
			<p class="font-bold w-64 overflow-x-hidden truncate">{weapon.name}</p>
			<p class="text-gray-700">({weapon.type} +{weapon.rating})</p>
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
		<pre class="text-sm h-24 break-all overflow-auto whitespace-pre-wrap border border-black p-0.5">
		    {weapon.description}
        </pre>

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

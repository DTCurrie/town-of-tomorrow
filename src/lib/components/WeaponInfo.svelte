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

<div class="w-full">
	<button
		class="flex w-full text-left bg-rose-700 text-white rounded-t-lg px-2 pt-2"
		on:click|preventDefault={expand}
	>
		<div class="flex flex-row w-full">
			<span class="font-display font-bold w-40 overflow-x-hidden truncate">
				{weapon.name}
			</span>
			<span class="font-display font-normal">(+{weapon.rating})</span>
		</div>
		<span
			class={classNames('w-6 h-6 ml-auto transition-all duration-[250ms] ease-out', {
				'rotate-180': !expanded
			})}
		>
			<Chevron color="white" />
		</span>
	</button>

	<div
		class={classNames(
			'flex flex-col w-full transition-all duration-[250ms] ease-out overflow-hidden border-4 border-rose-700 rounded-b-lg',
			{
				'h-40': expanded,
				'h-0': !expanded
			}
		)}
	>
		<div class="p-1 h-full">
			<pre class="text-sm h-full overflow-auto whitespace-spaces">{weapon.description}</pre>
		</div>

		<div
			class="grid grid-cols-2 w-full gap-0.5 ml-auto mt-auto border-t-4 border-rose-700 p-2 shrink-0"
		>
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

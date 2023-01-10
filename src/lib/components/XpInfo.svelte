<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import classNames from 'classnames';
	import type { Xp } from '$lib/db';

	const dispatch = createEventDispatcher();

	export let xp: number;
	export let readonly = false;

	export let setXp = (value: Xp) => dispatch('set-xp', value);

	const select = (value: number) => {
		if (!readonly) {
			setXp(value as Xp);
		}
	};
</script>

<label>
	<div class="w-full flex flex-row gap-1 mt-2 items-center">
		<span class="font-bold">XP:</span>
		{#each new Array(5) as _, i}
			<input
				type="checkbox"
				checked={(xp ?? 0) >= i + 1}
				on:click|preventDefault={() => select(i + 1)}
				aria-label={`Set XP to ${i + 1}`}
				{readonly}
				aria-readonly={readonly}
				class={classNames(
					`appearance-none flex-shrink-0 w-5 lg:w-6 h-5 lg:h-6 border-2 border-yellow-500 overflow-x-hidden truncate`,
					xp < i + 1 ? 'bg-white' : 'bg-yellow-500'
				)}
			/>
		{/each}
	</div>
</label>

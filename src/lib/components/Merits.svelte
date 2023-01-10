<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import classNames from 'classnames';

	const dispatch = createEventDispatcher();

	export let merits: number;
	export let readonly = false;

	export let setMerits = (value: 0 | 1 | 2 | 3) => dispatch('set-merits', value);

	const select = (value: number) => {
		if (!readonly) {
			setMerits(value as 0 | 1 | 2 | 3);
		}
	};
</script>

<label>
	<div class="w-full flex flex-row items-center gap-1 mt-2">
		<span class="font-bold text-xs">Merits:</span>
		{#each new Array(3) as _, i}
			<input
				type="checkbox"
				checked={(merits ?? 0) >= i + 1}
				on:click|preventDefault={() => select(i + 1)}
				aria-label={`Set merits to ${i + 1}`}
				{readonly}
				aria-readonly={readonly}
				class={classNames(
					`appearance-none flex-shrink-0 w-5 lg:w-6 h-5 lg:h-6 border-2 border-cyan-500 overflow-x-hidden truncate`,
					merits < i + 1 ? 'bg-white' : 'bg-cyan-500'
				)}
			/>
		{/each}
	</div>
</label>

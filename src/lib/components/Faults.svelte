<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import classNames from 'classnames';

	const dispatch = createEventDispatcher();

	export let faults: number;
	export let readonly = false;

	export let setMerits = (value: number) => dispatch('set-faults', value);
</script>

<label>
	<div class="w-full flex flex-row items-center gap-1 mt-2">
		<span class="font-bold text-xs">Faults:</span>
		{#each new Array(3) as _, i}
			<input
				type="checkbox"
				checked={(faults ?? 0) >= i + 1}
				on:click|preventDefault={() => {
					if (!readonly) {
						setMerits(i + 1);
					}
				}}
				aria-label={`Set faults to ${i + 1}`}
				{readonly}
				aria-readonly={readonly}
				class={classNames(
					`appearance-none flex-shrink-0 w-5 lg:w-6 h-5 lg:h-6 border-2 border-rose-500 overflow-x-hidden truncate`,
					faults < i + 1 ? 'bg-white' : 'bg-rose-500'
				)}
			/>
		{/each}
	</div>
</label>

<script lang="ts">
	import type { Gear } from '$lib/db';

	export let gear: Gear;

	export let select: () => void;
</script>

<button
	class="flex w-full text-left bg-cyan-700 text-white rounded-lg p-2"
	on:click|preventDefault={select}
>
	<div class="flex flex-row w-full">
		<span class="font-display font-bold w-full overflow-x-hidden truncate">
			{gear.name}
		</span>
		<span class="font-display font-normal">(+{gear.rating})</span>
	</div>
</button>

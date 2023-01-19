<script lang="ts">
	import type { Armor } from '$lib/db';

	export let armor: Armor;

	export let select: () => void;
</script>

<button
	class="flex w-full text-left bg-lime-700 text-white rounded-lg p-2 shadow"
	on:click|preventDefault={select}
>
	<div class="flex flex-row w-full">
		<span class="font-display font-bold w-full overflow-x-hidden truncate">
			{armor.name}
		</span>
		<span class="font-display font-normal">(+{armor.rating})</span>
	</div>
</button>

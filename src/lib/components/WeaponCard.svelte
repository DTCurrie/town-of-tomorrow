<script lang="ts">
	import type { Weapon } from '$lib/db';

	export let weapon: Weapon;

	export let select: () => void;
</script>

<button
	class="flex w-full text-left bg-rose-700 text-white rounded-lg p-2 shadow"
	on:click|preventDefault={select}
>
	<div class="flex flex-row w-full">
		<span class="font-display font-bold w-full overflow-x-hidden truncate">
			{weapon.name}
		</span>
		<span class="font-display font-normal">(+{weapon.rating})</span>
	</div>
</button>

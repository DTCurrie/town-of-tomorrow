<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { PlayCards } from '$lib/db';
	import { getJobColor } from '$lib/play-cards';

	import Checkbox from '$lib/elements/inputs/Checkbox.svelte';

	const dispatch = createEventDispatcher();

	export let damage: number = 0;
	export let critical = false;
	export let dead = false;
	export let playCards: PlayCards | undefined;
	export let readonly = false;
	export let showCritical = false;
	export let showDead = false;
	export let setDamage = (value: number) => dispatch('set-damage', value);
	export let setCritical = (value: boolean) => dispatch('set-critical', value);
	export let setDead = (value: boolean) => dispatch('set-dead', value);

	$: healthBoxes = () => {
		const boxes = [];
		let count = 0;

		for (const card of playCards ?? []) {
			if (!card) {
				continue;
			}

			for (let i = 0; i < card.job.health; i++) {
				count += 1;
				boxes.push({ job: card.job, value: count });
			}
		}

		return boxes;
	};
</script>

<div>
	<p class="font-display font-bold">Damage:</p>
	<div class="w-full flex flex-col md:flex-row gap-1">
		<div class="flex flex-row w-full gap-1 items-start">
			{#each healthBoxes() as box}
				<Checkbox
					color={getJobColor(box.job.name)}
					checked={(damage ?? 0) >= box.value}
					on:checked={() => {
						if (!readonly) {
							setDamage(box.value);
						}
					}}
					aria-label={`Set character health to ${box.value}`}
					{readonly}
				/>
			{/each}
		</div>

		{#if showCritical || showDead}
			<div class="relative hidden lg:block shrink-0 w-[2px] h-7 lg:h-8 bg-black -top-1 ml-2" />
		{/if}

		<div class="flex flex-row gap-1 lg:mt-0">
			{#if showCritical}
				<span class="flex flex-col w-9 items-center">
					<Checkbox
						color="amber"
						checked={critical}
						on:checked={() => {
							if (!readonly) {
								setCritical(!critical);
							}
						}}
						aria-label={`Set character as critical to: ${!critical}`}
						{readonly}
					/>
					<p class="text-xs p-0.5">crit.</p>
				</span>
			{/if}
			{#if showDead}
				<span class="flex flex-col w-9 items-center">
					<Checkbox
						checked={dead}
						color="rose"
						on:checked={() => {
							if (!readonly) {
								setDead(!dead);
							}
						}}
						aria-label={`Set character as dead to: ${!dead}`}
						{readonly}
					/>
					<p class="text-xs p-0.5">dead</p>
				</span>
			{/if}
		</div>
	</div>
</div>

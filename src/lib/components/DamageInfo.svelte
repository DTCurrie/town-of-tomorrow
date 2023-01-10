<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { PlayCards } from '$lib/db';
	import classNames from 'classnames';
	import { getJobColorClass } from '$lib/play-cards';

	const dispatch = createEventDispatcher();

	export let damage: number = 0;
	export let critical = false;
	export let dead = false;
	export let playCards: PlayCards | undefined;
	export let readonly = false;
	export let setDamage = (value: number) => dispatch('set-damage', value);
	export let setCritical = (value: boolean) => dispatch('set-critical', value);
	export let setDead = (value: boolean) => dispatch('set-dead', value);

	$: healthBoxes = () => {
		const boxes = [];
		let count = 0;

		for (const card of playCards ?? []) {
			if (card === null) {
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
	<p class="font-bold">Damage:</p>
	<div class="w-full flex flex-col md:flex-row gap-1 mt-2">
		<div class="flex flex-row gap-1">
			{#each healthBoxes() as box}
				<input
					type="checkbox"
					checked={(damage ?? 0) >= box.value}
					on:click|preventDefault={() => {
						if (!readonly) {
							setDamage(box.value);
						}
					}}
					aria-label={`Set character health to ${box.value}`}
					{readonly}
					aria-readonly={readonly}
					class={classNames(
						`appearance-none flex-shrink-0 w-5 lg:w-6 h-5 lg:h-6 border-2 overflow-x-hidden truncate`,
						damage < box.value ? 'bg-white' : getJobColorClass('bg', box.job),
						getJobColorClass('border', box.job)
					)}
				/>
			{/each}
		</div>

		<div class="relative hidden lg:block shrink-0 w-[2px] h-7 lg:h-8 bg-black -top-1" />

		<div class="flex flex-row gap-1 mt-2 lg:mt-0">
			<span class="flex flex-col w-9 items-center">
				<input
					type="checkbox"
					checked={critical}
					on:click|preventDefault={() => {
						if (!readonly) {
							setCritical(!critical);
						}
					}}
					aria-label={`Set character as critical to: ${!critical}`}
					{readonly}
					aria-readonly={readonly}
					class={classNames(
						`appearance-none flex-shrink-0 w-5 lg:w-6 h-5 lg:h-6 border-2 border-orange-500 overflow-x-hidden truncate`,
						!critical ? 'bg-white' : 'bg-orange-500'
					)}
				/>
				<p class="text-xs p-0.5">crit.</p>
			</span>
			<span class="flex flex-col w-9 items-center">
				<input
					type="checkbox"
					checked={dead}
					on:click|preventDefault={() => {
						if (!readonly) {
							setDead(!dead);
						}
					}}
					aria-label={`Set character as dead to: ${!dead}`}
					{readonly}
					aria-readonly={readonly}
					class={classNames(
						`appearance-none flex-shrink-0 w-5 lg:w-6 h-5 lg:h-6 border-2 border-red-500 overflow-x-hidden truncate`,
						!dead ? 'bg-white' : 'bg-red-500'
					)}
				/>
				<p class="text-xs p-0.5">dead</p>
			</span>
		</div>
	</div>
</div>

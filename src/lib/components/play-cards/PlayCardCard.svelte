<script lang="ts">
	import classNames from 'classnames';

	import type { PlayCard } from '$lib/db';
	import { getJobColorClass } from '$lib/play-cards';

	export let playCard: PlayCard;

	export let select: () => void;
</script>

<button
	class={classNames(
		'flex flex-col w-full h-full text-left text-white rounded-lg  p-2 shadow',
		getJobColorClass('bg', playCard.job)
	)}
	on:click|preventDefault={select}
>
	<p class="font-display font-bold w-full overflow-x-hidden truncate">
		{playCard.name}
	</p>

	<p class="italic">
		{playCard.job.name} (+{playCard.job.health} Health)
	</p>

	<ul class="flex flex-col w-full max-w-full list-disc pl-4">
		{#each playCard.bonusQuestions as question}
			<li class="overflow-x-hidden truncate">{question}</li>
		{/each}
	</ul>

	<ul class="flex flex-row gap-1">
		{#each playCard.unlockables as unlockable}
			<li class={classNames('border-b-2 py-0.5 px-1 border-white text-white')}>
				{unlockable.name}
			</li>
		{/each}
	</ul>
</button>

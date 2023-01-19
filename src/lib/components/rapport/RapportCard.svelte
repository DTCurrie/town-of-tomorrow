<script lang="ts">
	import type { Character, Rapport } from '$lib/db';
	import { rapportValues } from '$lib/rapport';
	import classNames from 'classnames';

	export let rapport: Rapport;

	export let select: () => void;
</script>

<button
	class="flex w-full text-left bg-white rounded-lg p-2 shadow"
	on:click|preventDefault={select}
>
	<div class="flex flex-col w-full">
		<p class="font-display font-bold w-40 overflow-hidden truncate">
			{rapport.name}
		</p>

		<ul class="flex flex-row gap-1 list-none w-full">
			{#each rapportValues() as value}
				<li class="flex w-4 lg:w-6">
					<label class="flex flex-col justify-center items-center">
						<input
							type="radio"
							name={`${rapport.name}|${value}`}
							{value}
							checked={rapport.value === value}
							class={classNames(
								`appearance-none flex-shrink-0 border-2 border-gray-500 w-4 lg:w-6 h-4 lg:h-6`,
								rapport.value !== value ? 'bg-white' : 'bg-gray-500'
							)}
							readonly
						/>
						<p class="font-bold text-sm text-center">{value}</p>
					</label>
				</li>
			{/each}
		</ul>
	</div>
</button>

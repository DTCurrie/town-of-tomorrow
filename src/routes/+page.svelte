<script lang="ts">
	import { liveQuery } from 'dexie';
	import classnames from 'classnames';
	import { browser } from '$app/environment';
	import { db } from '../db';
	import { DateTime } from 'luxon';
	import { playCards } from '$lib/play-cards';

	$: characters = liveQuery(() => (browser ? db.characters.toArray() : []));
</script>

{#if $characters}
	<h1 class="text-2xl font-bold">Your Characters</h1>
	{#each $characters as character (character.id)}
		<div class="p-4">
			<div class="flex flex-row">
				<div class="w-20 h-20 mr-2 flex-shrink-0">
					{#if character.avatar}
						<img
							alt="{character.name}'s avatar"
							class="w-full h-full object-cover rounded-full"
							src={character.avatar}
						/>
					{:else}
						<div class="border-gray-700 border-2 p-2 rounded-full">
							<svg
								class="text-gray-700"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1"
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
						</div>
					{/if}
				</div>
				<div class="flex flex-col w-full justify center p-2">
					<h3 class="text-lg font-medium text-gray-900">
						<a href={`/characters/${character.id}`} class="underline hover:no-underline font-bold"
							>{character.name}</a
						>
						•
						<time>{DateTime.fromJSDate(character.createdOn).toFormat('dd LLL yyyy')}</time>
					</h3>
					<p>
						{character.description}
					</p>
					<p class="font-bold">Pitfalls:</p>
					<ul class="list-disc pl-8">
						<p class="list-item text-sm text-gray-500">
							{character.pitfall}
						</p>
						<p class="list-item text-sm text-gray-500">
							{character.customPitfall}
						</p>
					</ul>
				</div>
			</div>
			<div class="mt-4 flex gap-2">
				{#each character.playCards as playCard}
					{#if playCard}
						<span
							class={classnames({
								['inline-flex justify-center items-center gap-1 rounded-full px-2 py-1 text-xs text-white']: true,
								[`bg-green-800`]: playCard.job.name === 'Detective',
								[`bg-orange-800`]: playCard.job.name === 'Liason',
								[`bg-red-800`]: playCard.job.name === 'Specialist',
								[`bg-blue-800`]: playCard.job.name === 'Hot Shot',
								[`bg-purple-800`]: playCard.job.name === 'Sage'
							})}
						>
							{playCard.name}
						</span>
					{/if}
				{/each}
			</div>
		</div>
	{/each}
{/if}

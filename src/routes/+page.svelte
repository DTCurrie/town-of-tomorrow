<script lang="ts">
	import { DateTime } from 'luxon';
	import { browser } from '$app/environment';
	import { db, type Character } from '$lib/db';
	import { liveQuery, type Observable } from 'dexie';
	import { getJobColorClass } from '$lib/play-cards';
	import Avatar from '$lib/components/Avatar.svelte';
	import classNames from 'classnames';

	$: characters = liveQuery(async () => {
		return browser ? await db.characters.toArray() : [];
	}) as Observable<Character[]>;
</script>

{#if $characters}
	<h1 class="text-2xl font-bold">Your Characters</h1>
	<div class="grid gap-2 md:grid-cols-2 lg:grid-cols-3 w-full">
		{#each $characters as character (character.id)}
			<div class="flex flex-col w-full p-2 rounded-lg bg-white shadow">
				<div class="flex flex-row">
					<div
						class={classNames(
							'w-16 h-16 flex-shrink-0 rounded-full border-4',
							character.playCards[0] && getJobColorClass('border-t', character.playCards[0].job),
							character.playCards[1] && getJobColorClass('border-r', character.playCards[1].job),
							character.playCards[2] && getJobColorClass('border-b', character.playCards[2].job),
							character.playCards[3] && getJobColorClass('border-l', character.playCards[3].job)
						)}
					>
						{#if character.avatar}
							<img
								alt="{character.name}'s avatar"
								class="w-full h-full object-cover rounded-full border-2 border-transparent"
								src={character.avatar}
							/>
						{:else}
							<div class="w-full h-full border-2 border-transparent">
								<Avatar
									id={character.id || 0}
									name={character.name}
									classes="w-full h-full"
									textClasses="text-2xl"
								/>
							</div>
						{/if}
					</div>
					<div class="flex flex-col w-full justify-center p-2">
						<h3 class="flex flex-col gap-1 font-bold">
							<a
								href={`/characters/${character.id}`}
								class="underline hover:no-underline font-bold overflow-x-hidden truncate"
							>
								{character.name}
							</a>
							<time class="text-sm text-gray-700"
								>{DateTime.fromJSDate(character.createdOn).toFormat('dd LLL yyyy')}</time
							>
						</h3>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}

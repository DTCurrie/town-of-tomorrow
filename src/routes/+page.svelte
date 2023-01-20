<script lang="ts">
	import classNames from 'classnames';
	import { DateTime } from 'luxon';

	import { goto } from '$app/navigation';

	import { getJobColorClass } from '$lib/play-cards';

	import Avatar from '$lib/elements/Avatar.svelte';
	import Button from '$lib/elements/Button.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	$: characters = data.characters;
</script>

{#if $characters}
	<h1 class="text-2xl font-bold">Your Characters</h1>
	<div class="grid gap-2 md:grid-cols-2 lg:grid-cols-3 w-full">
		<Button
			classes="w-full h-full min-h-[5rem] rounded-lg"
			color="lime"
			on:click={() => goto('/characters/create')}
		>
			Create Character
		</Button>
		{#each $characters as character (character.id)}
			<button
				class="flex flex-col w-full p-2 rounded-lg bg-white shadow group"
				on:click={() => goto(`/characters/${character.id}`)}
			>
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
							<p class="underline group-hover:no-underline font-bold overflow-x-hidden truncate">
								{character.name}
							</p>
							<time class="text-sm text-gray-700"
								>{DateTime.fromJSDate(character.createdOn).toFormat('dd LLL yyyy')}</time
							>
						</h3>
					</div>
				</div>
			</button>
		{/each}
	</div>
{/if}

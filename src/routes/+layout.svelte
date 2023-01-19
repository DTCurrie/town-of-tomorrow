<script lang="ts">
	import classNames from 'classnames';

	import { page } from '$app/stores';

	import { getJobColorClass } from '$lib/play-cards';

	import AddPerson from '$lib/elements/icons/AddPerson.svelte';
	import Chevron from '$lib/elements/icons/Chevron.svelte';
	import People from '$lib/elements/icons/People.svelte';
	import Avatar from '$lib/elements/Avatar.svelte';
	import Pattern from '$lib/elements/Pattern.svelte';

	import type { LayoutData } from './$types';
	import '../app.css';

	export let data: LayoutData;

	let expanded = false;

	const getUrlMatch = (id?: number) => new RegExp(`/characters/${id}$`, 'gi');

	$: characters = data.characters;
</script>

<div class="relative flex flex-row w-full h-full overflow-hidden antialiased">
	<Pattern />
	<div
		class="fixed h-full min-h-screen max-h-screen overflow-y-auto flex flex-col flex-shrink-0 flex-grow antialiased z-50"
	>
		<div
			id="sidebar"
			class={classNames(
				'flex flex-col top-0 left-0 bg-pattern h-full border-r shadow-lg transition-all duration-[250ms] ease-out',
				{
					'w-64': expanded,
					'w-16 lg:w-20': !expanded
				}
			)}
			aria-expanded={expanded ? 'true' : false}
		>
			<div class="overflow-y-auto overflow-x-hidden flex-grow">
				<ul class="flex flex-col gap-1 py-2 lg:py-4">
					<li>
						<button
							class="flex flex-row items-center px-2 lg:px-4 w-full h-11 border-l-4 border-transparent hover:border-gray-800"
							on:click|preventDefault={() => (expanded = !expanded)}
							aria-label="expand"
							aria-controls="sidebar"
						>
							<span
								class={classNames(
									'w-11 h-11 ml-auto inline-flex justify-center items-center transition-all duration-[250ms] ease-out',
									{
										'-rotate-90': expanded,
										'rotate-90': !expanded
									}
								)}
							>
								<Chevron />
							</span>
						</button>
					</li>
					<li>
						<a
							href="/"
							class={classNames(
								'relative flex flex-row items-center px-2 lg:px-4 h-11 border-l-4 border-transparent hover:border-gray-800',
								{
									['text-gray-800 border-gray-800']: $page.url.pathname === '/'
								}
							)}
							title="Your Characters"
						>
							<span class="w-11 h-11 inline-flex justify-center items-center shrink-0">
								<People />
							</span>
							<span
								class={classNames(
									'ml-2 font-display font-bold text-sm tracking-wide truncate transition-all duration-[250ms] ease-out',
									{
										hidden: !expanded
									}
								)}>Your Characters</span
							>
						</a>
					</li>
					<li>
						<a
							href="/create"
							class={classNames(
								'relative flex flex-row items-center px-2 lg:px-4 h-11 border-l-4 border-transparent hover:border-gray-800',
								{
									['text-gray-800 border-gray-800']: $page.url.pathname.includes('/create')
								}
							)}
							title="Make a Character"
						>
							<span class="w-11 h-11 inline-flex justify-center items-center">
								<AddPerson color="lime" />
							</span>
							<span
								class={classNames(
									'ml-2 font-display font-bold text-sm tracking-wide truncate transition-all duration-[250ms] ease-out',
									{
										hidden: !expanded
									}
								)}>Make a Character</span
							>
						</a>
					</li>
					{#if $characters}
						{#each $characters as character (character.id)}
							<li>
								<a
									href={`/characters/${character.id}`}
									class={classNames(
										'relative flex flex-row items-center px-2 lg:px-4 border-l-4 border-transparent hover:border-gray-800',
										{
											['text-gray-800 border-gray-800']: $page.url.pathname.match(
												getUrlMatch(character.id)
											)
										}
									)}
									title={character.name}
								>
									<span class="inline-flex justify-center items-center">
										<div
											class={classNames(
												'w-11 h-11 rounded-full border-4',
												character.playCards[0] &&
													getJobColorClass('border-t', character.playCards[0].job),
												character.playCards[1] &&
													getJobColorClass('border-r', character.playCards[1].job),
												character.playCards[2] &&
													getJobColorClass('border-b', character.playCards[2].job),
												character.playCards[3] &&
													getJobColorClass('border-l', character.playCards[3].job)
											)}
										>
											{#if character.avatar}
												<img
													alt={`${character.name}'s avatar'`}
													src={character.avatar}
													class="w-full h-full object-cover rounded-full border-2 border-transparent"
												/>
											{:else}
												<div class="w-full h-full border-2 border-transparent">
													<Avatar
														id={character.id || 0}
														name={character.name}
														classes="w-full h-full"
													/>
												</div>
											{/if}
										</div>
									</span>
									<span
										class={classNames(
											'ml-2 font-display font-bold text-sm tracking-wide truncate transition-all duration-[250ms] ease-out',
											{
												hidden: !expanded
											}
										)}>{character.name}</span
									>
								</a>
							</li>
						{/each}
					{/if}
				</ul>
			</div>
		</div>
	</div>
	<main
		class="block w-full h-full max-w-screen-xl ml-auto mr-auto p-2 lg:p-4 pl-[72px] lg:pl-[96px] z-10"
	>
		<slot />
	</main>
</div>

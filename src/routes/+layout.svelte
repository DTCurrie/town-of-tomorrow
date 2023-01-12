<script lang="ts">
	import classnames from 'classnames';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { db, type Character } from '$lib/db';
	import AddPerson from '$lib/components/icons/AddPerson.svelte';
	import Chevron from '$lib/components/icons/Chevron.svelte';
	import People from '$lib/components/icons/People.svelte';
	import '../app.css';
	import { liveQuery, type Observable } from 'dexie';
	import classNames from 'classnames';
	import Avatar from '$lib/components/Avatar.svelte';
	import { getJobColorClass } from '$lib/play-cards';

	let expanded = false;

	const getUrlMatch = (id?: number) => new RegExp(`/characters/${id}$`, 'gi');

	$: characters = liveQuery(async () => {
		return browser ? await db.characters.toArray() : [];
	}) as Observable<Character[]>;
</script>

<div class="relative flex flex-row w-full h-full overflow-hidden antialiased">
	<div class="fixed bg-pattern bg-repeat w-screen h-screen z-0 opacity-50" />
	<div class="fixed h-screen flex flex-col flex-shrink-0 flex-grow antialiased z-50">
		<div
			id="sidebar"
			class={classnames(
				'flex flex-col top-0 left-0 w-auto bg-pattern h-full border-r shadow-lg shadow-slate-400 transition-all duration-[250ms] ease-out',
				{
					'w-64': expanded
				}
			)}
			aria-expanded={expanded ? 'true' : false}
		>
			<div class="overflow-y-auto overflow-x-hidden flex-grow">
				<ul class="flex flex-col gap-1 py-2 lg:py-4">
					<li>
						<button
							class="relative flex flex-row items-center px-2 lg:px-4 w-full h-11 border-l-4 border-transparent hover:border-gray-800"
							on:click|preventDefault={() => (expanded = !expanded)}
							aria-label="expand"
							aria-controls="sidebar"
						>
							<span
								class={classnames(
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
							class={classnames(
								'relative flex flex-row items-center px-2 lg:px-4 h-11 border-l-4 border-transparent hover:border-gray-800',
								{
									['text-gray-800 border-gray-800']: $page.url.pathname === '/'
								}
							)}
							title="Your Characters"
						>
							<span class="w-11 h-11 inline-flex justify-center items-center">
								<People />
							</span>
							<span
								class={classnames(
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
							class={classnames(
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
								class={classnames(
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
									class={classnames(
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
										class={classnames(
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

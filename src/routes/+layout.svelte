<script lang="ts">
	import { liveQuery } from 'dexie';
	import classnames from 'classnames';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { db } from '../db';
	import '../app.css';

	$: characters = liveQuery(() => (browser ? db.characters.toArray() : []));

	const getUrlMatch = (id: number) => new RegExp(`/characters/${id}$`, 'gi');
</script>

<div class="flex flex-row w-full h-full">
	<div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased ">
		<div class="flex flex-col top-0 left-0 w-64 bg-white bg-opacity-20 h-full border-r shadow-xl">
			<div class="overflow-y-auto overflow-x-hidden flex-grow">
				<ul class="flex flex-col py-4 space-y-1">
					<li>
						<a
							href="/"
							class={classnames({
								'relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-gray-800 pr-6': true,
								['text-gray-800 border-gray-800']: $page.url.pathname === '/'
							})}
						>
							<span class="inline-flex justify-center items-center ml-4">
								<svg
									class="w-8 h-8 text-gray-800"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1"
										d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
									/>
								</svg>
							</span>
							<span class="ml-2 text-sm tracking-wide truncate">Your Characters</span>
						</a>
					</li>
					<li>
						<a
							href="/create"
							class={classnames({
								'relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-gray-800 pr-6': true,
								['text-gray-800 border-gray-800']: $page.url.pathname.includes('/create')
							})}
						>
							<span class="inline-flex justify-center items-center ml-4">
								<svg
									class="w-8 h-8 text-green-700"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1"
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									/></svg
								>
							</span>
							<span class="ml-2 text-sm tracking-wide truncate">Make a Character</span>
						</a>
					</li>
					{#if $characters}
						{#each $characters as character (character.id)}
							<li>
								<a
									href={`/characters/${character.id}`}
									class={classnames({
										'relative flex flex-row items-center h-11 focus:outline-none text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-gray-800 pr-6': true,
										['text-gray-800 border-gray-800']: $page.url.pathname.match(
											getUrlMatch(character.id)
										)
									})}
								>
									<span class="inline-flex justify-center items-center ml-4">
										{#if character.avatar}
											<img
												alt={`${character.name}'s ava tar'`}
												src={character.avatar}
												class="w-8 h-8 object-cover rounded-full border-2"
											/>
										{:else}
											<svg
												class="w-8 h-8 text-gray-700"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
												><path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="1"
													d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
												/></svg
											>
										{/if}
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">{character.name}</span>
								</a>
							</li>
						{/each}
					{/if}
				</ul>
			</div>
		</div>
	</div>
	<main class="w-full p-4">
		<slot />
	</main>
</div>

<script lang="ts">
	import SelectedPlayCardList from '$lib/components/play-cards/SelectedPlayCardList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: character = data.character;
	$: details = data.details;
</script>

<h2 class="text-xl mt-2">Play Cards:</h2>

<SelectedPlayCardList
	playCards={$character?.playCards ?? [undefined, undefined, undefined, undefined]}
	on:select-play-card={({ detail }) => ($details = detail)}
	on:add-play-card={({ detail }) => ($details = detail)}
	on:create-play-card={({ detail }) => ($details = detail)}
/>

<script lang="ts">
	import { browser } from '$app/environment';
	import { db } from '../../../db';
	import type { PageData } from './$types';

	export let data: PageData;

	$: get = async () => (browser ? await db.characters.get({ id: data.id }) : {});
</script>

{#await get() then character}
	<p>{character.name}</p>
{/await}

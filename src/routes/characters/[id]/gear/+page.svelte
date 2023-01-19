<script lang="ts">
	import { createArmor, createGear, createWeapon } from '$lib/api/characters';
	import ArmorList from '$lib/components/armor/ArmorList.svelte';
	import GearList from '$lib/components/gear/GearList.svelte';
	import NewArmor from '$lib/components/armor/NewArmor.svelte';
	import NewGear from '$lib/components/gear/NewGear.svelte';
	import NewWeapon from '$lib/components/weapons/NewWeapon.svelte';
	import WeaponList from '$lib/components/weapons/WeaponList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: character = data.character;
	$: details = data.details;
</script>

<h3 class="text-lg mt-2">Gear:</h3>

<div class="flex flex-col gap-2">
	<GearList gear={$character?.gear ?? []} on:select-gear={({ detail }) => ($details = detail)} />
	<NewGear on:create={({ detail }) => createGear($character, detail)} />
</div>

<h3 class="text-lg mt-2">Weapons:</h3>

<div class="flex flex-col gap-2">
	<WeaponList
		weapons={$character?.weapons ?? []}
		on:select-weapon={({ detail }) => ($details = detail)}
	/>
	<NewWeapon on:create={({ detail }) => createWeapon($character, detail)} />
</div>

<h3 class="text-lg mt-2">Armor:</h3>

<div class="flex flex-col gap-2">
	<ArmorList
		armor={$character?.armor ?? []}
		on:select-armor={({ detail }) => ($details = detail)}
	/>
	<NewArmor on:create={({ detail }) => createArmor($character, detail)} />
</div>

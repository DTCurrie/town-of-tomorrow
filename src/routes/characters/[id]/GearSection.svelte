<script lang="ts">
	import ArmorList from '$lib/components/ArmorList.svelte';
	import NewArmor from '$lib/components/NewArmor.svelte';
	import NewWeapon from '$lib/components/NewWeapon.svelte';
	import WeaponList from '$lib/components/WeaponList.svelte';
	import type { Armor, Character, Weapon } from '$lib/db';

	export let character: Character;

	export let editWeapon: (character: Character, weapon: Weapon, index: number) => Promise<void>;
	export let removeWeapon: (character: Character, index: number) => Promise<void>;
	export let createWeapon: (character: Character, weapon: Weapon) => Promise<void>;

	export let editArmor: (character: Character, armor: Armor, index: number) => Promise<void>;
	export let removeArmor: (character: Character, index: number) => Promise<void>;
	export let createArmor: (character: Character, armor: Armor) => Promise<void>;
</script>

<h3 class="text-lg mt-2">Weapons:</h3>

<div class="flex flex-col gap-2">
	<WeaponList
		bind:weapons={character.weapons}
		on:edit-weapon={({ detail: { weapon, index } }) => editWeapon(character, weapon, index)}
		on:remove-weapon={({ detail }) => removeWeapon(character, detail)}
	/>
	<NewWeapon on:create={({ detail }) => createWeapon(character, detail)} />
</div>

<h3 class="text-lg mt-2">Armor:</h3>

<div class="flex flex-col gap-2">
	<ArmorList
		bind:armor={character.armor}
		on:edit-armor={({ detail: { piece, index } }) => editArmor(character, piece, index)}
		on:remove-armor={({ detail }) => removeArmor(character, detail)}
	/>
	<NewArmor on:create={({ detail }) => createArmor(character, detail)} />
</div>

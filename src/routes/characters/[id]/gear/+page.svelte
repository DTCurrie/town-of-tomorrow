<script lang="ts">
	import { logError } from '$lib/logs';
	import { errorToast, successToast } from '$lib/toast';

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
	<NewGear
		on:create={async ({ detail }) => {
			try {
				await createGear($character, detail);
				successToast(`Created ${detail.name}!`);
			} catch (error) {
				logError('Error creating Gear', false, { detail, character });
				errorToast('Error creating Gear, please try again!');
			}
		}}
	/>
</div>

<h3 class="text-lg mt-2">Weapons:</h3>

<div class="flex flex-col gap-2">
	<WeaponList
		weapons={$character?.weapons ?? []}
		on:select-weapon={({ detail }) => ($details = detail)}
	/>
	<NewWeapon
		on:create={async ({ detail }) => {
			try {
				await createWeapon($character, detail);
				successToast(`Updated ${detail.name}!`);
			} catch (error) {
				logError('Error creating Weapon', false, { detail, character });
				errorToast('Error creating Weapon, please try again!');
			}
		}}
	/>
</div>

<h3 class="text-lg mt-2">Armor:</h3>

<div class="flex flex-col gap-2">
	<ArmorList
		armor={$character?.armor ?? []}
		on:select-armor={({ detail }) => ($details = detail)}
	/>
	<NewArmor
		on:create={async ({ detail }) => {
			try {
				await createArmor($character, detail);
				successToast(`Updated ${detail.name}!`);
			} catch (error) {
				logError('Error creating Armor', false, { detail, character });
				errorToast('Error creating Armor, please try again!');
			}
		}}
	/>
</div>

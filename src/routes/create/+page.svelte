<script lang="ts">
	import { goto } from '$app/navigation';

	import { createCharacter } from '$lib/api/characters';

	import type { Armor, Gear, PlayCard, PlayCards, Rapport, Unlockable, Weapon } from '$lib/db';

	import ArmorList from '$lib/components/armor/ArmorList.svelte';
	import NewArmor from '$lib/components/armor/NewArmor.svelte';

	import GearList from '$lib/components/gear/GearList.svelte';
	import NewGear from '$lib/components/gear/NewGear.svelte';

	import PlayCardInput from '$lib/components/play-cards/PlayCardInput.svelte';

	import NewWeapon from '$lib/components/weapons/NewWeapon.svelte';
	import WeaponList from '$lib/components/weapons/WeaponList.svelte';

	import DamageInfo from '$lib/components/DamageInfo.svelte';

	import TextInput from '$lib/elements/inputs/TextInput.svelte';
	import Textarea from '$lib/elements/inputs/Textarea.svelte';
	import UrlInput from '$lib/elements/inputs/UrlInput.svelte';
	import Button from '$lib/elements/Button.svelte';

	import { log } from '$lib/logs';
	import { getOthers } from '$lib/play-cards';

	let status = '';

	let name = '';
	let description = '';
	let fieldOfStudy = '';
	let pitfall = '';
	let avatar = '';

	let playCardSlots: [PlayCard | undefined, PlayCard | undefined, PlayCard | undefined] = [
		undefined,
		undefined,
		undefined
	];
	let allPlayCards: PlayCards = [undefined, undefined, undefined, undefined];

	let unlockable: Unlockable | undefined;

	let ally: Rapport = { name: '', value: 2, description: '', overflow: false };
	let rival: Rapport = { name: '', value: -2, description: '', overflow: false };

	let gear: Gear[] = [];
	let weapons: Weapon[] = [];
	let armor: Armor[] = [];

	$: selectedCards = allPlayCards.reduce<PlayCard[]>(
		(array, card) => (card ? [...array, card] : array),
		[]
	);

	$: avatarUrl = `https://api.dicebear.com/5.x/micah/svg?seed=${encodeURIComponent(name)}?size=96`;

	$: {
		if (name && !avatar) {
			avatar = avatarUrl;
		}
	}

	const handleUnlockable = () => {
		log('create handleUnlockable', false, { allPlayCards, unlockable });
		for (const card of allPlayCards) {
			if (!card) {
				continue;
			}

			for (const unlock of card.unlockables) {
				if (unlock.name === unlockable?.name) {
					unlockable.unlocked = true;
					return;
				}
			}
		}
	};

	const hasCardChanged = (current: PlayCard | undefined, original: PlayCard | undefined) => {
		log('create hasCardChanged', false, { current, original });
		if (!current || !original) {
			return false;
		}

		for (let i = 0; i < current.bonuses.length; i++) {
			const originalBonus = original.bonuses[i];
			if (current.bonuses[i] !== originalBonus) {
				return true;
			}
		}

		return false;
	};

	const validate = () => {
		log('create validate', false, {
			allPlayCards,
			name,
			description,
			pitfall,
			ally,
			rival,
			status
		});

		if (!allPlayCards.some((card) => !card)) {
			return (status = 'Select all of your Play Cards in step 1!');
		}

		for (let i = 0; i < playCardSlots.length; i++) {
			const card = playCardSlots[i];
			if (hasCardChanged(card, allPlayCards[i])) {
				return (status = `You have unsaved changes to your ${card?.name} Play Card in slot #${
					i + 1
				}`);
			}
		}

		if (!name || !description) {
			return (status = 'Name and describe your Character in step 2!');
		}

		if (!pitfall) {
			return (status = 'Create a Pitfall in step 4!');
		}

		if (!ally.name) {
			return (status = 'Create an Ally in step 8!');
		}

		if (!ally.description) {
			return (status = 'Describe your Ally in step 8!');
		}

		if (!rival.name) {
			return (status = 'Create a Rival in step 8!');
		}

		if (!rival.description) {
			return (status = 'Describe your Rival in step 8!');
		}

		return (status = '');
	};

	const addCharacter = async () => {
		try {
			validate();

			if (status) {
				return;
			}

			handleUnlockable();

			for (const card of allPlayCards) {
				if (!card) {
					continue;
				}

				card.merits = 0;
				card.faults = 0;
			}

			const id = await createCharacter({
				playCards: allPlayCards,
				name,
				description,
				pitfall: pitfall,
				rapport: [ally, rival],
				fieldOfStudy,
				gear,
				weapons,
				armor,
				avatar,
				damage: 0,
				xp: 0,
				notes: '',
				createdOn: new Date(Date.now())
			});

			if (id >= 0) {
				goto(`/characters/${id}`);
			} else {
				status = 'Your character could not be created, please try again!';
			}
		} catch (error) {
			status = `Failed to add ${name}: ${error}`;
		}
	};
</script>

<h1 class="text-2xl font-bold">Make a Character</h1>
<p>Follow these steps to create your Character.</p>

<form on:submit|preventDefault={addCharacter}>
	<fieldset class="mt-2">
		<legend><h2 class="text-xl">1. Pick Your Play Cards</h2></legend>

		<p class="text-sm my-1">
			Pick three Play Cards to use, choosing from the available ones or working with the Director to
			create your own. Make sure to answer all of the questions on each Play Card to establish your
			Bonuses.
		</p>

		<div class="grid lg:grid-cols-3 gap-2">
			{#each playCardSlots as _, i}
				<PlayCardInput
					bind:playCard={playCardSlots[i]}
					others={getOthers(allPlayCards, i)}
					on:saved={({ detail }) => (allPlayCards[i] = { ...detail })}
				>
					<Button
						type="submit"
						classes="w-32"
						color="lime"
						disabled={Boolean(allPlayCards[i]) &&
							!hasCardChanged(playCardSlots[i], allPlayCards[i])}
					>
						{allPlayCards[i] ? 'Save' : 'Add'} Play Card
					</Button>
				</PlayCardInput>
			{/each}
		</div>
	</fieldset>

	<fieldset class="mt-2">
		<legend><h2 class="text-xl">2. Name and Describe Your Character</h2></legend>

		<p class="text-sm my-1">
			Name your Character, and share it with the Group. You should think of some distinct
			characteristics to tell them apart from other people. Maybe it’s something about their
			appearance, the clothes they wear, or how they carry themselves.
		</p>

		<div class="flex flex-col gap-2">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-col lg:flex-row w-full items-center lg:w-1/2">
				Name:
				<TextInput type="text" bind:value={name} classes="lg:ml-2" maxlength="25" required />
			</label>
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="flex flex-col w-full  ">
				Description:
				<Textarea bind:value={description} maxlength="240" />
			</label>
		</div>
	</fieldset>

	<fieldset class="mt-2">
		<legend><h2 class="text-xl">3. Pick an Optional Field of Study</h2></legend>

		<p class="text-sm my-1">
			If your Character is or was a scientist, decide what their field of study is or if they have
			multiple.
		</p>

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="flex flex-col lg:flex-row w-full lg:items-center lg:w-1/2">
			<p class="w-36">Field of Study:</p>
			<TextInput bind:value={fieldOfStudy} maxlength="25" />
		</label>
	</fieldset>

	<fieldset class="mt-2">
		<legend><h2 class="text-xl">4. Create a Pitfall</h2></legend>

		<p class="text-sm my-1">
			Write a Pitfall for your Character. Don’t overthink it; even simple flaws can present
			themselves in many ways. Write it in the second person, for example:”You tend to get lost in
			your own thoughts, leading you to make careless mistakes.”
		</p>

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="flex flex-col w-full">
			Custom Pitfall:
			<Textarea bind:value={pitfall} maxlength="240" required />
		</label>
	</fieldset>

	<fieldset class="mt-2">
		<legend><h2 class="text-xl">5. Choose An Unlockable</h2></legend>

		<p class="text-sm my-1">Select one Unlockable from one of your Play Cards to start.</p>

		<div class="w-full flex flex-row gap-1 mt-4">
			<ul class="list-none">
				{#each selectedCards as card}
					{#each card.unlockables as option}
						<li>
							<label>
								<input
									type="radio"
									name="unlockable"
									bind:group={unlockable}
									value={option}
									required
								/>
								<span class="font-bold">{option.name}</span>
							</label>
							<p class="pl-4 text-sm">
								{option.description}
							</p>
						</li>
					{/each}
				{/each}
			</ul>
		</div>
	</fieldset>

	<fieldset class="mt-2">
		<legend><h2 class="text-xl">6. Determine Your Health</h2></legend>

		<p class="text-sm my-1">
			Your Character has a Health to the total of their Play Card’s Health. Add the Health from all
			of your Play Cards and mark that as your Character’s Health by drawing a vertical line after
			the corresponding checkbox on your Character Sheet. If you exceed this line, your Character is
			in serious trouble.
		</p>

		<DamageInfo playCards={allPlayCards} />
	</fieldset>

	<fieldset class="mt-2">
		<legend><h2 class="text-xl">7. Pick Some Starting Gear</h2></legend>

		<p class="text-sm my-1">
			At the start of the game, determine what kind of gear your Character may carry on them. Decide
			with the Director if they have any particular effect, and consider creating a custom Move for
			them when applicable.
		</p>

		<h3 class="text-lg mt-2">Gear:</h3>

		<div class="flex flex-col w-full gap-2">
			<GearList bind:gear />
			<NewGear
				on:create={(event) => {
					gear = [...gear, event.detail];
				}}
			/>
		</div>

		<h3 class="text-lg mt-2">Weapons:</h3>

		<div class="flex flex-col w-full gap-2">
			<WeaponList bind:weapons />
			<NewWeapon
				on:create={(event) => {
					weapons = [...weapons, event.detail];
				}}
			/>
		</div>

		<h3 class="text-lg mt-2">Armor:</h3>

		<div class="flex flex-col w-full gap-2">
			<ArmorList bind:armor />
			<NewArmor
				on:create={(event) => {
					armor = [...armor, event.detail];
				}}
			/>
		</div>
	</fieldset>

	<fieldset class="mt-2">
		<legend><h2 class="text-xl">8. Create Ally and Rival NPCs</h2></legend>

		<p class="text-sm my-1">
			Your Character should be a member of the Town’s community and have established relationships.
			Create an ally NPC, then create a rival NPC. Think about who the NPC is, what role they play
			in the Town, and your history with him.
		</p>

		<div class="flex flex-col lg:flex-row gap-2 items-center">
			<div class="flex flex-col gap-2">
				<p class="font-bold">Ally:</p>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="flex flex-col lg:flex-row w-full lg:items-center lg:w-1/2">
					Name:
					<TextInput bind:value={ally.name} classes="lg:ml-2" maxlength="25" required />
				</label>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="flex flex-col w-full">
					Description:
					<Textarea bind:value={ally.description} maxlength="240" required />
				</label>
			</div>

			<div class="flex flex-col gap-2">
				<p class="font-bold">Rival:</p>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="flex flex-col lg:flex-row w-full lg:items-center lg:w-1/2">
					Name:
					<TextInput bind:value={rival.name} classes="lg:ml-2" maxlength="25" required />
				</label>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="flex flex-col w-full">
					Description:
					<Textarea bind:value={rival.description} maxlength="240" required />
				</label>
			</div>
		</div>
	</fieldset>

	<fieldset class="mt-2">
		<legend><h2 class="text-xl">9. Establish Rapport</h2></legend>

		<p class="text-sm my-1">
			At the start of the game, each Player will assign the following Rapport stat scores that their
			Character has toward the other Characters:
		</p>

		<ul class="list-disc pl-8 text-sm">
			<li>+2 for the one they know best.</li>
			<li>-1 for the one they know least.</li>
			<li>+1 for all others.</li>
		</ul>

		<p class="font-bold text-sm pt-1">
			You can update your Rapport after you save your Character Sheet
		</p>
	</fieldset>

	<fieldset class="mt-2">
		<legend><h2 class="text-xl">10. Add an Optional Character Avatar</h2></legend>

		<p class="text-sm my-1">
			This must be an URL to the image. The image will <em>not</em> be hosted here.
		</p>

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			Avatar:
			<UrlInput
				bind:value={avatar}
				on:blur={() => {
					if (!avatar) {
						avatar = avatarUrl;
					}
				}}
			/>

			<img alt="avatar preview" class="w-20 h-20 object-cover rounded-full" src={avatarUrl} />
		</label>
	</fieldset>
	<div class="flex flex-col w-full mt-4">
		{#if status}
			<p class="bg-red-700 text-white p-2 mb-2">{status}</p>
		{/if}
		<Button type="submit" classes="w-64 ml-auto" color="lime" on:click={addCharacter}
			>Save Character Sheet</Button
		>
	</div>
</form>

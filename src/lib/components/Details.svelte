<script lang="ts">
	import classNames from 'classnames';

	import { clickOutside } from '$lib/click-outside';
	import type { Details } from '$lib/details';

	import Chevron from '$lib/elements/icons/Chevron.svelte';

	export let details: Details | undefined;

	const closeDetails = () => (details = undefined);
</script>

<div
	class={classNames('fixed top-0 flex flex-col z-50 transition-all duration-[250ms] ease-out', {
		'right-0 pl-[72px] lg:pl-0': details,
		'max-md:-right-full md:right-[-24rem] lg:right-[-28rem] xl:right-[-32rem]': !details
	})}
>
	<div
		id="details"
		class="flex flex-col max-md:w-full md:w-[24rem] lg:w-[28rem] xl:w-[32rem] grow-0 h-full min-h-screen max-h-screen overflow-y-auto ml-auto bg-pattern shadow-lg"
		aria-expanded={details ? 'true' : false}
		use:clickOutside={() => closeDetails()}
	>
		<button
			class="relative flex flex-row items-center w-full h-11 mr-auto border-l-4 border-transparent hover:border-gray-800"
			on:click|preventDefault={() => closeDetails()}
			aria-label="details"
			aria-controls="details"
		>
			<span class="w-11 h-11 inline-flex justify-center items-center rotate-90">
				<Chevron />
			</span>
		</button>
		<div class="flex p-2 w-full h-full">
			<slot />
		</div>
	</div>
</div>

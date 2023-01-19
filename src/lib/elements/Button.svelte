<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import classNames from 'classnames';

	const dispatch = createEventDispatcher();

	export let click = () => {
		if (!disabled) {
			dispatch('click');
		}
	};

	export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
	export let classes: string = '';
	export let color = 'gray';
	export let disabled = false;

	const defaultClasses = 'group relative h-8 overflow-hidden bg-white text-sm shadow';
	const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';

	$: getClasses = () => {
		const declared = classes.split(' ').filter((value) => value);
		const filteredClasses: string[] = [
			...defaultClasses.split(' ').map((c) => {
				const mod = c.split('-')[0];

				if (mod && declared.some((d) => d.split('-')[0] === mod)) {
					return '';
				}

				return c;
			})
		].filter((value) => value);

		return classNames(filteredClasses, declared, disabled && disabledClasses);
	};
</script>

<button {type} class={getClasses()} aria-disabled={disabled} on:click={click} {...$$restProps}>
	<div
		class={`absolute inset-0 w-2 bg-${color}-500 transition-all duration-[250ms] ease-out group-hover:w-full`}
	/>
	<span
		class="relative text-black group-hover:text-white transition-all duration-[250ms] ease-out group-hover:w-full"
		><slot /></span
	>
</button>

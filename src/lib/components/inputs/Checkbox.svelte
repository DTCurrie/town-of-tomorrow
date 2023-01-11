<script lang="ts">
	import { getColorClass, type Color } from '$lib/color';
	import classNames from 'classnames';
	import { createEventDispatcher } from 'svelte';

	export let color: Color = 'gray';
	export let checked: boolean;
	export let readonly = false;
	export let classes = '';

	const dispatch = createEventDispatcher();

	export let check = () => dispatch('checked', checked);
</script>

<input
	type="checkbox"
	bind:checked
	aria-checked={checked}
	{readonly}
	aria-readonly={readonly}
	class={classNames(
		'appearance-none flex-shrink-0 w-5 lg:w-6 h-5 lg:h-6 border-2',
		getColorClass('border', color),
		!checked ? 'bg-white' : getColorClass('bg', color),
		classes
	)}
	{...$$restProps}
	on:click={check}
/>

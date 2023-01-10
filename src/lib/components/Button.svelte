<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import classNames from 'classnames';

	const dispatch = createEventDispatcher();

	export let click = () => dispatch('click');

	export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
	export let classes: string = '';
	export let color = 'gray';
</script>

<button
	{type}
	class={classNames('group relative h-8 overflow-hidden bg-white text-sm', classes)}
	on:click={click}
	{...$$restProps}
>
	<div
		class={`absolute inset-0 w-2 bg-${color}-500 transition-all duration-[250ms] ease-out group-hover:w-full`}
	/>
	<span
		class="relative text-black group-hover:text-white transition-all duration-[250ms] ease-out group-hover:w-full"
		><slot /></span
	>
</button>

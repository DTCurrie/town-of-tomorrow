<script lang="ts">
	import classNames from 'classnames';

	export let value: any;
	export let options: [string, any][];
	export let classes = '';
	export let placeholder: string | null = 'Select an Option';
</script>

<select
	bind:value
	class={classNames(
		'w-full border border-black px-1 py-0.5 h-8 focus:border-cyan-500 focus:outline-none',
		classes
	)}
	{...$$restProps}
>
	{#if placeholder}
		<option value={''}>{placeholder}</option>
	{/if}
	{#each options as [key, value]}
		<option {value}>{key}</option>
	{/each}
</select>

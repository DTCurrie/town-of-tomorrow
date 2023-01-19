<script lang="ts">
	import { inputClasses } from './utils';

	export let value: any;
	export let options: [string, any][];
	export let classes = '';
	export let placeholder: string | null = 'Select an Option';
</script>

<select bind:value class={inputClasses(classes)} {...$$restProps}>
	{#if placeholder}
		<option value={null}>{placeholder}</option>
	{/if}
	{#each options as [k, v]}
		<option value={v}>{k}</option>
	{/each}
</select>

<script lang="ts">
	import classNames from 'classnames';

	export let value: any;
	export let classes = '';
</script>

<input
	bind:value
	type="url"
	{...$$restProps}
	class={classNames(
		'w-full border border-black px-1 py-0.5 h-8 focus:border-cyan-500 focus:outline-none',
		classes
	)}
/>

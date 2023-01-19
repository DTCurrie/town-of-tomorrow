<script lang="ts">
	import { inputClasses } from './utils';

	export let value: any;
	export let classes = '';
	export let readonly = false;
</script>

<textarea bind:value class={inputClasses(classes)} {readonly} {...$$restProps} />

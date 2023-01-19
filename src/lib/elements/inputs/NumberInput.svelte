<script lang="ts">
	import { inputClasses } from './utils';

	export let value: any;
	export let classes = '';
</script>

<input bind:value type="number" class={inputClasses(classes)} {...$$restProps} />

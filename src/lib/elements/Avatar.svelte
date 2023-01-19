<script lang="ts">
	import classNames from 'classnames';
	import { getArbitraryColorClass } from '$lib/color';

	export let id: number;
	export let name: string;
	export let classes = '';
	export let textClasses = '';
</script>

<div
	class={classNames(
		`flex rounded-full justify-center items-center p-1`,
		getArbitraryColorClass('bg', `${id}`, '300'),
		classes
	)}
>
	<p class={classNames('font-bold font-display overflow-x-hidden truncate', textClasses)}>
		{name
			.split(' ')
			.map((name) => name[0].toUpperCase())
			.join('')}
	</p>
</div>

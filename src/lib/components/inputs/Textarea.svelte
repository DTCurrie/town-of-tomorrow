<script lang="ts">
	import classNames from 'classnames';

	export let value: any;
	export let classes = '';

	const defaultClasses =
		'w-full border border-black px-1 py-0.5 h-16 focus:border-cyan-500 focus:outline-none';

	let filteredClasses: string[] = [];

	$: {
		const declared = classes.split(' ');
		filteredClasses = [
			...defaultClasses.split(' ').map((c) => {
				const mod = c.split('-')[0];

				if (mod && declared.some((d) => d.split('-')[0] === mod)) {
					return '';
				}

				return c;
			}),
			classes
		];
	}
</script>

<textarea bind:value class={classNames(filteredClasses)} {...$$restProps} />

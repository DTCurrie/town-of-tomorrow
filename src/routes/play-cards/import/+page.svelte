<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	import { error } from '$lib/logs';

	import type { PageData } from './$types';

	export let data: PageData;

	$: details = data.details;
	$: playCard = data.playCard;

	$: {
		if (browser && playCard) {
			if (!playCard.id) {
				error('Invalid Play Card', false, { playCard });
			} else {
				$details = {
					component: 'play-card-info',
					data: playCard,
					index: 0
				};

				goto(`/play-cards`);
			}
		}
	}
</script>

<div class="flex w-full h-full justify-center items-center">Importing ...</div>

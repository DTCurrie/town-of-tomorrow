<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	import { logError } from '$lib/logs';
	import { errorToast } from '$lib/toast';

	import type { PageData } from './$types';

	export let data: PageData;

	$: details = data.details;
	$: playCard = data.playCard;

	$: {
		if (browser && playCard) {
			if (!playCard.id) {
				logError('Invalid Play Card', false, { playCard });
				errorToast('Error importing Play Card, please try again!');
			} else {
				$details = {
					component: 'play-card-info',
					data: playCard,
					index: 0
				};

				goto(`/play-cards/`);
			}
		}
	}
</script>

<div class="flex w-full h-full justify-center items-center">Importing ...</div>

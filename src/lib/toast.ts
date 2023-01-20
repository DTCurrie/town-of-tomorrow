import { toast } from '@zerodevx/svelte-toast';

export const successToast = (message: string) =>
	toast.push(message, {
		theme: {
			'--toastColor': '#FFFFFF',
			'--toastBackground': 'rgb(132 204 22)',
			'--toastBarBackground': '#FFFFFF'
		}
	});

export const errorToast = (message: string) =>
	toast.push(message, {
		theme: {
			'--toastColor': '#FFFFFF',
			'--toastBackground': 'rgb(244 63 94)',
			'--toastBarBackground': '#FFFFFF'
		}
	});

const onceMap: Record<string, true> = {};

type MessageType = 'log' | 'info' | 'warn' | 'error' | 'dir';

const printMessage = (type: MessageType, message: string, once?: boolean, args: unknown[] = []) => {
	if (once) {
		const key = `${type}|${message}`;
		if (onceMap[key]) {
			return;
		}

		onceMap[key] = true;
	}

	console[type](message, ...args);
};

export const log = (message: string, once?: boolean, ...args: unknown[]) =>
	printMessage('log', message, once, args);

export const logInfo = (message: string, once?: boolean, ...args: unknown[]) =>
	printMessage('info', message, once, args);

export const logWarning = (message: string, once?: boolean, ...args: unknown[]) =>
	printMessage('warn', message, once, args);

export const logError = (message: string, once?: boolean, ...args: unknown[]) =>
	printMessage('error', message, once, args);

export const logDir = (message: string, once?: boolean, ...args: unknown[]) =>
	printMessage('dir', message, once, args);

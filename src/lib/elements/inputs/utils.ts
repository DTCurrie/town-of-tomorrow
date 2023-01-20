import classNames from 'classnames';

export const defaultClasses =
	'flex w-full border-2 border-black px-1 py-0.5 focus:border-cyan-500 focus:outline-none placeholder:text-gray-700';

export const inputClasses = (classes: string) => {
	const declared = classes.split(' ').filter((value) => value);
	const filteredClasses: string[] = [
		...defaultClasses.split(' ').map((c) => {
			const mod = c.split(/(-|:(?:.+)-)/u)[0];

			if (mod && declared.some((d) => d.split(/(-|:(?:.+)-)/u)[0] === mod)) {
				return '';
			}

			return c;
		})
	].filter((value) => value);

	return classNames(filteredClasses, declared);
};

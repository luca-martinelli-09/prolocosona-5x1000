// place files you want to import through the `$lib` alias in this folder.

import { PUBLIC_APP_NAME } from '$env/static/public';

export const title = (title?: string) => {
	const titles = [];

	if (title) {
		titles.push(title);
	}

	titles.push(PUBLIC_APP_NAME);

	return titles.join(' | ');
};

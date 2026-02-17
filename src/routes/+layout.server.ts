import { getAllFaqs } from '$lib/server/wordpress';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const faqs = getAllFaqs();

	return {
		faqs
	};
};

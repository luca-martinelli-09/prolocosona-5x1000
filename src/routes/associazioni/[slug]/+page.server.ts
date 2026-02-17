import { getAssociationBySlug } from '$lib/server/wordpress';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;

	const association = await getAssociationBySlug(slug);

	if (!association) {
		error(404, {
			message: 'Not found'
		});
	}

	return {
		association
	};
};

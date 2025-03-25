import { getAllAssociations } from '$lib/server/airtable';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const associations = getAllAssociations();

	return {
		associations
	};
};

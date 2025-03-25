import { env } from '$env/dynamic/private';
import { getAirtableBase } from '$lib/server/airtable';
import type { FAQ } from '$lib/types';
import type { LayoutServerLoad } from './$types';

async function getAllFaqs() {
	const base = getAirtableBase(env.AIRTABLE_BASE_ID);

	return (
		await base(env.AIRTABLE_FAQ_TABLE_ID)
			.select({
				view: env.AIRTABLE_FAQ_VIEW_ID
			})
			.all()
	).map((f) => f.fields as FAQ);
}

export const load: LayoutServerLoad = async () => {
	const faqs = getAllFaqs();

	return {
		faqs
	};
};

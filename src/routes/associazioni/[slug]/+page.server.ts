import { env } from '$env/dynamic/private';
import { getAirtableBase, mapAssociationContacts } from '$lib/server/airtable';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;

	const base = getAirtableBase(env.AIRTABLE_BASE_ID);

	const searchAssociation = await base(env.AIRTABLE_ASSOCIATIONS_TABLE_ID)
		.select({
			view: env.AIRTABLE_ASSOCIATIONS_VIEW_ID,
			filterByFormula: `{Permalink} = '${slug}'`
		})
		.firstPage();

	if (!searchAssociation.length) {
		error(404, {
			message: 'Not found'
		});
	}

	const association = searchAssociation[0];

	const contacts = await base(env.AIRTABLE_CONTACTS_TABLE_ID)
		.select({
			view: env.AIRTABLE_CONTACTS_VIEW_ID,
			filterByFormula: `{AssociazioneID} = '${association.id}'`
		})
		.all();

	return {
		association: mapAssociationContacts(association, contacts)
	};
};

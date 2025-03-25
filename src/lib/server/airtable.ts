import { env } from '$env/dynamic/private';
import type { Association, Contact } from '$lib/types';
import Airtable, { type FieldSet, type Record, type Records } from 'airtable';

export const getAirtableBase = (baseId: string) => {
	return new Airtable({ apiKey: env.AIRTABLE_API_KEY }).base(baseId);
};

export const mapAssociationContacts = (
	a: Record<FieldSet>,
	contacts: Records<FieldSet>
): Association => {
	const assContactsIds = a.get('Contatti');
	let assContacts: Contact[] | undefined = undefined;

	if (Array.isArray(assContactsIds)) {
		assContacts = assContactsIds.map((cId) => {
			return contacts.find((c) => c.id === cId)?.fields as Contact;
		});
	}

	const logo = a.get('Logo');

	return {
		...a.fields,
		Logo: Array.isArray(logo) && logo.length ? logo[0] : undefined,
		Contatti: assContacts
	} as unknown as Association;
};

export const getAllAssociations = async () => {
	const base = getAirtableBase(env.AIRTABLE_BASE_ID);

	const contacts = await base(env.AIRTABLE_CONTACTS_TABLE_ID)
		.select({
			view: env.AIRTABLE_CONTACTS_VIEW_ID
		})
		.all();

	const associations = await base(env.AIRTABLE_ASSOCIATIONS_TABLE_ID)
		.select({
			view: env.AIRTABLE_ASSOCIATIONS_VIEW_ID
		})
		.all();

	return associations.map((a) => mapAssociationContacts(a, contacts));
};

import { env } from '$env/dynamic/private';
import type { Association, Contact, FAQ } from '$lib/types';
import { FAQ_FALLBACK } from './faq-fallback';

const WP_API = env.WORDPRESS_API_URL;
const TAG_SLUG = '5x1000';

interface WPImage {
	url: string;
}

interface WPContactPoint {
	name: string;
	type: string;
	value: string;
}

interface WPAssociationACF {
	tax_code?: string;
	vat_code?: string;
	icon?: WPImage | false | null;
	contact_points?: WPContactPoint[] | false | null;
	gallery?: WPImage[] | false | null;
	position?: { address?: string; hamlet?: string } | null;
}

interface WPAssociation {
	slug: string;
	title: { rendered: string };
	content: { rendered: string };
	association_type?: number[];
	acf: WPAssociationACF;
}

interface WPFAQ {
	title: { rendered: string };
	content: { rendered: string };
}

function decodeHTML(html: string): string {
	// Decode named entities
	const entities: { [key: string]: string } = {
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&quot;': '"',
		'&apos;': "'",
		'&ndash;': '–',
		'&mdash;': '—',
		'&hellip;': '…'
	};

	let decoded = html;

	// Decode named entities
	for (const [entity, char] of Object.entries(entities)) {
		decoded = decoded.replaceAll(entity, char);
	}

	// Decode numeric entities (&#XXXX; and &#xXXXX;)
	decoded = decoded.replaceAll(/&#(\d+);/g, (_, dec) =>
		String.fromCodePoint(Number.parseInt(dec, 10))
	);
	decoded = decoded.replaceAll(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
		String.fromCodePoint(Number.parseInt(hex, 16))
	);

	return decoded;
}

function stripHTML(html: string): string {
	return html.replaceAll(/<[^>]*>/g, '').trim();
}

function mapContacts(points?: WPContactPoint[] | false | null): Contact[] | undefined {
	if (!points || points.length === 0) return undefined;

	return points.map((point) => ({
		name: point.name,
		type: point.type,
		value: point.value
	}));
}

function mapAssociation(post: WPAssociation, typeMap: Map<number, string>): Association {
	const tipologia = (post.association_type ?? [])
		.map((id) => typeMap.get(id))
		.filter((name): name is string => Boolean(name))
		.join(', ');

	return {
		Nome: decodeHTML(post.title.rendered),
		Permalink: post.slug,
		Logo: post.acf.icon ? { url: post.acf.icon.url } : undefined,
		CodiceFiscale: post.acf.tax_code ?? '',
		PartitaIVA: post.acf.vat_code || undefined,
		Tipologia: tipologia,
		Indirizzo: post.acf.position?.address || undefined,
		Frazione: post.acf.position?.hamlet || undefined,
		Presentazione: post.content.rendered.trim(),
		Galleria: post.acf.gallery ? post.acf.gallery.map((image) => ({ url: image.url })) : undefined,
		Contatti: mapContacts(post.acf.contact_points)
	};
}

function mapFAQ(post: WPFAQ): FAQ {
	return {
		Domanda: decodeHTML(post.title.rendered),
		Risposta: decodeHTML(stripHTML(post.content.rendered))
	};
}

// Resolve the numeric id of the "5x1000" tag so we can filter associations by it.
async function getTagId(slug: string): Promise<number | null> {
	const response = await fetch(`${WP_API}/tags?slug=${encodeURIComponent(slug)}`);
	if (!response.ok) return null;

	const tags: Array<{ id: number }> = await response.json();
	return tags[0]?.id ?? null;
}

// Build a map of association_type term id -> display name (APS, ASD, ETS, …).
async function getAssociationTypeMap(): Promise<Map<number, string>> {
	const response = await fetch(`${WP_API}/association_type?per_page=100`);
	if (!response.ok) return new Map();

	const terms: Array<{ id: number; name: string }> = await response.json();
	return new Map(terms.map((term) => [term.id, decodeHTML(term.name)]));
}

export async function getAllAssociations(): Promise<Association[]> {
	const [tagId, typeMap] = await Promise.all([getTagId(TAG_SLUG), getAssociationTypeMap()]);

	const tagFilter = tagId ? `&tags=${tagId}` : '';
	const response = await fetch(
		`${WP_API}/association?per_page=100&orderby=title&order=asc${tagFilter}`
	);
	if (!response.ok) throw new Error(`Failed to fetch associations: ${response.statusText}`);

	const posts: WPAssociation[] = await response.json();
	return posts.map((post) => mapAssociation(post, typeMap));
}

export async function getAssociationBySlug(slug: string): Promise<Association | null> {
	const [typeMap, response] = await Promise.all([
		getAssociationTypeMap(),
		fetch(`${WP_API}/association?slug=${encodeURIComponent(slug)}`)
	]);
	if (!response.ok) throw new Error(`Failed to fetch association: ${response.statusText}`);

	const posts: WPAssociation[] = await response.json();
	if (posts.length === 0) return null;

	return mapAssociation(posts[0], typeMap);
}

export async function getAllFaqs(): Promise<FAQ[]> {
	try {
		const response = await fetch(`${WP_API}/5x1000_faq?per_page=100&orderby=menu_order&order=asc`);
		if (!response.ok) throw new Error(`Failed to fetch FAQs: ${response.statusText}`);

		const posts: WPFAQ[] = await response.json();
		if (posts.length === 0) return FAQ_FALLBACK;

		return posts.map(mapFAQ);
	} catch {
		// Il recupero da WordPress è fallito: usa le FAQ di riserva.
		return FAQ_FALLBACK;
	}
}

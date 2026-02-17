import { env } from '$env/dynamic/private';
import type { Association, FAQ } from '$lib/types';

const WP_API = env.WORDPRESS_API_URL;

interface WPAssociationACF {
	Logo?: { url: string };
	CodiceFiscale: string;
	Tipologia: string;
	Indirizzo: string;
	Frazione: string;
	Finalita: string;
	CosaAbbiamoFatto?: string;
	Presentazione?: string;
	Contatti?: Array<{ nome: string; tipologia: string }>;
	Galleria?: Array<{ url: string }>;
}

interface WPAssociation {
	slug: string;
	title: { rendered: string };
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
	decoded = decoded.replaceAll(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number.parseInt(dec, 10)));
	decoded = decoded.replaceAll(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)));

	return decoded;
}

function stripHTML(html: string): string {
	return html.replaceAll(/<[^>]*>/g, '').trim();
}

function mapAssociation(post: WPAssociation): Association {
	return {
		Nome: decodeHTML(post.title.rendered),
		Permalink: post.slug,
		Logo: post.acf.Logo ? { url: post.acf.Logo.url } : undefined,
		CodiceFiscale: post.acf.CodiceFiscale,
		Tipologia: post.acf.Tipologia,
		Indirizzo: post.acf.Indirizzo,
		Frazione: post.acf.Frazione,
		Finalita: post.acf.Finalita,
		CosaAbbiamoFatto: post.acf.CosaAbbiamoFatto,
		Presentazione: post.acf.Presentazione,
		Galleria: post.acf.Galleria || undefined,
		Contatti: post.acf.Contatti
	};
}

function mapFAQ(post: WPFAQ): FAQ {
	return {
		Domanda: decodeHTML(post.title.rendered),
		Risposta: decodeHTML(stripHTML(post.content.rendered))
	};
}

export async function getAllAssociations(): Promise<Association[]> {
	const response = await fetch(`${WP_API}/5x1000?per_page=100&orderby=menu_order&order=asc`);
	if (!response.ok) throw new Error(`Failed to fetch associations: ${response.statusText}`);

	const posts: WPAssociation[] = await response.json();
	return posts.map(mapAssociation);
}

export async function getAssociationBySlug(slug: string): Promise<Association | null> {
	const response = await fetch(`${WP_API}/5x1000?slug=${encodeURIComponent(slug)}&orderby=menu_order&order=asc`);
	if (!response.ok) throw new Error(`Failed to fetch association: ${response.statusText}`);

	const posts: WPAssociation[] = await response.json();
	if (posts.length === 0) return null;

	return mapAssociation(posts[0]);
}

export async function getAllFaqs(): Promise<FAQ[]> {
	const response = await fetch(`${WP_API}/5x1000_faq?per_page=100&orderby=menu_order&order=asc`);
	if (!response.ok) throw new Error(`Failed to fetch FAQs: ${response.statusText}`);

	const posts: WPFAQ[] = await response.json();
	return posts.map(mapFAQ);
}

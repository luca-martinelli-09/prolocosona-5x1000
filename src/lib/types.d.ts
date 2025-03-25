import type { Attachment } from 'airtable';

export type Contact = {
	Nome: string;
	Tipologia: string;
	Valore?: string;
};

export type Association = {
	Nome: string;
	Permalink: string;
	Logo: Attachment;
	CodiceFiscale: string;
	Tipologia: string;
	Indirizzo: string;
	Frazione: string;
	Finalita: string;
	CosaAbbiamoFatto?: string;
	Presentazione?: string;
	Galleria?: Attachment[];
	Contatti?: Contact[];
};

export type FAQ = {
	Domanda: string;
	Risposta: string;
};

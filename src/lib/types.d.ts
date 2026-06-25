export type Contact = {
	name: string;
	type: string;
	value: string;
};

export type ImageField = {
	url: string;
};

export type Association = {
	Nome: string;
	Permalink: string;
	Logo?: ImageField;
	CodiceFiscale: string;
	PartitaIVA?: string;
	Tipologia: string;
	Indirizzo?: string;
	Frazione?: string;
	Presentazione?: string;
	Galleria?: ImageField[];
	Contatti?: Contact[];
};

export type FAQ = {
	Domanda: string;
	Risposta: string;
};

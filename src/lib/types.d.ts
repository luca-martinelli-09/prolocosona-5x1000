export type Contact = {
	nome: string;
	tipologia: string;
};

export type ImageField = {
	url: string;
};

export type Association = {
	Nome: string;
	Permalink: string;
	Logo?: ImageField;
	CodiceFiscale: string;
	Tipologia: string;
	Indirizzo: string;
	Frazione: string;
	Finalita: string;
	CosaAbbiamoFatto?: string;
	Presentazione?: string;
	Galleria?: ImageField[];
	Contatti?: Contact[];
};

export type FAQ = {
	Domanda: string;
	Risposta: string;
};

import type { FAQ } from '$lib/types';

// FAQ di riserva usate quando il recupero da WordPress fallisce.
// Fonte: 5x1000_faq.csv
export const FAQ_FALLBACK: FAQ[] = [
	{
		Domanda: 'Non faccio la Dichiarazione dei Redditi. Posso comunque donare il 5×1000?',
		Risposta:
			"Certo che sì! Se ricevi la Certificazione Unica (l'ex CUD) dal tuo datore di lavoro o dall'INPS, trovi nelle ultime pagine una scheda apposita. Compilala, mettila in una busta e portala in posta: la trasmetteranno all'Agenzia delle Entrate senza nessun costo per te."
	},
	{
		Domanda: 'Posso donare il 5×1000 a più associazioni?',
		Risposta:
			'No, puoi scegliere un solo beneficiario per il 5×1000. Ma se conosci più realtà del territorio che meriterebbe di sostenere, niente ti impedisce di aiutarle con una donazione diretta, quella è sempre libera!'
	},
	{
		Domanda: 'Devolvere il 5×1000 mi costa qualcosa?',
		Risposta:
			"Assolutamente no. Il 5×1000 non è una spesa in più: è già una quota dell'IRPEF che paghi comunque. L'unica differenza è che sei tu a decidere dove va a finire. Se non firmi, quei soldi restano allo Stato e vengono distribuiti come meglio crede. Quindi tanto vale che la scelta la faccia tu, giusto?"
	},
	{
		Domanda: 'Se non firmo, quei soldi mi restano?',
		Risposta:
			"No, purtroppo no. Quella quota dell'IRPEF la paghi in ogni caso. Se non scegli a chi destinarla, la decide lo Stato al posto tuo. Pochissimi secondi per firmare possono fare una differenza vera per chi lavora ogni giorno nella tua comunità."
	},
	{
		Domanda: 'Come faccio a donare il 5×1000?',
		Risposta: `È più semplice di quanto pensi. Se fai la Dichiarazione dei Redditi (modello 730 o Redditi PF), basta scrivere il codice fiscale dell'associazione che hai scelto nel riquadro "Sostegno del volontariato" e mettere la tua firma.

Se invece non presenti la dichiarazione, puoi comunque partecipare grazie alla scheda allegata alla tua Certificazione Unica:

- Compila la sezione "Scelta per la destinazione del Cinque per Mille"
- Inseriscila in una busta chiusa con scritto sopra il tuo nome, cognome e la dicitura "Scelta per la destinazione dell'8, 5 e 2 per mille"
- Portala all'ufficio postale — l'invio è completamente gratuito!`
	},
	{
		Domanda: "Posso donare sia il 5×1000 che l'8×1000?",
		Risposta:
			"Sì, sono due scelte del tutto indipendenti! Con il 5×1000 sostieni un'associazione del territorio, con l'8×1000 scegli a chi destinare quella quota (confessioni religiose o Stato). Se vuoi, puoi anche firmare per il 2×1000. Tre firme, tre scelte: ognuna conta."
	}
];

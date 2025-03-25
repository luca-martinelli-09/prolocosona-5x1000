<script lang="ts">
	import Masonry from 'svelte-bricks';
	import AssociationCard from '../components/AssociationCard.svelte';
	import Border from '../components/Border.svelte';
	import HeroSection from '../components/HeroSection.svelte';
	import BackgroundSona from '../components/images/BackgroundSona.svelte';
	import Seo from '../components/Seo.svelte';
	import Button from '../components/ui/Button.svelte';
	import Card from '../components/ui/Card.svelte';
	import Skeleton from '../components/ui/Skeleton.svelte';
	import H1 from '../components/ui/titles/H1.svelte';
	import H2 from '../components/ui/titles/H2.svelte';
	import Subtitle from '../components/ui/titles/Subtitle.svelte';
	import type { PageProps } from './$types';

	type $Props = PageProps;

	const { data }: $Props = $props();

	const { associations } = $derived(data);
</script>

<Seo title="Home" />

<HeroSection
	class="to-primary from-primary-300 rounded-lg bg-gradient-to-bl py-32 lg:py-72"
	withBorder
>
	{#snippet children()}
		<div class="text-primary-foreground max-w-7xl space-y-10">
			<H1>
				Dona il tuo <span class="font-serif italic">5x1000</span> alle associazioni del
				<span class="font-serif italic">Comune di Sona</span>
			</H1>
			<Subtitle>
				Contribuisci <strong>senza costi aggiuntivi</strong> e sostieni i progetti che rendono
				<strong>migliore il tuo territorio</strong>.
			</Subtitle>
			<a href="/#come-funziona">
				<Button>Scopri come funziona</Button>
			</a>
		</div>
	{/snippet}

	{#snippet background()}
		<div
			class="pointer-events-none absolute right-0 bottom-0 w-[150%] translate-x-[20%] translate-y-[10%] opacity-20 mix-blend-luminosity lg:w-[100%]"
		>
			<BackgroundSona class="h-full w-full" />
		</div>
		<Border size="20px" />
	{/snippet}
</HeroSection>

<span id="come-funziona"></span>
<HeroSection>
	<H2>Come funziona</H2>
	<div class="mt-10 grid gap-5 lg:grid-cols-4">
		<Card class="lg:col-span-2" title="Scegli un'organizzazione" icon="🖊️">
			Individua un’organizzazione no profit che vuoi sostenere, informati sui suoi progetti e prendi
			nota del suo <strong>Codice Fiscale</strong>. Questo codice sarà necessario per destinare il
			tuo 5x1000 nella dichiarazione dei redditi.
		</Card>
		<Card class="lg:col-span-2" title="Compila la dichiarazione" icon="📄">
			Quando presenti la dichiarazione dei redditi (modello 730, Redditi PF o CU), cerca la sezione
			dedicata al <strong>5x1000</strong>. Firma nel riquadro corrispondente alla categoria
			dell'ente scelto e inserisci il <strong>Codice Fiscale</strong> dell’associazione che vuoi supportare.
		</Card>
		<Card class="lg:col-span-2" title="Sostieni senza costi" icon="💰">
			Donare il <strong>5x1000</strong> non comporta alcuna spesa per te. Non è una tassa aggiuntiva,
			ma una parte dell'IRPEF che già paghi e che lo Stato, su tua indicazione, può destinare a realtà
			del Terzo Settore e a iniziative di utilità sociale.
		</Card>
		<Card class="lg:col-span-2" title="Fai conoscere l'opportunità" icon="📢">
			Aiuta a diffondere questa possibilità tra amici, familiari e colleghi. Più persone scelgono di
			destinare il proprio <strong>5x1000</strong>, maggiore sarà il supporto per le associazioni
			locali e i loro progetti sul territorio.
		</Card>
		<Card class="lg:col-span-4" title="Aiuta il tuo territorio" icon="🏡">
			Scegliendo di donare il <strong>5x1000</strong> alle associazioni del tuo comune, contribuisci
			in modo concreto al miglioramento della tua comunità. I fondi raccolti finanziano servizi, iniziative
			sociali e progetti che rispondono alle esigenze del territorio.
		</Card>
		<Card class="lg:col-span-4" title="Altri dubbi?" icon="❓">
			Consulta la sezione <a class="text-link font-bold" href="/#faq"
				>domande più frequenti (F.A.Q.)</a
			> per trovare risposta alle principali domande!
		</Card>
	</div>
	<a class="mt-10 flex justify-center" href="/#associazioni">
		<Button>Vai all'elenco delle associazioni aderenti</Button>
	</a>
</HeroSection>

<span id="associazioni"></span>
<HeroSection class="from-primary to-primary-700 rounded-4xl bg-gradient-to-br">
	<H2 class="text-primary-foreground">Associazioni aderenti</H2>
	{#await associations}
		<div class="mt-15 grid w-full justify-start gap-5 lg:grid-cols-3">
			{#each new Array(6).keys() as i (i)}
				<Skeleton class="h-96" />
			{/each}
		</div>
	{:then items}
		<Masonry
			{items}
			idKey="Permalink"
			gap={20}
			maxColWidth={750}
			class="mt-15 w-full justify-start gap-5"
		>
			{#snippet children({ item })}
				<AssociationCard association={item} />
			{/snippet}
		</Masonry>
	{/await}
</HeroSection>

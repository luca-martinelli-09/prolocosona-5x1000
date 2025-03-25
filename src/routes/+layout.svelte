<script lang="ts">
	import { Accordion } from 'bits-ui';
	import { Plus } from 'lucide-svelte';
	import { marked } from 'marked';
	import '../app.css';
	import Border from '../components/Border.svelte';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
	import HeroSection from '../components/HeroSection.svelte';
	import FirmaAsd from '../components/images/FirmaASD.svelte';
	import FirmaComune from '../components/images/FirmaComune.svelte';
	import FirmaEts from '../components/images/FirmaETS.svelte';
	import H2 from '../components/ui/titles/H2.svelte';
	import '../fonts.css';
	import Skeleton from '../components/ui/Skeleton.svelte';

	let { children, data } = $props();

	const { faqs } = $derived(data);
</script>

<Header />

{@render children()}

<span id="faq"></span>
<HeroSection class="min-h-auto">
	<H2>Domande frequenti</H2>
	{#await faqs}
		<div class="mt-10">
			{#each new Array(6).keys() as i (i)}
				<Skeleton class="bg-background-foreground/10 mt-2 h-20 w-full" />
			{/each}
		</div>
	{:then items}
		<Accordion.Root type="multiple" class="mt-10 space-y-2" value={['0']}>
			{#each items as faq, i (i)}
				<Accordion.Item value={i.toString()} class="bg-card text-card-foreground relative">
					<Accordion.Header>
						<Accordion.Trigger
							class="flex w-full flex-1 items-center justify-between p-5 text-xl font-medium transition-all select-none [&[data-state=open]>span>svg]:rotate-225"
						>
							<span class="w-full text-left">
								{faq.Domanda}
							</span>
							<Border size="6px" />
							<span>
								<Plus class="size-5 transition-transform duration-200" />
							</span>
						</Accordion.Trigger>
					</Accordion.Header>
					<Accordion.Content
						class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden px-5 font-serif text-xl tracking-[-0.01em]"
					>
						<div class="prose prose-xl max-w-full pt-0 pb-5">
							{@html marked(faq.Risposta)}
						</div>
					</Accordion.Content>
				</Accordion.Item>
			{/each}
		</Accordion.Root>
	{/await}
</HeroSection>

<HeroSection
	class="from-tertiary-400 to-tertiary min-h-auto rounded-t-4xl bg-gradient-to-bl p-5 2xl:p-36"
>
	<div class="flex max-w-screen flex-col items-center justify-center gap-10 xl:flex-row">
		<FirmaEts class="h-auto w-full flex-1" />
		<FirmaAsd class="h-auto w-full flex-1" />
		<FirmaComune class="h-auto w-full flex-1" />
	</div>
</HeroSection>

<Footer />

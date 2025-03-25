<script lang="ts">
	import { title } from '$lib';
	import { generateSocialArray } from '$lib/utils.js';
	import Icon from '@iconify/svelte';
	import { marked } from 'marked';
	import Border from '../../../components/Border.svelte';
	import HeroSection from '../../../components/HeroSection.svelte';
	import BackgroundSona from '../../../components/images/BackgroundSona.svelte';
	import Tooltip from '../../../components/images/Tooltip.svelte';
	import Button from '../../../components/ui/Button.svelte';
	import H1 from '../../../components/ui/titles/H1.svelte';
	import H2 from '../../../components/ui/titles/H2.svelte';
	import Subtitle from '../../../components/ui/titles/Subtitle.svelte';

	const { data } = $props();
	const { association } = $derived(data);
</script>

<svelte:head>
	<title>{title('Dona il tuo 5x1000 a ' + association.Nome)}</title>
</svelte:head>

<HeroSection class="from-secondary-400 to-secondary rounded-lg bg-gradient-to-bl py-32 lg:py-64" withBorder>
	{#snippet children()}
		<div class="text-primary space-y-10">
			<H1>
				<div class="flex flex-col gap-5 lg:flex-row items-center md:items-start">
					<div class="relative">
						<Tooltip class="size-60" />
						<img
							class="absolute top-6 left-12 size-36 object-contain object-center"
							alt={association.Nome}
							src={association.Logo?.url}
						/>
					</div>
					<div>
						Dona il tuo <span class="font-serif italic">5x1000</span> a
						<span class="font-serif italic">{association.Nome}</span>
					</div>
				</div>
			</H1>
			<Subtitle class="max-w-7xl">
				Contribuisci <strong>senza costi aggiuntivi</strong> e sostieni i progetti che rendono
				<strong>migliore il tuo territorio</strong>.
			</Subtitle>
			<a href={`/associazioni/${association.Permalink}/#chi-siamo`}>
				<Button variant="primary">Scopri di più</Button>
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

<span id="chi-siamo"></span>
<HeroSection>
	<H2>Chi siamo</H2>
	<article class="prose prose-2xl prose-a:text-link mt-10 max-w-none font-serif">
		{#if association.Presentazione}
			{@html marked(association.Presentazione)}
		{/if}

		<h3>Come donare il 5x1000 a {association.Nome}</h3>

		<p>
			Compila l'apposita scheda che trovi nella Dichiarazione dei Redditi e inserisci il codice
			fiscale: <strong>{association.CodiceFiscale}</strong>
		</p>

		<h3>Contatti</h3>
		<dl class="flex flex-wrap gap-3 text-3xl leading-0 [&>div>dt]:sr-only">
			{#each generateSocialArray(association.Contatti) as social}
				<div>
					<dt>{social.title}</dt>
					<dl class="mt-0 mb-0">
						<a href={social.href} target="_blank" rel="noopener noreferrer" title={social.label}>
							<span class="sr-only">{social.label}</span>
							<Icon icon={social.icon} />
						</a>
					</dl>
				</div>
			{/each}
		</dl>
	</article>
</HeroSection>

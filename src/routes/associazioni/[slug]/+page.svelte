<script lang="ts">
	import { generateSocialArray } from '$lib/utils.js';
	import Icon from '@iconify/svelte';
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css/core';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { marked } from 'marked';
	import Border from '../../../components/Border.svelte';
	import HeroSection from '../../../components/HeroSection.svelte';
	import BackgroundSona from '../../../components/images/BackgroundSona.svelte';
	import Tooltip from '../../../components/images/Tooltip.svelte';
	import Seo from '../../../components/Seo.svelte';
	import Button from '../../../components/ui/Button.svelte';
	import Card from '../../../components/ui/Card.svelte';
	import H1 from '../../../components/ui/titles/H1.svelte';
	import H2 from '../../../components/ui/titles/H2.svelte';
	import Subtitle from '../../../components/ui/titles/Subtitle.svelte';

	const { data } = $props();
	const { association } = $derived(data);

	const galleryImages = $derived(
		(association.Galleria || []).filter((item) => item.type.startsWith('image/'))
	);

	const attachments = $derived(
		(association.Galleria || []).filter((item) => !item.type.startsWith('image/'))
	);
</script>

<Seo
	title={`Dona il tuo 5x1000 a ${association.Nome}`}
	description={`Dona il tuo 5x1000 a ${association.Nome}. Contribuisci senza costi aggiuntivi e sostieni i progetti che rendono migliore il tuo territorio.`}
/>

<HeroSection
	class="from-secondary-400 to-secondary rounded-lg bg-gradient-to-bl py-32 lg:py-64"
	withBorder
>
	{#snippet children()}
		<div class="text-primary space-y-10">
			<H1>
				<div class="flex flex-col items-center gap-5 md:items-start lg:flex-row">
					<div class="relative">
						<Tooltip class="size-40 lg:size-60" />
						<img
							class="absolute top-4 left-8 size-24 object-contain object-center lg:top-6 lg:left-12 lg:size-36"
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

		{#if galleryImages.length}
			<h3 class="!mb-0">Galleria</h3>

			<Splide
				hasTrack={false}
				aria-label="Galleria"
				options={{
					trimSpace: false,
					perPage: 3,
					gap: '1rem',
					breakpoints: {
						1024: {
							perPage: 2,
							gap: '.7rem'
						},
						480: {
							perPage: 1,
							gap: '.7rem'
						}
					}
				}}
			>
				<div class="splide__arrows mb-5 flex justify-end gap-2">
					<button
						class="splide__arrow splide__arrow--prev hover:bg-background-foreground/5 flex cursor-pointer items-center justify-center rounded-full border p-2 transition-all duration-300 ease-in-out hover:shadow-md"
					>
						<ChevronLeft />
						<span class="sr-only">Precedente</span>
					</button>
					<button
						class="splide__arrow splide__arrow--next hover:bg-background-foreground/5 flex cursor-pointer items-center justify-center rounded-full border p-2 transition-all duration-300 ease-in-out hover:shadow-md"
					>
						<ChevronRight />
						<span class="sr-only">Successivo</span>
					</button>
				</div>

				<SplideTrack>
					{#each galleryImages as image}
						<SplideSlide>
							<div class="!m-0 flex h-full w-full items-start justify-center">
								<figure class="!m-0">
									<img
										class="h-full w-full rounded-xl object-center"
										src={image.url}
										alt={image.filename}
									/>
								</figure>
							</div>
						</SplideSlide>
					{/each}
				</SplideTrack>
			</Splide>
		{/if}

		{#if attachments.length}
			<h3>Allegati</h3>

			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each attachments as attachment}
					<Card title={attachment.filename} icon="📎" class="p-7">
						<Button
							variant="primary"
							class="block w-full py-2 text-base"
							href={attachment.url}
							target="_blank"
							rel="noopener noreferrer">Scarica</Button
						>
					</Card>
				{/each}
			</div>
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

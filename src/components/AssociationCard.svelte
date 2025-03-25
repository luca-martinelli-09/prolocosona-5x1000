<script lang="ts">
	import type { Association } from '$lib/types';
	import { generateSocialArray } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import Tooltip from './images/Tooltip.svelte';
	import Button from './ui/Button.svelte';

	type $Props = {
		association: Association;
	};

	const { association }: $Props = $props();
</script>

<article class="relative mt-10">
	<div class="bg-card text-card-foreground overflow-clip rounded-lg shadow-xl">
		<header class="from-secondary to-secondary-400 text-secondary-foreground mb-2 bg-gradient-to-r">
			<h3 class="ms-36 flex items-center py-5 text-2xl font-bold">{association.Nome}</h3>
			<span
				class="bg-tertiary-400 text-tertiary-foreground shadow-tertiary-700 absolute top-0 right-3 px-3 py-1 text-xl font-semibold shadow-[2px_5px_0px_0px]"
			>
				{association.Tipologia}
			</span>
		</header>
		<div class="p-10 font-serif text-2xl">
			<dl
				class="divide-primary flex flex-col divide-y-2 divide-dashed [&>div]:flex [&>div]:gap-3 [&>div]:py-5 [&>div]:first:pt-0 [&>div]:last:pb-0 [&>div>dt]:font-bold"
			>
				<div class="border-none pb-0">
					<dt>Cod. Fiscale</dt>
					<dd>{association.CodiceFiscale}</dd>
				</div>
				<dl class="text-link flex flex-wrap gap-3 pb-5 text-3xl [&>div>dt]:sr-only">
					{#each generateSocialArray(association.Contatti) as social}
						<div>
							<dt>{social.title}</dt>
							<dl>
								<a
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									title={social.label}
								>
									<span class="sr-only">{social.label}</span>
									<Icon icon={social.icon} />
								</a>
							</dl>
						</div>
					{/each}
				</dl>
				<div class="flex-col">
					<dt>Finalità</dt>
					<dd>{association.Finalita}</dd>
				</div>
				{#if association.CosaAbbiamoFatto}
					<div class="flex-col">
						<dt>Come abbiamo impiegato il 5x1000</dt>
						<dd>{association.CosaAbbiamoFatto}</dd>
					</div>
				{/if}
			</dl>
			<a class="mt-5 flex w-full flex-col" href={`/associazioni/${association.Permalink}`}>
				<Button>Scopri di più</Button>
			</a>
		</div>
	</div>
	<Tooltip class="absolute -top-10 size-36" />
	<img
		class="absolute -top-6 left-8 size-20 object-contain object-center"
		alt={association.Nome}
		src={association.Logo?.url}
	/>
</article>

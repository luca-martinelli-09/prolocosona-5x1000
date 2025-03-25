<script lang="ts">
	import { page } from '$app/stores';
	import { title } from '$lib';

	type $Props = {
		title: string;
		description?: string;
	};

	const {
		title: titleString,
		description = 'Dona il tuo 5x1000 alle associazioni del Comune di Sona. Contribuisci senza costi aggiuntivi e sostieni i progetti che rendono migliore il tuo territorio.'
	}: $Props = $props();
</script>

<svelte:head>
	<title>{title(titleString)}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title(titleString)} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={$page.url.origin} />
	<meta property="og:image" content={`${$page.url.origin}/og_image.png`} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title(titleString)} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={`${$page.url.origin}/og_image.png`} />
	<meta name="author" content="Pro Loco Sona" />
</svelte:head>

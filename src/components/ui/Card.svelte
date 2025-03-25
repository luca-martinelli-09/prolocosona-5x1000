<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';
	import Border from '../Border.svelte';

	type $Props = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
		title: Snippet | string;
		icon?: string;
		background?: Snippet;
	};

	const { class: className, icon, children, title, background }: $Props = $props();
</script>

<article
	class={twMerge(
		'bg-card text-card-foreground relative isolate overflow-clip rounded-lg p-10',
		className?.toString()
	)}
>
	<header class="relative z-10 mb-5">
		<h3 class="!my-0 flex items-center text-3xl font-bold">
			{#if typeof title === 'string'}
				{icon} {title}
			{:else}
				{@render title?.()}
			{/if}
		</h3>
	</header>
	<p class="relative z-10 !my-0 font-serif text-2xl">{@render children?.()}</p>
	{@render background?.()}
	<span class="pointer-events-none absolute -top-4 -left-4 z-0 text-[8rem] opacity-10 select-none"
		>{icon}</span
	>
	<Border size="6px" />
</article>

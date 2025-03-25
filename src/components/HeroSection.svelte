<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type $Props = HTMLAttributes<HTMLDivElement> & {
		background?: Snippet;
		withBorder?: boolean;
	};

	const { class: className, children, background, withBorder, ...props }: $Props = $props();
</script>

<section class={twMerge('relative flex min-h-screen overflow-clip py-36', className?.toString())}>
	<div class={twMerge('container mx-auto p-3', withBorder && 'p-10')}>
		{@render children?.()}
	</div>
	{@render background?.()}
</section>

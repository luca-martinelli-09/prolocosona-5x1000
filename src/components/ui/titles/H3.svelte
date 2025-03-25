<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type $Props = HTMLAttributes<HTMLHeadingElement>;
	const { class: className, children, ...props }: $Props = $props();
</script>

<h2 {...props} class={twMerge('text-8xl font-bold', className?.toString())}>
	{@render children?.()}
</h2>

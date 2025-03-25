<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type $Props = HTMLAttributes<HTMLHeadingElement>;
	const { class: className, children, ...props }: $Props = $props();
</script>

<h1 {...props} class={twMerge('text-9xl font-bold', className?.toString())}>
	{@render children?.()}
</h1>

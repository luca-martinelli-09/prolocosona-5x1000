<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type $Props = HTMLAttributes<HTMLHeadingElement>;
	const { class: className, children, ...props }: $Props = $props();
</script>

<p {...props} class={twMerge('text-5xl', className?.toString())}>
	{@render children?.()}
</p>

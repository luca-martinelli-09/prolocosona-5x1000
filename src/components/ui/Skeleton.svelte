<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type $Props = HTMLAttributes<HTMLDivElement>;

	const { class: className }: $Props = $props();
</script>

<div class={twMerge('bg-card/10 animate-pulse rounded-lg p-10', className?.toString())}></div>

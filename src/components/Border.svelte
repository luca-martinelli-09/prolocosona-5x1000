<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	type $Props = {
		size?: string;
	};

	const { size = '12px' }: $Props = $props();
	const borderColors = shuffleArray([
		'bg-[#c68abc]',
		'bg-[#3ac3e1]',
		'bg-[#68b5a2]',
		'bg-[#fbae42]'
	]);

	function shuffleArray(array: string[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}
</script>

<div style="--border-size: {size}">
	<!-- TOP -->
	<span
		class={twMerge(
			'absolute top-0 right-1/2 left-0 h-(--border-size) rounded-full bg-[#c68abc] opacity-70',
			borderColors[0]
		)}
	></span>
	<span
		class={twMerge(
			'absolute top-0 right-0 left-1/2 -ml-(--border-size) h-(--border-size) rounded-full bg-[#3ac3e1] opacity-70',
			borderColors[1]
		)}
	></span>

	<!-- BOTTOM -->
	<span
		class={twMerge(
			'absolute right-0 bottom-0 left-1/2 -ml-(--border-size) h-(--border-size) rounded-full bg-[#68b5a2] opacity-70',
			borderColors[2]
		)}
	></span>
	<span
		class={twMerge(
			'absolute right-1/2 bottom-0 left-0 h-(--border-size) rounded-full bg-[#3ac3e1] opacity-70',
			borderColors[1]
		)}
	></span>

	<!-- LEFT -->
	<span
		class={twMerge(
			'absolute top-0 bottom-1/4 left-0 w-(--border-size) rounded-full bg-[#fbae42] opacity-70',
			borderColors[3]
		)}
	></span>
	<span
		class={twMerge(
			'absolute top-3/4 bottom-0 left-0 -mt-(--border-size) w-(--border-size) rounded-full bg-[#3ac3e1] opacity-70',
			borderColors[1]
		)}
	></span>

	<!-- RIGHT -->
	<span
		class={twMerge(
			'absolute top-0 right-0 bottom-3/4 w-(--border-size) rounded-full bg-[#fbae42] opacity-70',
			borderColors[3]
		)}
	></span>
	<span
		class={twMerge(
			'absolute top-1/4 right-0 bottom-0 -mt-(--border-size) w-(--border-size) rounded-full bg-[#68b5a2] opacity-70',
			borderColors[2]
		)}
	></span>
</div>

<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { NavigationMenu } from 'bits-ui';
	import { twMerge } from 'tailwind-merge';
	import Logo from './Logo.svelte';

	let scrolled = $state(false);

	$effect(() => {
		scrolled = window?.scrollY > 0;
	});
</script>

<svelte:window onscroll={() => (window.scrollY > 0 ? (scrolled = true) : (scrolled = false))} />

<div
	class={twMerge(
		'fixed z-50 w-full transition-all duration-300',
		scrolled && 'shadow-primary/10 bg-card shadow-xl'
	)}
>
	<header
		class={twMerge(
			'text-card container mx-auto flex w-full items-center justify-between p-10 transition-all duration-100',
			scrolled && 'text-card-foreground py-3'
		)}
	>
		<a href="/">
			<h1>
				<Logo class={twMerge('h-16 transition-all duration-300', scrolled && 'h-10')} />
				<span class="sr-only">{PUBLIC_APP_NAME}</span>
			</h1>
		</a>

		<NavigationMenu.Root class="hidden lg:block">
			<NavigationMenu.List class="group flex list-none items-center justify-center p-1">
				<NavigationMenu.Item>
					<NavigationMenu.Link
						class="hover:bg-card-foreground/5 cursor-pointer rounded-md p-3 font-semibold"
						href="/#come-funziona"
					>
						<span>Come funziona</span>
					</NavigationMenu.Link>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link
						class="hover:bg-card-foreground/5 cursor-pointer rounded-md p-3 font-semibold"
						href="/#associazioni"
					>
						<span>Associazioni</span>
					</NavigationMenu.Link>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link
						class="hover:bg-card-foreground/5 cursor-pointer rounded-md p-3 font-semibold"
						href="/#faq"
					>
						<span>F.A.Q.</span>
					</NavigationMenu.Link>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
	</header>
</div>

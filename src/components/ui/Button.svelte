<script lang="ts">
	import { Button, type Button as ButtonPrimitiveType } from 'bits-ui';
	import { twMerge } from 'tailwind-merge';

	type $Props = ButtonPrimitiveType.RootProps & {
		variant?: 'default' | 'primary' | 'secondary';
	};

	const { children, variant = 'default', ...props }: $Props = $props();

	const classNames = {
		default: 'text-secondary-foreground bg-secondary hover:bg-secondary-400',
		primary: 'text-primary-foreground bg-primary hover:bg-primary-400',
		secondary: 'text-secondary-foreground bg-secondary hover:bg-secondary-400'
	};
</script>

<Button.Root
	{...props}
	class={twMerge(
		'cursor-pointer rounded-full p-3 px-5 font-sans text-xl font-bold transition-all duration-300 hover:shadow-lg active:shadow-sm',
		classNames[variant]
	)}
>
	{@render children?.()}
</Button.Root>

import type { Contact } from './types';

export function generateSocialArray(contacts?: Contact[]) {
	if (!contacts) return [];

	const social: {
		title: string;
		icon: string;
		label: string;
		href?: string;
	}[] = [];

	const socialMap: {
		[k: string]: {
			title: string;
			icon: string;
			href?: (v: string) => string;
			label?: (v: string) => string;
		};
	} = {
		website: {
			title: 'Sito web',
			icon: 'hugeicons:globe-02',
			href: (v) => `https://${v.replace(/^https?:\/\//, '')}`
		},
		email: {
			title: 'Email',
			icon: 'hugeicons:mail-01',
			href: (v) => `mailto:${v}`
		},
		pec: {
			title: 'PEC',
			icon: 'hugeicons:mail-01',
			href: (v) => `mailto:${v}`
		},
		phone: {
			title: 'Telefono',
			icon: 'hugeicons:telephone',
			href: (v) => `tel:${v}`
		},
		facebook: {
			title: 'Facebook',
			icon: 'hugeicons:facebook-02',
			href: (v) => `https://facebook.com/${v}`
		},
		instagram: {
			title: 'Instagram',
			icon: 'hugeicons:instagram',
			href: (v) => `https://instagram.com/${v.replace(/^@/, '')}`,
			label: (v) => `@${v.replace(/^@/, '')}`
		},
		youtube: {
			title: 'YouTube',
			icon: 'hugeicons:youtube',
			href: (v) => `https://youtube.com/${v}`,
			label: () => 'Canale YouTube'
		},
		whatsapp_channel: {
			title: 'Canale WhatsApp',
			icon: 'hugeicons:whatsapp',
			href: (v) => `https://whatsapp.com/channel/${v}`,
			label: () => 'Canale WhatsApp'
		},
		telegram_channel: {
			title: 'Canale Telegram',
			icon: 'hugeicons:telegram',
			href: (v) => `https://t.me/${v.replace(/^@/, '')}`,
			label: (v) => `@${v.replace(/^@/, '')}`
		}
	};

	contacts.forEach((c) => {
		const type = c.type;

		if (!(type in socialMap)) return;

		const val = c.value;

		social.push({
			...socialMap[type],
			label: socialMap[type].label?.(val) || val,
			href: socialMap[type].href?.(val)
		});
	});

	return social;
}

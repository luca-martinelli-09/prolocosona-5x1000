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
		SitoWeb: {
			title: 'Sito web',
			icon: 'hugeicons:globe-02',
			href: (v) => `https://${v}`
		},
		Email: {
			title: 'Email',
			icon: 'hugeicons:mail-01',
			href: (v) => `mailto:${v}`
		},
		Telefono: {
			title: 'Telefono',
			icon: 'hugeicons:telephone',
			href: (v) => `tel:${v}`
		},
		Facebook: {
			title: 'Facebook',
			icon: 'hugeicons:facebook-02',
			href: (v) => `https://facebook.com/${v}`
		},
		Instagram: {
			title: 'Instagram',
			icon: 'hugeicons:instagram',
			href: (v) => `https://instagram.com/@${v}`,
			label: (v) => `@${v}`
		},
		YouTube: {
			title: 'YouTube',
			icon: 'hugeicons:youtube',
			href: (v) => `https://youtube.com/${v}`,
			label: () => 'Canale YouTube'
		},
		CanaleWhatsapp: {
			title: 'Canale WhatsApp',
			icon: 'hugeicons:whatsapp',
			href: (v) => `https://whatsapp.com/channel/${v}`,
			label: () => 'Canale WhatsApp'
		},
		CanaleTelegram: {
			title: 'Canale Telegram',
			icon: 'hugeicons:telegram',
			href: (v) => `https://t.me/${v}`,
			label: (v) => `@${v}`
		}
	};

	contacts.forEach((c) => {
		const tipologia = c.Tipologia;

		if (!(tipologia in socialMap)) return;

		const val = c.Nome;
		const forcedVal = c.Valore;

		social.push({
			...socialMap[tipologia],
			label: socialMap[tipologia].label?.(val) || val,
			href: forcedVal || socialMap[tipologia].href?.(val)
		});
	});

	return social;
}

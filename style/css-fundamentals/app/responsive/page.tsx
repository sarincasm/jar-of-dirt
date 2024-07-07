import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/responsive'
	const posts: GridPost[] = [
		{
			href: '/media-queries/',
			title: 'Media Queries',
			description:
				'When it comes to building responsive interfaces, the media query is the primary tool in our toolbox.',
			date: '2023-07-20',
			category: {
				href: `${base}`,
				title: 'Responsive',
			},
		},
		{
			href: '/css-variables',
			title: 'CSS Variables',
			description:
				'CSS Variables are incredibly powerful, and unlock lots of really effective workflows.',
			date: '2023-07-22',
			category: {
				href: `${base}`,
				title: 'Responsive',
			},
		},
		{
			href: '/clamping-values',
			title: 'Clamping Values',
			description: 'We have another option: clamp.',
			date: '2024-02-24',
			category: {
				href: `${base}`,
				title: 'Responsive',
			},
		},
		{
			href: '/scrollburglars',
			title: 'Scrollburglars',
			description:
				'When a webpage has an accidental horizontal scrollbar that allows you to scroll by a few pixels.',
			date: '2024-07-07',
			category: {
				href: `${base}`,
				title: 'Responsive',
			},
		},
	].map((post) => ({...post, href: base + post.href}))
	const mainTitle = 'Module 5: Responsive & Behavioural CSS'
	const mainDescription =
		"Modern web applications respond dynamically, contorting themselves to display well across an incredibly wide range of devices. In this module, we'll learn how to write CSS that responds and adapts to different situations."

	return LinkGrid({posts, mainTitle, mainDescription})
}

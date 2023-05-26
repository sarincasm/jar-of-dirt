import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/flexbox'
	const posts: GridPost[] = [
		{
			href: '/directions-and-alignment',
			title: 'Directions and Alignment',
			description: 'Directions and Alignment',
			date: '2023-05-15',
			category: {
				href: `${base}`,
				title: 'Flexbox',
			},
		},
		{
			href: '/growing-shrinking',
			title: 'Growing and Shrinking',
			description: 'Growing and Shrinking',
			date: '2023-05-23',
			category: {
				href: `${base}`,
				title: 'Flexbox',
			},
		},
		{
			href: '/wrapping',
			title: 'Wrapping',
			description: 'Wrapping',
			date: '2023-05-23',
			category: {
				href: `${base}`,
				title: 'Flexbox',
			},
		},
		{
			href: '/groups-gaps',
			title: 'Groups and Gaps',
			description: 'Groups and Gaps',
			date: '2023-05-24',
			category: {
				href: `${base}`,
				title: 'Flexbox',
			},
		},
		{
			href: '/ordering',
			title: 'Ordering',
			description: 'In Flexbox, we are given overrides to tweak that order.',
			date: '2023-05-24',
			category: {
				href: `${base}`,
				title: 'Flexbox',
			},
		},
		{
			href: '/flexbox-interactions',
			title: 'Flexbox Interactions',
			description:
				"Let's take a look at how Flexbox interacts with other properties and layout modes.",
			date: '2023-05-24',
			category: {
				href: `${base}`,
				title: 'Flexbox',
			},
		},
		{
			href: '/recipes',
			title: 'Recipes',
			description:
				"Let's see how we can use Flexbox in some practical every-day examples.",
			date: '2023-05-24',
			category: {
				href: `${base}`,
				title: 'Flexbox',
			},
		},
	].map((post) => ({...post, href: base + post.href}))
	const mainTitle = 'Module 4: Flexbox'
	const mainDescription = 'Flexbox'

	return LinkGrid({posts, mainTitle, mainDescription})
}

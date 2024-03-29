import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/flexbox/growing-shrinking'
	const categoryTitle = 'Growing and Shrinking'
	const posts: GridPost[] = [
		{
			href: '/sidebar',
			title: 'Sidebar',
			description: 'Sidebar',
			date: '2023-05-23',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
		{
			href: '/alert',
			title: 'Alert',
			description: 'Alert',
			date: '2023-05-23',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
		{
			href: '/cat-newspaper',
			title: 'Cat Newspaper',
			description: 'Cat Newspaper',
			date: '2023-05-24',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
		{
			href: '/sidebar-layout',
			title: 'Sidebar Layout',
			description: 'Sidebar Layout',
			date: '2023-05-24',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
		{
			href: '/facebook-style',
			title: 'Facebook Style Layout',
			description: 'Facebook Style Layout',
			date: '2023-05-24',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
	].map((post) => ({...post, href: base + post.href}))

	const mainTitle = 'Growing and Shrinking'
	const mainDescription = 'Growing and Shrinking'

	return LinkGrid({posts, mainTitle, mainDescription})
}

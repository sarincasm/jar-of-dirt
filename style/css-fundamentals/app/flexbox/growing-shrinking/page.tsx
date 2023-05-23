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
	].map((post) => ({...post, href: base + post.href}))

	const mainTitle = 'Directions and Alignment'
	const mainDescription = 'Directions and Alignment'

	return LinkGrid({posts, mainTitle, mainDescription})
}

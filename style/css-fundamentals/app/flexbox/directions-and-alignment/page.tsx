import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/flexbox/directions-and-alignment'
	const categoryTitle = 'Directions and Alignment'
	const posts: GridPost[] = [
		{
			href: '/dialog-actions',
			title: 'Dialog Actions',
			description: 'Dialog Actions',
			date: '2023-05-15',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
		{
			href: '/centered',
			title: 'Centered',
			description: 'Centered',
			date: '2023-05-15',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
		{
			href: '/equally-spaced-nav-items',
			title: 'Equally Spaced Nav Items',
			description: 'Equally Spaced Nav Items',
			date: '2023-05-15',
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

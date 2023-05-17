import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/rendering-logic-i/flow-layout'
	const categoryTitle = 'Flow Layout'
	const posts: GridPost[] = [
		{
			href: '/max-width-wrapper',
			title: 'Max Width Wrapper',
			description: 'Margins',
			date: '2023-05-17',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
		{
			href: '/figures-captions',
			title: 'Figures & Captions',
			description: 'Margins',
			date: '2023-05-17',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
	].map((post) => ({...post, href: base + post.href}))

	const mainTitle = 'Flow Layout'
	const mainDescription = 'Flow Layout'

	return LinkGrid({posts, mainTitle, mainDescription})
}

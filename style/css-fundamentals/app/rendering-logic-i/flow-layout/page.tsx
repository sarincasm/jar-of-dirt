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
			href: '/stretched-content',
			title: 'Stretched Content',
			description: 'Margins',
			date: '2023-05-17',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
	].map((post) => ({...post, href: base + post.href}))

	const mainTitle = 'The Box Model'
	const mainDescription = 'The Box Model'

	return LinkGrid({posts, mainTitle, mainDescription})
}

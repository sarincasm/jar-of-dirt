import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/rendering-logic-ii/containing-blocks'
	const categoryTitle = 'Positioned Layout'
	const posts: GridPost[] = [
		{
			href: '/bubble-border',
			title: 'Bubble Border',
			description: 'Positioned Layout: Absolute and Relative Positioning',
			date: '2023-05-19',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
	].map((post) => ({...post, href: base + post.href}))

	const mainTitle = 'Containing Blocks'
	const mainDescription = 'Positioned Layout and Containing Blocks'

	return LinkGrid({posts, mainTitle, mainDescription})
}

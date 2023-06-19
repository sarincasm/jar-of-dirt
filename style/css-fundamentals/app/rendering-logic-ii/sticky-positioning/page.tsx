import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/rendering-logic-ii/sticky-positioning'
	const categoryTitle = 'Sticky Positioning'
	const posts: GridPost[] = [
		{
			href: '/sticky-header',
			title: 'Sticky Header',
			description: 'Positioned Layout: Sticky Positioning',
			date: '2023-05-20',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
		{
			href: '/fix-bug',
			title: 'Fix The Bug',
			description: 'Positioned Layout: Sticky Positioning',
			date: '2023-05-20',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
	].map((post) => ({...post, href: base + post.href}))

	const mainTitle = 'Sticky Positioning'
	const mainDescription = 'Sticky Positioning'

	return LinkGrid({posts, mainTitle, mainDescription})
}

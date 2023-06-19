import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/rendering-logic-i/box-model'
	const categoryTitle = 'The Box Model'
	const posts: GridPost[] = [
		{
			href: '/outside-box',
			title: 'Thinking Outside the Box',
			description: 'Margins',
			date: '2023-05-16',
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

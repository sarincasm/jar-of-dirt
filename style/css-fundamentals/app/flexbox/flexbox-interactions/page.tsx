import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/flexbox/flexbox-interactions/'
	const categoryTitle = 'Flexbox Interactions'
	const posts: GridPost[] = [
		{
			href: '/combining-layout-modes',
			title: 'Combining Layout Modes',
			description: 'Combining Layout Modes',
			date: '2023-05-24',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
	].map((post) => ({...post, href: base + post.href}))

	const mainTitle = 'Flexbox Interactions'
	const mainDescription =
		"Let's take a look at how Flexbox interacts with other properties and layout modes."

	return LinkGrid({posts, mainTitle, mainDescription})
}

import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/flexbox/ordering'
	const categoryTitle = 'Ordering'
	const posts: GridPost[] = [
		{
			href: '/table-of-contents',
			title: 'Table of Contents',
			description: 'Table of Contents',
			date: '2023-05-24',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
	].map((post) => ({...post, href: base + post.href}))

	const mainTitle = 'Ordering'
	const mainDescription =
		'In Flexbox, we are given overrides to tweak that order.'

	return LinkGrid({posts, mainTitle, mainDescription})
}

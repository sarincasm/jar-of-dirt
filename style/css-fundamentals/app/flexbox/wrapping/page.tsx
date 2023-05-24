import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/flexbox/wrapping'
	const categoryTitle = 'Wrapping'
	const posts: GridPost[] = [
		{
			href: '/deconstructed-pancake',
			title: 'Deconstructed Pancake',
			description: 'Deconstructed Pancake',
			date: '2023-05-24',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
	].map((post) => ({...post, href: base + post.href}))

	const mainTitle = 'Wrapping'
	const mainDescription =
		'Inline elements can be broken up to spread over multiple lines. In Flexbox, a similar concept exists, via the flex-wrap property.'

	return LinkGrid({posts, mainTitle, mainDescription})
}

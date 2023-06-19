import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/flexbox/recipes'
	const categoryTitle = 'Flexbox Recipes'
	const posts: GridPost[] = [
		{
			href: '/holy-grail-layout',
			title: 'Holy Grail Layout',
			description: 'Holy Grail Layout',
			date: '2023-05-26',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
		{
			href: '/sticky-sidebar',
			title: 'Sticky Sidebar',
			description: 'Sticky Sidebar',
			date: '2023-05-26',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
		{
			href: '/overstuffed-centered',
			title: 'Overstuffed and Centered',
			description: 'Overstuffed and Centered',
			date: '2023-05-26',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
	].map((post) => ({...post, href: base + post.href}))

	const mainTitle = 'Flexbox Recipes'
	const mainDescription =
		"Let's see how we can use Flexbox in some practical every-day examples."

	return LinkGrid({posts, mainTitle, mainDescription})
}

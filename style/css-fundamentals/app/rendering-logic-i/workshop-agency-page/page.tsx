import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/rendering-logic-i/workshop-agency-page'
	const posts: GridPost[] = [
		{
			href: '/unstyled',
			title: 'Starter: Unstyled',
			description: 'Base HTML markup with no styling',
			date: '2023-05-18',
			category: {
				href: `${base}`,
				title: 'Workshop',
			},
		},
		{
			href: '/styled',
			title: 'Done: Styled',
			description: 'Finished project with styles applied',
			date: '2023-05-18',
			category: {
				href: `${base}`,
				title: 'Workshop',
			},
		},
	].map((post) => ({...post, href: base + post.href}))
	const mainTitle = 'Workshop: Agency Page'
	const mainDescription =
		"In this workshop, we'll build a landing page for a fictional consultancy."

	return LinkGrid({posts, mainTitle, mainDescription})
}

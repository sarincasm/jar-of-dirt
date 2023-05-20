import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/rendering-logic-ii/workshop-character-creator'
	const posts: GridPost[] = [
		{
			href: '/unstyled',
			title: 'Starter: Unstyled',
			description: 'Base HTML markup with no styling',
			date: '2023-05-20',
			category: {
				href: `${base}`,
				title: 'Workshop',
			},
		},
		{
			href: '/styled',
			title: 'Done: Styled',
			description: 'Finished project with styles applied',
			date: '2023-05-20',
			category: {
				href: `${base}`,
				title: 'Workshop',
			},
		},
	].map((post) => ({...post, href: base + post.href}))
	const mainTitle = 'Workshop: Agency Page'
	const mainDescription =
		"In this workshop, you're asked to build a character creator for a Sims-style video game"

	return LinkGrid({posts, mainTitle, mainDescription})
}

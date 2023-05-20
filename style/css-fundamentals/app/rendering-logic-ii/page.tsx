import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/rendering-logic-ii'
	const posts: GridPost[] = [
		{
			href: '/containing-blocks',
			title: 'Containing Blocks',
			description: 'Positioned Layout and Containing Blocks',
			date: '2023-05-19',
			category: {
				href: `${base}`,
				title: 'Rendering Logic II',
			},
		},
		{
			href: '/sticky-positioning',
			title: 'Sticky Positioning',
			description: 'Positioned Layout: Sticky Positioning',
			date: '2023-05-20',
			category: {
				href: `${base}`,
				title: 'Rendering Logic II',
			},
		},
		{
			href: '/workshop-character-creator',
			title: 'Workshop: Character Creator',
			description:
				"We've covered a lot of stuff in this module. Let's build something with all of our newfound knowledge!",
			date: '2023-05-20',
			category: {
				href: `${base}`,
				title: 'Workshop',
			},
		},
	].map((post) => ({...post, href: base + post.href}))
	const mainTitle = 'Module 2: Rendering Logic II'
	const mainDescription =
		"We dive deep into positioned layout to understand how containing blocks and stacking contexts work. We'll also learn about managing overflow and visibility"

	return LinkGrid({posts, mainTitle, mainDescription})
}

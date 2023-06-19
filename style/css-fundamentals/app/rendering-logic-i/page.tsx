import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/rendering-logic-i'
	const posts: GridPost[] = [
		{
			href: '/box-model',
			title: 'The Box Model',
			description: 'Content, Padding, Border, Margin',
			date: '2023-05-16',
			category: {
				href: `${base}`,
				title: 'Rendering Logic I',
			},
		},
		{
			href: '/flow-layout',
			title: 'Flow Layout',
			description: 'Inline, Block, Inline-Block, Width, Height',
			date: '2023-05-17',
			category: {
				href: `${base}`,
				title: 'Rendering Logic I',
			},
		},
		{
			href: '/workshop-agency-page',
			title: 'Workshop: Agency Page',
			description:
				'Apply all concepts from this module to create a page for an agency',
			date: '2023-05-18',
			category: {
				href: `${base}`,
				title: 'Workshop',
			},
		},
	].map((post) => ({...post, href: base + post.href}))
	const mainTitle = 'Module 1: Rendering Logic I'
	const mainDescription =
		"We explore how to best use Flow layout, the “OG” layout algorithm of the web, in modern times. We'll also deepen our understanding of common fundamentals like the Box Model."

	return LinkGrid({posts, mainTitle, mainDescription})
}

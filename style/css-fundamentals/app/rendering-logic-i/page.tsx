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
	].map((post) => ({...post, href: base + post.href}))
	const mainTitle = 'Module 1: Rendering Logic I'
	const mainDescription =
		"We explore how to best use Flow layout, the “OG” layout algorithm of the web, in modern times. We'll also deepen our understanding of common fundamentals like the Box Model."

	return LinkGrid({posts, mainTitle, mainDescription})
}

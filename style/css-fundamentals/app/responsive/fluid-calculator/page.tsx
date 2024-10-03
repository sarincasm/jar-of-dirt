import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/responsive/fluid-calculator'
	const categoryTitle = 'Fluid Calculator'
	const posts: GridPost[] = [
		{
			href: '/fluid-heading',
			title: 'Fluid Heading',
			description: 'Tweak the heading so that it meets the constraints',
			date: '2024-10-03',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
	].map((post) => ({...post, href: base + post.href}))

	const mainTitle = 'Fluid Calculator'
	const mainDescription = 'Our typography smoothly scales with the viewport.'

	return LinkGrid({posts, mainTitle, mainDescription})
}

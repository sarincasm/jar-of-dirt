import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/responsive/media-queries'
	const categoryTitle = 'Media Queries'
	const posts: GridPost[] = [
		{
			href: '/disappearing-sidebar',
			title: 'Disappearing Sidebar',
			description:
				'The navigation column disappears on windows less than 700px wide',
			date: '2023-07-20',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
		{
			href: '/mobile-modal',
			title: 'Mobile Modal',
			description:
				"We're given an application with a pre-built modal, and asked to make it mobile-responsive.",
			date: '2023-07-21',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
	].map((post) => ({...post, href: base + post.href}))

	const mainTitle = 'Media Queries'
	const mainDescription =
		'When it comes to building responsive interfaces, the media query is the primary tool in our toolbox.'

	return LinkGrid({posts, mainTitle, mainDescription})
}

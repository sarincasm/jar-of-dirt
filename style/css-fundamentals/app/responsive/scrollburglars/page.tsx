import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/responsive/scrollburglars'
	const categoryTitle = 'Media Queries'
	const posts: GridPost[] = [
		{
			href: '/recut',
			title: 'Recut',
			description:
				'Recut is software that helps with video editing, created by Dave Ceddia.Find and fix the scrollburglar, in a way that makes it less likely for the issue to reoccur.',
			date: '2024-07-07',
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

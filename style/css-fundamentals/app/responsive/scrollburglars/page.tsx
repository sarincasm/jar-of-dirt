import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/responsive/scrollburglars'
	const categoryTitle = 'Media Queries'
	const posts: GridPost[] = [
		{
			href: '/recut',
			title: 'Recut',
			description:
				'Recut (video editing software) created by Dave Ceddia. Find and fix the scrollburglar, & prevent the issue from reoccuring.',
			date: '2024-07-07',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
		{
			href: '/blog',
			title: 'Blog',
			description:
				'In addition to removing the horizontal overflow, you must also take care not to break the sticky social icons on desktop.',
			date: '2024-07-08',
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

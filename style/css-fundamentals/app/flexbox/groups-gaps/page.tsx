import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/flexbox/groups-gaps'
	const categoryTitle = 'Groups & Gaps'
	const posts: GridPost[] = [
		{
			href: '/superheader',
			title: 'Superheader',
			description: 'Superheader',
			date: '2023-05-24',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
	].map((post) => ({...post, href: base + post.href}))

	const mainTitle = 'Groups & Gaps'
	const mainDescription = 'Groups & Gaps'

	return LinkGrid({posts, mainTitle, mainDescription})
}

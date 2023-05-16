import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/flexbox'
	const posts: GridPost[] = [
		{
			href: '/directions-and-alignment',
			title: 'Directions and Alignment',
			description: 'Directions and Alignment',
			date: '2023-05-15',
			category: {
				href: `${base}`,
				title: 'Flexbox',
			},
		},
	].map((post) => ({...post, href: base + post.href}))
	const mainTitle = 'Module 4: Flexbox'
	const mainDescription = 'Flexbox'

	return LinkGrid({posts, mainTitle, mainDescription})
}

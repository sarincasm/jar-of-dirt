import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/responsive/clamping-values'
	const categoryTitle = 'Responsive Design'
	const posts: GridPost[] = [
		{
			href: '/max-height-hero',
			title: 'Max-Height Hero',
			description: 'Update the hero to match the given constraints.',
			date: '2024-02-24',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
	].map((post) => ({...post, href: base + post.href}))

	const mainTitle = 'Clamping Values'
	const mainDescription = 'We have another option: clamp.'

	return LinkGrid({posts, mainTitle, mainDescription})
}

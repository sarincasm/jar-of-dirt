import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/responsive/css-variables'
	const categoryTitle = 'CSS Variables'
	const posts: GridPost[] = [
		{
			href: '/stacked-cards',
			title: 'Stacked Cards',
			description:
				'Update the code so that the media queries change the value of a CSS variable, rather than setting properties like gap and padding directly',
			date: '2023-07-22',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
	].map((post) => ({...post, href: base + post.href}))

	const mainTitle = 'CSS Variables'
	const mainDescription =
		'CSS Variables are incredibly powerful, and unlock lots of really effective workflows.'

	return LinkGrid({posts, mainTitle, mainDescription})
}

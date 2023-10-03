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
		{
			href: '/dark-mode',
			title: 'Dark Mode',
			description:
				"Let's use CSS variables to create a dark mode variant for this UI!",
			date: '2023-10-03',
			category: {
				href: `${base}`,
				title: categoryTitle,
			},
		},
		{
			href: '/art-project',
			title: 'Art Project',
			description:
				'Use CSS variables, calc, and linear gradients to come up with a unique work of art',
			date: '2023-10-03',
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

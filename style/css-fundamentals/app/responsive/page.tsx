import {LinkGrid, GridPost} from '@/components/LinkGrid'

export default function Page() {
	const base = '/responsive'
	const posts: GridPost[] = [
		{
			href: '/media-queries/',
			title: 'Media Queries',
			description:
				'When it comes to building responsive interfaces, the media query is the primary tool in our toolbox.',
			date: '2023-07-20',
			category: {
				href: `${base}`,
				title: 'Responsive',
			},
		},
	].map((post) => ({...post, href: base + post.href}))
	const mainTitle = 'Module 5: Responsive & Behavioural CSS'
	const mainDescription =
		"Modern web applications respond dynamically, contorting themselves to display well across an incredibly wide range of devices. In this module, we'll learn how to write CSS that responds and adapts to different situations."

	return LinkGrid({posts, mainTitle, mainDescription})
}

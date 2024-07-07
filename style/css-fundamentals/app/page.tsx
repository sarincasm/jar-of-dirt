import Link from 'next/link'
import Image from 'next/image'

interface HomePost {
	imageUrl: string
	date: string
	datetime: string
	title: string
	href: string
}
const posts: HomePost[] = [
	{
		date: '2023-05-16',
		datetime: '',
		imageUrl: '',
		href: '/rendering-logic-i',
		title: 'Module 1: Rendering Logic I',
	},
	{
		date: '2023-05-19',
		datetime: '',
		imageUrl: '',
		href: '/rendering-logic-ii',
		title: 'Module 2: Rendering Logic II',
	},
	{
		date: '2023-05-15',
		datetime: '',
		imageUrl: '',
		href: '/flexbox',
		title: 'Module 4: Flexbox',
	},
	{
		date: '2023-07-20',
		datetime: '',
		imageUrl: '',
		href: '/responsive',
		title: 'Module 5: Responsive & Behavioural CSS',
	},
]

export default function Home() {
	const title = `CSS For JavaScript Developers`

	return (
		<div className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						{title}
					</h2>
					<p className="mt-2 text-lg leading-8 text-gray-600">
						Code based on the{' '}
						<a href="https://css-for-js.dev/">CSS course</a> by{' '}
						<a href="https://twitter.com/JoshWComeau">Josh W Comeau</a>.
						<br />
						But using Tailwind CSS.
					</p>
				</div>
				<div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-24 lg:mx-0 lg:max-w-none lg:grid-cols-3">
					{posts.map((post, index) => (
						<article
							key={index}
							className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
						>
							<Image
								src={post.imageUrl}
								alt=""
								className="absolute inset-0 -z-10 h-full w-full object-cover"
							/>
							<div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
							<div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

							<div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
								<time dateTime={post.datetime} className="mr-8">
									{post.date}
								</time>
							</div>
							<h3 className="mt-3 text-lg font-semibold leading-6 text-white">
								<Link href={post.href}>
									<span className="absolute inset-0" />
									{post.title}
								</Link>
							</h3>
						</article>
					))}
				</div>
			</div>
		</div>
	)
}

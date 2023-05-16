import Link from 'next/link'

export interface GridPost {
	title: string
	href: string
	category: {
		href: string
		title: string
	}
	description: string
	date: string
}
interface LinkGridProps {
	posts: GridPost[]
	mainTitle: string
	mainDescription: string
}

export function LinkGrid({posts, mainTitle, mainDescription}: LinkGridProps) {
	return (
		<div className="bg-white py-4 sm:py-16">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						{mainTitle}
					</h2>
					<p className="mt-2 text-lg leading-8 text-gray-600">
						{mainDescription}
					</p>
				</div>
				<div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
					{posts.map((post, index) => (
						<article
							key={index}
							className="flex max-w-xl flex-col items-start justify-between"
						>
							<div className="flex items-center gap-x-4 text-xs">
								<time dateTime={post.date} className="text-gray-500">
									{post.date}
								</time>
								<Link
									href={post.category.href}
									className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
								>
									{post.category.title}
								</Link>
							</div>
							<div className="group relative">
								<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
									<Link href={post.href}>
										<span className="absolute inset-0" />
										{post.title}
									</Link>
								</h3>
								<p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
									{post.description}
								</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</div>
	)
}

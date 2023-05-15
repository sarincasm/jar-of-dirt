import Link from 'next/link'

export default function Page() {
	const base = '/flexbox/directions-and-alignment'
	const links = [
		{
			href: '/dialog-actions',
			title: 'Dialog Actions',
			description: 'Dialog Actions',
		},
		{
			href: '/centered',
			title: 'Centered',
			description: 'Centered',
		},
	]

	return (
		<div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
			{links.map(({href, title, description}) => {
				return (
					<Link
						key={`${href}${title}`}
						href={base + href}
						className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
					>
						<h2 className={`mb-3 text-2xl font-semibold`}>{title}</h2>
						<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
							{description}
						</p>
					</Link>
				)
			})}
		</div>
	)
}

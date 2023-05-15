import Link from 'next/link'

function renderLinks() {
	const links = [
		{
			href: '/flexbox',
			title: 'Module 4: Flexbox',
			description:
				'Learn how to build sophisticated, adaptive layouts using Flexbox.',
		},
	]

	return links.map(({href, title, description}) => {
		return (
			<Link
				key={`${href}${title}`}
				href={href}
				className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
			>
				<h2 className={`mb-3 text-2xl font-semibold`}>{title}</h2>
				<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
					{description}
				</p>
			</Link>
		)
	})
}

export default function Home() {
	const github_link = `https://github.com/sarincasm`
	const title = `CSS For JavaScript Developers`

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
				<p className="fixed left-0 top-0 w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
					Code based on the{' '}
					<a href="https://css-for-js.dev/">CSS course</a> by{' '}
					<a href="https://twitter.com/JoshWComeau">Josh W Comeau</a>. But
					using Tailwind CSS.
				</p>
				<div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
					<a
						className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
						href={github_link}
						target="_blank"
						rel="noopener noreferrer"
					>
						By <span className="font-semibold">Sarincasm</span>
					</a>
				</div>
			</div>

			<div className="relative flex place-items-center text-4xl">
				{title}
			</div>

			<div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
				{renderLinks()}
			</div>
		</main>
	)
}

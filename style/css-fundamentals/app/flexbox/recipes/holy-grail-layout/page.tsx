function renderStarter() {
	return (
		<section className="p-4 bg-white">
			<header className="border-2 p-4 border-yellow-300 bg-yellow-300/30">
				Header
			</header>
			<section>
				<nav className="border-2 p-4 border-green-300 bg-green-300/30">
					Nav
				</nav>
				<main className="border-2 p-4 border-blue-300 bg-blue-300/30">
					Main
				</main>
				<aside className="border-2 p-4 border-pink-300 bg-pink-300/30">
					Aside
				</aside>
			</section>
			<footer className="border-2 p-4 border-orange-300 bg-orange-300/30">
				Footer
			</footer>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4 bg-white flex flex-col h-96">
			<header className="border-2 p-4 border-yellow-300 bg-yellow-300/30">
				Header
			</header>
			<section className="flex w-full grow">
				<nav className="border-2 p-4 border-green-300 bg-green-300/30 w-64">
					Nav
				</nav>
				<main className="border-2 p-4 border-blue-300 bg-blue-300/30 grow min-w-[400px]">
					Main
				</main>
				<aside className="border-2 p-4 border-pink-300 bg-pink-300/30 w-64">
					Aside
				</aside>
			</section>
			<footer className="border-2 p-4 border-orange-300 bg-orange-300/30">
				Footer
			</footer>
		</section>
	)
}

export default function Page() {
	return (
		<main className="bg-purple-500">
			<div className="p-10">
				<h2 className="text-2xl font-bold my-3 text-center text-white">
					Starter
				</h2>
				{renderStarter()}
				<h2 className="text-2xl font-bold my-3 text-center text-white">
					Finished
				</h2>
				{renderDone()}
			</div>
		</main>
	)
}

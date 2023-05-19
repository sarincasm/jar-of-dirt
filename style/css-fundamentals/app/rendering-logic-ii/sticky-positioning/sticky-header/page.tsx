function renderStarter() {
	return (
		<section className="overflow-y-scroll h-52 bg-gray-400">
			<div className="h-80">
				<header className="h-12 bg-blue-500 text-white opacity-95">
					<ul className="p-0 m-0 text-center">
						<li className="inline-block p-0 my-0 mx-4 leading-10">
							Home
						</li>
						<li className="inline-block p-0 my-0 mx-4 leading-10">
							About
						</li>
						<li className="inline-block p-0 my-0 mx-4 leading-10">
							Contact
						</li>
					</ul>
				</header>
				<main className="p-8">
					<p>Hello World!</p>
				</main>
			</div>
		</section>
	)
}

function renderDone() {
	return (
		<section className="overflow-y-scroll h-52 bg-gray-400">
			<div className="h-80">
				<header className="sticky -top-4 h-16 p-4 bg-blue-500 text-white opacity-95">
					<ul className="p-0 m-0 text-center">
						<li className="inline-block p-0 my-0 mx-4 leading-10">
							Home
						</li>
						<li className="inline-block p-0 my-0 mx-4 leading-10">
							About
						</li>
						<li className="inline-block p-0 my-0 mx-4 leading-10">
							Contact
						</li>
					</ul>
				</header>
				<main className="p-8">
					<p>Hello World!</p>
				</main>
			</div>
		</section>
	)
}

export default function Page() {
	return (
		<main className="bg-purple-500">
			<div>
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

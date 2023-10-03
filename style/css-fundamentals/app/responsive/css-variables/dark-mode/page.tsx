function renderStarter() {
	return (
		<section className="p-8 bg-gray-200">
			<main>
				<h1 className="text-2xl font-bold my-3 text-center">
					Artificial Plants
				</h1>
				<p className="">
					Artificial plants and flowers bring the vibrance of plants
					without the work. Shop many varieties and types:
				</p>
				<nav>
					<ul>
						<li>
							<a href="/large">Large Plants</a>
						</li>
						<li>
							<a href="bouq">Bouquets</a>
						</li>
						<li>
							<a href="/vines">Vines</a>
						</li>
					</ul>
				</nav>
			</main>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-8 bg-gray-200">
			<main>
				<h1 className="text-2xl font-bold my-3 text-center">
					Artificial Plants
				</h1>
				<p className="">
					Artificial plants and flowers bring the vibrance of plants
					without the work. Shop many varieties and types:
				</p>
				<nav>
					<ul>
						<li>
							<a href="/large">Large Plants</a>
						</li>
						<li>
							<a href="bouq">Bouquets</a>
						</li>
						<li>
							<a href="/vines">Vines</a>
						</li>
					</ul>
				</nav>
			</main>
		</section>
	)
}

export default function Page() {
	return (
		<main className="bg-gray-200">
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

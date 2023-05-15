function renderStarter() {
	return (
		<section className="p-4 h-60 bg-orange-600">
			<nav>
				<ul>
					<li>
						<a href="#">Home</a>
					</li>
					<li>
						<a href="#">Contact</a>
					</li>
					<li>
						<a href="#">Browse</a>
					</li>
				</ul>
			</nav>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4 h-60 bg-orange-600">
			<nav>
				<ul>
					<li>
						<a href="#">Home</a>
					</li>
					<li>
						<a href="#">Contact</a>
					</li>
					<li>
						<a href="#">Browse</a>
					</li>
				</ul>
			</nav>
		</section>
	)
}

export default function Page() {
	return (
		<main className="h-full bg-purple-500">
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

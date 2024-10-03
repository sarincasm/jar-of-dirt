/* eslint-disable @next/next/no-img-element */
function renderStarter() {
	return (
		<section>
			<nav>
				<ul className="flex gap-4">
					<li>
						<a href="/">News</a>
					</li>
					<li>
						<a href="/">Classifieds</a>
					</li>
					<li>
						<a href="/">Opinion</a>
					</li>
				</ul>
			</nav>
		</section>
	)
}

function renderDone() {
	return (
		<section>
			<nav>
				<ul className="flex gap-4">
					<li>
						<a href="/">News</a>
					</li>
					<li>
						<a href="/">Classifieds</a>
					</li>
					<li>
						<a href="/">Opinion</a>
					</li>
				</ul>
			</nav>
		</section>
	)
}

export default function Page() {
	return (
		<main className="bg-gray-100">
			<div>
				<h2 className="text-2xl font-bold py-3 text-center">Starter</h2>
				{renderStarter()}
				<h2 className="text-2xl font-bold my-3 text-center">Finished</h2>
				{renderDone()}
			</div>
		</main>
	)
}

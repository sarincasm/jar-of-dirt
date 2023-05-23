function renderStarter() {
	return (
		<section className="p-4 bg-white">
			<nav className="w-56 p-4 border-2 border-solid border-black">
				<h2 className="text-2xl font-bold">Navigation</h2>
				<ul>
					<li>Home</li>
					<li>Shop</li>
					<li>Contact</li>
				</ul>
			</nav>
			<main className="p-4 border-2 border-solid border-black">
				<h1 className="text-3xl font-bold">Welcome to Thingstore</h1>
				<p>Please enjoy your time shopping!</p>
			</main>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4 bg-white">
			<nav className="w-56 p-4 border-2 border-solid border-black">
				<h2 className="text-2xl font-bold">Navigation</h2>
				<ul>
					<li>Home</li>
					<li>Shop</li>
					<li>Contact</li>
				</ul>
			</nav>
			<main className="p-4 border-2 border-solid border-black">
				<h1 className="text-3xl font-bold">Welcome to Thingstore</h1>
				<p>Please enjoy your time shopping!</p>
			</main>
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

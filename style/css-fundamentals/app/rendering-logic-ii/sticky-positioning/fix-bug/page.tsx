function renderStarter() {
	return (
		<section className="overflow-y-scroll h-52 bg-gray-400">
			<div className="h-80">
				<header className="p-4">
					<div className="sticky top-0 w-12 h-12 bg-pink-500 rounded"></div>
				</header>
				<main className="p-4">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
						do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						Ut enim ad minim veniam, quis nostrud exercitation ullamco
						laboris nisi ut aliquip ex ea commodo consequat. Duis aute
						irure dolor in reprehenderit in voluptate velit esse cillum
						dolore eu fugiat nulla pariatur. Excepteur sint occaecat
						cupidatat non proident, sunt in culpa qui officia deserunt
						mollit anim id est laborum.
					</p>
				</main>
			</div>
		</section>
	)
}

function renderDone() {
	return (
		<section className="overflow-y-scroll h-52 bg-gray-400">
			<div className="h-80">
				<header className="p-4 sticky top-0">
					<div className="w-12 h-12 bg-pink-500 rounded"></div>
				</header>
				<main className="p-4">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
						do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						Ut enim ad minim veniam, quis nostrud exercitation ullamco
						laboris nisi ut aliquip ex ea commodo consequat. Duis aute
						irure dolor in reprehenderit in voluptate velit esse cillum
						dolore eu fugiat nulla pariatur. Excepteur sint occaecat
						cupidatat non proident, sunt in culpa qui officia deserunt
						mollit anim id est laborum.
					</p>
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

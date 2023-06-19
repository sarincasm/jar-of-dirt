function renderStarter() {
	return (
		<section className="p-4 bg-white flex">
			<nav className="h-52 border-2 border-solid border-red-500"></nav>
			<main className="h-52 border-2 border-solid border-yellow-300"></main>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4 bg-white flex justify-center">
			<nav className="h-52 border-2 border-solid border-red-500 max-w-[150px] flex-1"></nav>
			<main className="h-52 border-2 border-solid border-yellow-300 flex-[2] max-w-lg"></main>
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

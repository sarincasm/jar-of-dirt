function renderStarter() {
	return (
		<section className="p-4 bg-white flex">
			<article className="m-2 rounded-2xl h-52 bg-blue-400 border-blue-300 border-2"></article>
			<article className="m-2 rounded-2xl h-52 bg-pink-400 border-pink-300 border-2"></article>
			<article className="m-2 rounded-2xl h-52 bg-yellow-400 border-yellow-300 border-2"></article>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4 bg-white flex">
			<article className="m-2 rounded-2xl h-52 bg-blue-400 border-blue-300 border-2"></article>
			<article className="m-2 rounded-2xl h-52 bg-pink-400 border-pink-300 border-2"></article>
			<article className="m-2 rounded-2xl h-52 bg-yellow-400 border-yellow-300 border-2"></article>
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

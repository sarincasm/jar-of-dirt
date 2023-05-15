function renderStarter() {
	return (
		<section className="p-4 h-60 bg-orange-600">
			<div className="rounded-full w-10 h-10 bg-yellow-400"></div>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4 h-60 bg-orange-600">
			<div className="flex justify-center items-center h-full">
				<div className="rounded-full w-10 h-10 bg-yellow-400"></div>
			</div>
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

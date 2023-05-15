function renderStarter() {
	return (
		<section className="p-4">
			<div className="rounded-lg bg-white shadow-md shadow-black/20 overflow-hidden mx-auto max-w-3xl">
				<div className="p-4">
					<h2 className="text-2xl font-bold mt-[-6px] mb-1">
						Are You Sure ?
					</h2>
					<p className="font-light mb-2">This action cannot be undone.</p>
				</div>
				<footer className="bg-gray-300 p-4">
					<button className="py-2 px-4 bg-transparent cursor-pointer rounded border border-solid border-black">
						Cancel
					</button>
					<button className="py-2 px-4 bg-black text-white cursor-pointer rounded border border-solid border-black">
						OK
					</button>
				</footer>
			</div>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4">
			<div className="rounded-lg bg-white shadow-md shadow-black/20 overflow-hidden mx-auto max-w-3xl">
				<div className="p-4">
					<h2 className="text-2xl font-bold mt-[-6px] mb-1">
						Are You Sure ?
					</h2>
					<p className="font-light mb-2">This action cannot be undone.</p>
				</div>
				<footer className="bg-gray-300 p-4 flex justify-between">
					<button className="py-2 px-4 bg-transparent cursor-pointer rounded border border-solid border-black">
						Cancel
					</button>
					<button className="py-2 px-4 bg-black text-white cursor-pointer rounded border border-solid border-black">
						OK
					</button>
				</footer>
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

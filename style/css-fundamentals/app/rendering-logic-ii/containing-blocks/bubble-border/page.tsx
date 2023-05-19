function renderStarter() {
	return (
		<section className="p-4">
			<div className="bg-white p-8 rounded-lg">
				<div className="border-4 border-pink-500 h-36 m-16">
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4">
			<div className="bg-white p-8 rounded-lg">
				<div className="border-4 border-pink-500 h-36 m-16">
					<div></div>
					<div></div>
					<div></div>
				</div>
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

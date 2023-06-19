function renderStarter() {
	return (
		<section className="p-4">
			<div className="bg-white p-8 rounded-lg max-w-2xl mx-auto mt-4">
				<h1 className="bg-pink-500 py-4 px-8 mb-6 text-center rounded text-3xl font-bold">
					An Otter Essay
				</h1>
				<p>
					Otters have long, slim bodies and relatively short limbs. Their
					most striking anatomical features are the powerful webbed feet
					used to swim, and their seal-like abilities holding breath
					underwater.
				</p>
			</div>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4">
			<div className="bg-white p-8 rounded-lg max-w-2xl mx-auto mt-4">
				<h1 className="bg-pink-500 py-4 px-8 mb-6 text-center rounded text-3xl font-bold -mt-12">
					An Otter Essay
				</h1>
				<p>
					Otters have long, slim bodies and relatively short limbs. Their
					most striking anatomical features are the powerful webbed feet
					used to swim, and their seal-like abilities holding breath
					underwater.
				</p>
			</div>
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

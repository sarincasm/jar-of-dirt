function renderStarter() {
	return (
		<section>
			<div className="bg-white p-8 rounded-lg">
				<p className="mb-4">
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
		<section>
			<div className="bg-white p-8 rounded-lg">
				<p className="mb-4">
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
		<main className="min-h-full bg-purple-500">
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

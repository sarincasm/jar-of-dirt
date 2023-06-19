import Image from 'next/image'

function renderStarter() {
	return (
		<section className="p-4">
			<div className="bg-white p-8 rounded-lg max-w-2xl mx-auto mt-4">
				<p className="mb-4">
					Otters have long, slim bodies and relatively short limbs. Their
					most striking anatomical features are the powerful webbed feet
					used to swim, and their seal-like abilities holding breath
					underwater.
				</p>
				<Image
					className="mb-4 w-full h-full"
					width={640}
					height={360}
					alt="A cute otter in water"
					src="https://courses.joshwcomeau.com/cfj-mats/otter.jpg"
				/>
				<p className="mb-4">
					More importantly, otters are glorious water dogs, playful and
					curious. The otter, no other, is the best animal.
				</p>
			</div>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4">
			<div className="bg-white py-8 rounded-lg max-w-2xl mx-auto mt-4">
				<p className="mb-4 px-8">
					Otters have long, slim bodies and relatively short limbs. Their
					most striking anatomical features are the powerful webbed feet
					used to swim, and their seal-like abilities holding breath
					underwater.
				</p>
				<Image
					className="mb-4 w-full h-full"
					width={640}
					height={360}
					alt="A cute otter in water"
					src="https://courses.joshwcomeau.com/cfj-mats/otter.jpg"
				/>
				<p className="mb-4 px-8">
					More importantly, otters are glorious water dogs, playful and
					curious. The otter, no other, is the best animal.
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

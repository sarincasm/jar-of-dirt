import Image from 'next/image'

function renderStarter() {
	return (
		<section className="p-4">
			<div className="bg-white p-8 rounded-lg">
				<figure className="p-2 border border-solid mb-8">
					<Image
						alt="A hallway with rainbow-colored lighting"
						src="https://courses.joshwcomeau.com/cfj-mats/wall-art.jpg"
						width={500}
						height={750}
						className="mb-2"
					/>
					<figcaption className="text-center text-gray-600">
						Photo by Efe Kurnaz in Camp Nou, Barcelona, Spain. Found on
						Unsplash.
					</figcaption>
				</figure>
				<figure className="p-2 border border-solid mb-8">
					<Image
						alt="A yawning kitten"
						src="https://courses.joshwcomeau.com/cfj-mats/cat-avatar-250px.jpg"
						width={250}
						height={250}
						className="mb-2"
					/>
					<figcaption className="text-center text-gray-600">
						Unknown photographer. Found on Unsplash.
					</figcaption>
				</figure>
			</div>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4">
			<div className="bg-white p-8 rounded-lg">
				<figure className="p-2 border border-solid mb-8 w-min">
					<Image
						alt="A hallway with rainbow-colored lighting"
						src="https://courses.joshwcomeau.com/cfj-mats/wall-art.jpg"
						width={500}
						height={750}
						className="mb-2 max-w-[initial]"
					/>
					<figcaption className="text-center text-gray-600">
						Photo by Efe Kurnaz in Camp Nou, Barcelona, Spain. Found on
						Unsplash.
					</figcaption>
				</figure>
				<figure className="p-2 border border-solid mb-8 w-min">
					<Image
						alt="A yawning kitten"
						src="https://courses.joshwcomeau.com/cfj-mats/cat-avatar-250px.jpg"
						width={250}
						height={250}
						className="mb-2 max-w-[initial]"
					/>
					<figcaption className="text-center text-gray-600">
						Unknown photographer. Found on Unsplash.
					</figcaption>
				</figure>
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

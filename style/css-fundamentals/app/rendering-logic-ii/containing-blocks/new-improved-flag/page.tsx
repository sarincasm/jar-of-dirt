import Image from 'next/image'

function renderStarter() {
	return (
		<section className="p-4">
			<article className="max-w-xs shadow-sm mx-auto my-0 p-4 rounded-lg bg-white">
				<div className="mb-3 -m-4">
					<Image
						alt="Product photo of a minimal watch"
						width={640}
						height={465}
						src="https://courses.joshwcomeau.com/cfj-mats/watch-rachit-tank.jpg"
						className="w-full rounded-t-lg"
					/>
				</div>
				<div className="text-base font-medium leading-loose shadow-sm bg-yellow-100">
					New and Improved!
				</div>
				<h2 className="text-2xl font-medium mb-1">
					Novus Watch
					<span className="text-base text-gray-500 font-light">
						{' '}
						Series IV
					</span>
				</h2>
				<p>
					The pinnacle of fashion and tech. This wearable piece is an
					homage to gilded palaces and minimal regalia, combining
					nouveau-deco and brutalism influences in a compact, Swiss-made
					watch.
				</p>
			</article>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4">
			<article className="relative max-w-xs shadow-sm mx-auto my-0 p-4 rounded-lg bg-white">
				<div className="mb-3 -m-4">
					<Image
						alt="Product photo of a minimal watch"
						width={640}
						height={465}
						src="https://courses.joshwcomeau.com/cfj-mats/watch-rachit-tank.jpg"
						className="w-full rounded-t-lg"
					/>
				</div>
				<div className="absolute top-2 -left-2 pl-2 rounded-l rounded-r-2xl pr-3 text-base font-medium leading-loose shadow-sm bg-yellow-100">
					New and Improved!
				</div>
				<h2 className="text-2xl font-medium mb-1">
					Novus Watch
					<span className="text-base text-gray-500 font-light">
						{' '}
						Series IV
					</span>
				</h2>
				<p>
					The pinnacle of fashion and tech. This wearable piece is an
					homage to gilded palaces and minimal regalia, combining
					nouveau-deco and brutalism influences in a compact, Swiss-made
					watch.
				</p>
			</article>
		</section>
	)
}

export default function Page() {
	return (
		<main className="bg-purple-500">
			<div>
				<h2 className="text-2xl font-bold py-3 text-center text-white">
					Starter
				</h2>
				{renderStarter()}
				<h2 className="text-2xl font-bold py-3 text-center text-white">
					Finished
				</h2>
				{renderDone()}
			</div>
		</main>
	)
}

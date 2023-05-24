import Image from 'next/image'

function renderStarter() {
	return (
		<section className="p-4 bg-white">
			<div>
				<button>
					<Image
						src="https://courses.joshwcomeau.com/cfj-mats/cat-300px.jpg"
						alt="Cat"
						width={300}
						height={300}
					/>
				</button>
				<button>
					<Image
						src="https://courses.joshwcomeau.com/cfj-mats/dog-one-300px.jpg"
						alt="Dog"
						width={300}
						height={300}
					/>
				</button>
				<div>
					<button>Prev</button>
					<button>Next</button>
				</div>
			</div>
			<div>
				<Image
					src="https://courses.joshwcomeau.com/cfj-mats/cat-300px.jpg"
					width={300}
					height={300}
					alt="cat"
				/>
			</div>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4 bg-white flex gap-3">
			<div className="w-36 flex flex-col gap-3 flex-[0_0_200px]">
				<button>
					<Image
						src="https://courses.joshwcomeau.com/cfj-mats/cat-300px.jpg"
						alt="Cat"
						width={300}
						height={300}
					/>
				</button>
				<button>
					<Image
						src="https://courses.joshwcomeau.com/cfj-mats/dog-one-300px.jpg"
						alt="Dog"
						width={300}
						height={300}
					/>
				</button>
				<div className="flex justify-between mt-auto">
					<button>Prev</button>
					<button>Next</button>
				</div>
			</div>
			<div className="grow">
				<Image
					src="https://courses.joshwcomeau.com/cfj-mats/cat-300px.jpg"
					className="w-full"
					width={300}
					height={300}
					alt="cat"
				/>
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

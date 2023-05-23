import Image from 'next/image'

function renderStarter() {
	return (
		<section className="p-4 bg-white">
			<main>
				<article className="m-2 rounded-2xl shadow-md">
					<Image
						src="https://courses.joshwcomeau.com/cfj-mats/cat-300px.jpg"
						width={300}
						height={300}
						alt="A cat"
						className="rounded-t-xl"
					/>
					<section className="pt-2 pb-4 px-4">
						<h2 className="text-xl font-bold mb-2">
							Study: Catnip is GOOD
						</h2>
						<p className="font-light">
							The number-crunching mousers have good news for us all:
							catnip is as good for us as it feels!
						</p>
					</section>
				</article>
				<article className="m-2 rounded-2xl shadow-md">
					<Image
						src="https://courses.joshwcomeau.com/cfj-mats/cat-two-300px.jpg"
						width={300}
						height={300}
						alt="A cat"
						className="rounded-t-xl"
					/>
					<section className="pt-2 pb-4 px-4">
						<h2 className="text-xl font-bold mb-2">
							My journey from the city to the exurbs
						</h2>
						<p className="font-light">
							When the human said we&apos;d be moving to rural Wisconsin,
							I was indifferent; who cares where we live, as long as they
							keep the wet food coming, right? But I soon discovered:
							Wisconsin has an incredible bounty of mice and cheese.
						</p>
					</section>
				</article>
				<article className="m-2 rounded-2xl shadow-md">
					<Image
						src="https://courses.joshwcomeau.com/cfj-mats/cat-three-300px.jpg"
						width={300}
						height={300}
						alt="A cat"
						className="rounded-t-xl"
					/>
					<section className="pt-2 pb-4 px-4">
						<h2 className="text-xl font-bold mb-2">
							Their trinkets deserve to fall
						</h2>
						<p className="font-light">
							When the human said we&apos;d be moving to rural Wisconsin,
							I was indifferent; who cares where we live, as long as they
							keep the wet food coming, right? But I soon discovered:
							Wisconsin has an incredible bounty of mice and cheese.
						</p>
					</section>
				</article>
			</main>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4 bg-white">
			<main>
				<article className="m-2 rounded-2xl shadow-md">
					<Image
						src="https://courses.joshwcomeau.com/cfj-mats/cat-300px.jpg"
						width={300}
						height={300}
						alt="A cat"
						className="rounded-t-xl"
					/>
					<section className="pt-2 pb-4 px-4">
						<h2 className="text-xl font-bold mb-2">
							Study: Catnip is GOOD
						</h2>
						<p className="font-light">
							The number-crunching mousers have good news for us all:
							catnip is as good for us as it feels!
						</p>
					</section>
				</article>
				<article className="m-2 rounded-2xl shadow-md">
					<Image
						src="https://courses.joshwcomeau.com/cfj-mats/cat-two-300px.jpg"
						width={300}
						height={300}
						alt="A cat"
						className="rounded-t-xl"
					/>
					<section className="pt-2 pb-4 px-4">
						<h2 className="text-xl font-bold mb-2">
							My journey from the city to the exurbs
						</h2>
						<p className="font-light">
							When the human said we&apos;d be moving to rural Wisconsin,
							I was indifferent; who cares where we live, as long as they
							keep the wet food coming, right? But I soon discovered:
							Wisconsin has an incredible bounty of mice and cheese.
						</p>
					</section>
				</article>
				<article className="m-2 rounded-2xl shadow-md">
					<Image
						src="https://courses.joshwcomeau.com/cfj-mats/cat-three-300px.jpg"
						width={300}
						height={300}
						alt="A cat"
						className="rounded-t-xl"
					/>
					<section className="pt-2 pb-4 px-4">
						<h2 className="text-xl font-bold mb-2">
							Their trinkets deserve to fall
						</h2>
						<p className="font-light">
							When the human said we&apos;d be moving to rural Wisconsin,
							I was indifferent; who cares where we live, as long as they
							keep the wet food coming, right? But I soon discovered:
							Wisconsin has an incredible bounty of mice and cheese.
						</p>
					</section>
				</article>
			</main>
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

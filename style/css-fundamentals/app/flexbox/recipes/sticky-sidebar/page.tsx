import Image from 'next/image'

function renderStarter() {
	return (
		<section className="p-4 bg-white flex">
			<nav className="sticky top-0 p-4">
				<h2 className="text-2xl font-bold mb-2">Navigation</h2>
				<ul>
					<li>Section One</li>
					<li>Section Two</li>
				</ul>
			</nav>
			<main className="flex-1 p-4">
				<p>This container contains random stuff to increase its height.</p>
				<Image
					src="https://courses.joshwcomeau.com/cfj-mats/cat-300px.jpg"
					width={300}
					height={300}
					alt="Cat"
					className="mt-4 mb-16"
				/>
				<p>This container contains random stuff to increase its height.</p>
				<Image
					src="https://courses.joshwcomeau.com/cfj-mats/cat-300px.jpg"
					width={300}
					height={300}
					alt="Cat"
					className="mt-4 mb-16"
				/>
				<p>This container contains random stuff to increase its height.</p>
				<Image
					src="https://courses.joshwcomeau.com/cfj-mats/cat-300px.jpg"
					width={300}
					height={300}
					alt="Cat"
					className="mt-4 mb-16"
				/>
				<p>This container contains random stuff to increase its height.</p>
				<Image
					src="https://courses.joshwcomeau.com/cfj-mats/cat-300px.jpg"
					width={300}
					height={300}
					alt="Cat"
					className="mt-4 mb-16"
				/>
			</main>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4 bg-white flex">
			<nav className="sticky top-0 p-4 self-start">
				<h2 className="text-2xl font-bold mb-2">Navigation</h2>
				<ul>
					<li>Section One</li>
					<li>Section Two</li>
				</ul>
			</nav>
			<main className="flex-1 p-4">
				<p>This container contains random stuff to increase its height.</p>
				<Image
					src="https://courses.joshwcomeau.com/cfj-mats/cat-300px.jpg"
					width={300}
					height={300}
					alt="Cat"
					className="mt-4 mb-16"
				/>
				<p>This container contains random stuff to increase its height.</p>
				<Image
					src="https://courses.joshwcomeau.com/cfj-mats/cat-300px.jpg"
					width={300}
					height={300}
					alt="Cat"
					className="mt-4 mb-16"
				/>
				<p>This container contains random stuff to increase its height.</p>
				<Image
					src="https://courses.joshwcomeau.com/cfj-mats/cat-300px.jpg"
					width={300}
					height={300}
					alt="Cat"
					className="mt-4 mb-16"
				/>
				<p>This container contains random stuff to increase its height.</p>
				<Image
					src="https://courses.joshwcomeau.com/cfj-mats/cat-300px.jpg"
					width={300}
					height={300}
					alt="Cat"
					className="mt-4 mb-16"
				/>
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

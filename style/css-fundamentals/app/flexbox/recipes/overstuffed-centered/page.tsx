import Image from 'next/image'

function renderStarter() {
	return (
		<section className="p-4 bg-white w-[200px] mx-auto">
			<p>This is a cat:</p>
			<Image
				src="https://courses.joshwcomeau.com/cfj-mats/cat-300px.jpg"
				width={300}
				height={300}
				alt="Cat"
				className="block w-[300px] mt-4 max-w-[initial]"
			/>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4 bg-white w-[200px] mx-auto flex flex-col">
			<p>This is a cat:</p>
			<Image
				src="https://courses.joshwcomeau.com/cfj-mats/cat-300px.jpg"
				width={300}
				height={300}
				alt="Cat"
				className="block w-[300px] mt-4 max-w-[initial] self-center"
			/>
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

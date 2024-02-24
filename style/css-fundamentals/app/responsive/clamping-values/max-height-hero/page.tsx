function renderStarter() {
	return (
		<section className="text-white">
			<div className="h-[80vh] bg-[url('https://courses.joshwcomeau.com/cfj-mats/night-sky.jpg')] bg-cover bg-bottom flex flex-col items-center justify-center text-center">
				<h1 className="text-8xl font-bold my-4">Words and Things</h1>
				<h2 className="text-4xl font-bold">
					A collection of letters and symbols.
				</h2>
			</div>
			<main className="py-16">
				<div className="max-w-2xl my-0 mx-auto p-8">
					<p className="text-2xl mb-6">
						There are many variations of passages of Lorem Ipsum
						available, but the majority have suffered alteration in some
						form, by injected humour, or randomised words which don&apos;t
						look even slightly believable.
					</p>
					<p className="text-2xl mb-6">
						If you are going to use a passage of Lorem Ipsum, you need to
						be sure there isn&apos;t anything embarrassing hidden in the
						middle of text.
					</p>
				</div>
			</main>
		</section>
	)
}

function renderDone() {
	return (
		<section className="text-white">
			<div className="h-[80vh] bg-[url('https://courses.joshwcomeau.com/cfj-mats/night-sky.jpg')] bg-cover bg-bottom flex flex-col items-center justify-center text-center">
				<h1 className="text-8xl font-bold my-4">Words and Things</h1>
				<h2 className="text-4xl font-bold">
					A collection of letters and symbols.
				</h2>
			</div>
			<main className="py-16">
				<div className="max-w-2xl my-0 mx-auto p-8">
					<p className="text-2xl mb-6">
						There are many variations of passages of Lorem Ipsum
						available, but the majority have suffered alteration in some
						form, by injected humour, or randomised words which don&apos;t
						look even slightly believable.
					</p>
					<p className="text-2xl mb-6">
						If you are going to use a passage of Lorem Ipsum, you need to
						be sure there isn&apos;t anything embarrassing hidden in the
						middle of text.
					</p>
				</div>
			</main>
		</section>
	)
}

export default function Page() {
	return (
		<main className="bg-black">
			<div>
				<h2 className="text-2xl my-3 font-bold text-center text-white absolute w-full">
					Starter
				</h2>
				{renderStarter()}
				<h2 className="text-2xl my-3 font-bold text-center text-white absolute w-full">
					Finished
				</h2>
				{renderDone()}
			</div>
		</main>
	)
}

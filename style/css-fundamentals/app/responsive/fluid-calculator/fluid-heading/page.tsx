/* eslint-disable @next/next/no-img-element */
function renderStarter() {
	return (
		<section>
			<h2 className="text-[2rem]">Tweak Me</h2>
		</section>
	)
}

function renderDone() {
	return (
		<section>
			<h2 className="text-[2rem]">Tweak Me</h2>
		</section>
	)
}

export default function Page() {
	return (
		<main className="bg-gray-100">
			<div>
				<h2 className="text-2xl font-bold py-3 text-center">Starter</h2>
				{renderStarter()}
				<h2 className="text-2xl font-bold my-3 text-center">Finished</h2>
				{renderDone()}
			</div>
		</main>
	)
}

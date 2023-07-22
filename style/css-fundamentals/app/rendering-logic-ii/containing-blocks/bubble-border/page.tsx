function renderStarter() {
	return (
		<section className="p-4">
			<div className="bg-white p-8 rounded-lg">
				<div className="border-4 border-pink-500 h-36 m-16">
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4">
			<div className="bg-white p-8 rounded-lg">
				<div className="border-4 border-pink-500 h-36 m-16 relative">
					<div className="w-16 h-16 rounded-full border-inherit border-4 absolute -left-8 -top-8 bg-white"></div>
					<div className="w-8 h-8 rounded-full border-inherit border-4 absolute -left-4 top-9 bg-white"></div>
					<div className="w-6 h-6 rounded-full border-inherit border-4 absolute left-9 -top-[12px] bg-white"></div>
				</div>
			</div>
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

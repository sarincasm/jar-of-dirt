function renderStarter() {
	return (
		<section className="p-4 bg-white">
			<div className="flex items-center shadow-md rounded p-2">
				<div className="flex w-10 h-10 justify-center items-center bg-green-500 text-white rounded-full mr-2"></div>
				<div className="flex-grow">
					Thanks for participating in our survey!
				</div>
			</div>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4 bg-white">
			<div className="flex items-center shadow-md rounded p-2">
				<div className="flex w-10 h-10 justify-center items-center bg-green-500 text-white rounded-full mr-2"></div>
				<div className="flex-grow">
					Thanks for participating in our survey!
				</div>
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

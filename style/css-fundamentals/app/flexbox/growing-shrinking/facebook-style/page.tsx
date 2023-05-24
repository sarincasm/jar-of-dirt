function renderStarter() {
	return (
		<section className="p-4 bg-white flex">
			<nav className="h-52 border-2 border-solid border-red-500 bg-red-500/20"></nav>
			<main className="h-52 border-2 border-solid border-purple-400 bg-purple-400/20"></main>
			<aside className="h-52 border-2 border-solid border-green-400 hidden bg-green-400/20 md:block"></aside>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4 bg-white flex">
			<nav className="h-52 border-2 border-solid border-red-500 bg-red-500/20 min-w-[150px] flex-[0_10000_240px] hidden sm:block"></nav>
			<main className="h-52 border-2 border-solid border-purple-400 bg-purple-400/20 flex-[1_1_320px]"></main>
			<aside className="h-52 border-2 border-solid border-green-400 bg-green-400/20 min-w-[150px] flex-[0_10000_240px]"></aside>
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

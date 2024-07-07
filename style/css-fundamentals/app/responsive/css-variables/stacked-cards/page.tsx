function renderStarter() {
	return (
		<section className="py-8">
			<main className="flex flex-col items-center gap-2 p-2 sm:gap-4 sm:p-4 md:gap-8 md:p-8">
				<article className="p-2 rounded-lg sm:p-4 sm:rounded-2xl md:p-8 md:rounded-[32px] bg-white h-48 w-full max-w-xl flex justify-center">
					Card 1
				</article>
				<article className="p-2 rounded-lg sm:p-4 sm:rounded-2xl md:p-8 md:rounded-[32px] bg-white h-48 w-full max-w-xl flex justify-center">
					Card 2
				</article>
				<article className="p-2 rounded-lg sm:p-4 sm:rounded-2xl md:p-8 md:rounded-[32px] bg-white h-48 w-full max-w-xl flex justify-center">
					Card 3
				</article>
			</main>
		</section>
	)
}

function renderDone() {
	return (
		<section className="py-8">
			<main className="[--spacing:8px] flex flex-col items-center gap-[--spacing] p-[--spacing] sm:[--spacing:16px] md:[--spacing:32px]">
				<article className="p-[--spacing] rounded-[--spacing] bg-white h-48 w-full max-w-xl flex justify-center">
					Card 1
				</article>
				<article className="p-[--spacing] rounded-[--spacing] bg-white h-48 w-full max-w-xl flex justify-center">
					Card 2
				</article>
				<article className="p-[--spacing] rounded-[--spacing] bg-white h-48 w-full max-w-xl flex justify-center">
					Card 3
				</article>
			</main>
		</section>
	)
}

export default function Page() {
	return (
		<main className="bg-purple-900">
			<div>
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

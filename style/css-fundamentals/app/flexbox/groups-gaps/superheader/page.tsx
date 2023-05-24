function visuallyHidden(text: string) {
	return (
		<span className="absolute overflow-hidden h-px w-px -m-px p-0 border-0">
			{text}
		</span>
	)
}

function renderStarter() {
	return (
		<section className="p-4 bg-white flex">
			<header>Free shipping on orders over $100</header>
			<label>
				{visuallyHidden('Search')}
				<input type="text" placeholder="Search..." />
			</label>
			<button>
				{visuallyHidden('Current Language')}
				English
			</button>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4 bg-white flex">
			<header>Free shipping on orders over $100</header>
			<label>
				{visuallyHidden('Search')}
				<input type="text" placeholder="Search..." />
			</label>
			<button>
				{visuallyHidden('Current Language')}
				English
			</button>
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

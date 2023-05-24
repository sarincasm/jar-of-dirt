function renderStarter() {
	return (
		<section className="p-4 bg-white flex">
			<main className="flex-1">
				<h2 className="text-2xl font-bold" id="heading-one">
					Heading One
				</h2>
				<p className="mb-16">
					Imagine if this was a <a href="">real blog post</a>, and this was{' '}
					<a href="">real content</a>!
				</p>
				<h2 className="text-2xl font-bold" id="heading-two">
					Heading Two
				</h2>
				<p className="mb-16">
					In order to keep this playground manageable, the content is going
					to be much shorter than it would be in a real-world scenario.
				</p>
				<h2 className="text-2xl font-bold" id="heading-three">
					Heading Three
				</h2>
				<p className="mb-16">I hope that makes sense!</p>
				<form className="p-8 border border-dotted">
					<h2 className="mb-4">Join the newsletter!</h2>
					<label>
						Email:
						<input className="w-16" />
					</label>
					<button>Subscribe</button>
				</form>
			</main>
			<aside className="ml-4 min-w-[200px]">
				<nav className="bg-gray-200 p-4">
					<h2 className="text-base uppercase text-gray-600 tracking-wider font-normal">
						Table of Contents
					</h2>
					<ul className="pl-4">
						<li className="py-2 px-0">
							<a href="#heading-one">Heading One</a>
						</li>
						<li className="py-2 px-0">
							<a href="#heading-two" className="text-black">
								Heading Two
							</a>
						</li>
						<li className="py-2 px-0">
							<a href="#heading-three">Heading Three</a>
						</li>
					</ul>
				</nav>
			</aside>{' '}
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4 bg-white flex">
			<main className="flex-1">
				<h2 className="text-2xl font-bold" id="heading-one">
					Heading One
				</h2>
				<p className="mb-16">
					Imagine if this was a <a href="">real blog post</a>, and this was{' '}
					<a href="">real content</a>!
				</p>
				<h2 className="text-2xl font-bold" id="heading-two">
					Heading Two
				</h2>
				<p className="mb-16">
					In order to keep this playground manageable, the content is going
					to be much shorter than it would be in a real-world scenario.
				</p>
				<h2 className="text-2xl font-bold" id="heading-three">
					Heading Three
				</h2>
				<p className="mb-16">I hope that makes sense!</p>
				<form className="p-8 border border-dotted">
					<h2 className="mb-4">Join the newsletter!</h2>
					<label>
						Email:
						<input className="w-16" />
					</label>
					<button>Subscribe</button>
				</form>
			</main>
			<aside className="ml-4 min-w-[200px]">
				<nav className="bg-gray-200 p-4">
					<h2 className="text-base uppercase text-gray-600 tracking-wider font-normal">
						Table of Contents
					</h2>
					<ul className="pl-4">
						<li className="py-2 px-0">
							<a href="#heading-one">Heading One</a>
						</li>
						<li className="py-2 px-0">
							<a href="#heading-two" className="text-black">
								Heading Two
							</a>
						</li>
						<li className="py-2 px-0">
							<a href="#heading-three">Heading Three</a>
						</li>
					</ul>
				</nav>
			</aside>{' '}
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

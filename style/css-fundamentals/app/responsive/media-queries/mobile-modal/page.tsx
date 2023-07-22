function renderStarter() {
	return (
		<section className="py-8 gap-8">
			<header className="flex justify-between items-baseline p-4">
				<h1 className="text-3xl font-semibold">Mary&apos;s Homepage</h1>
				<nav>
					<ul className="flex gap-2 list-none">
						<li>
							<a href="/" className="text-lg px-4">
								Home
							</a>
						</li>
						<li>
							<a href="/" className="text-lg px-4">
								Blog
							</a>
						</li>
					</ul>
				</nav>
			</header>
			<main className="min-h-[25vh] flex justify-center items-center">
				<button className="text-lg py-4 px-12 outline-offset-8 bg-red-300">
					Open
				</button>
			</main>

			<div className="fixed inset-0 bg-black/50 flex justify-center items-center">
				<div className="relative bg-white rounded-lg w-3/5">
					<header className="p-4">
						<h2 className="text-2xl">Contact Us</h2>
						<button className="absolute -top-12 right-0 bg-transparent border-none w-12 h-12 cursor-pointer text-white">
							X
						</button>
					</header>
					<div className="p-4">
						<form>
							<div className="flex items-baseline gap-2 p-1">
								<label htmlFor="name" className="flex-[2]">
									Name:
								</label>
								<input
									type="text"
									id="name"
									placeholder="Eels"
									className="flex-[4] p-1 min-w-[80px]"
								/>
							</div>
							<div className="flex items-baseline gap-2 p-1">
								<label htmlFor="email" className="flex-[2]">
									Email:
								</label>
								<input
									type="email"
									id="email"
									placeholder="eels@eels.com"
									className="flex-[4] p-1 min-w-[80px]"
								/>
							</div>
							<div className="flex items-baseline gap-2 p-1">
								<label htmlFor="message" className="flex-[2]">
									Message:
								</label>
								<input
									type="textarea"
									id="message"
									className="flex-[4] p-1 min-w-[80px] h-36"
								/>
							</div>
							<button className="block mt-8 mx-auto py-2 px-8 outline-offset-8 bg-red-300">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}

function renderDone() {
	return (
		<section className="py-8 gap-8">
			<header className="flex justify-between items-baseline p-4">
				<h1 className="text-3xl font-semibold">Mary&apos;s Homepage</h1>
				<nav>
					<ul className="flex gap-2 list-none">
						<li>
							<a href="/" className="text-lg px-4">
								Home
							</a>
						</li>
						<li>
							<a href="/" className="text-lg px-4">
								Blog
							</a>
						</li>
					</ul>
				</nav>
			</header>
			<main className="min-h-[25vh] flex justify-center items-center">
				<button className="text-lg py-4 px-12 outline-offset-8 bg-red-300">
					Open
				</button>
			</main>

			<div className="fixed inset-0 bg-black/50 flex justify-center items-center">
				<div className="relative bg-white rounded-lg w-3/5">
					<header className="p-4">
						<h2 className="text-2xl">Contact Us</h2>
						<button className="absolute -top-12 right-0 bg-transparent border-none w-12 h-12 cursor-pointer text-white">
							X
						</button>
					</header>
					<div className="p-4">
						<form>
							<div className="flex items-baseline gap-2 p-1">
								<label htmlFor="name" className="flex-[2]">
									Name:
								</label>
								<input
									type="text"
									id="name"
									placeholder="Eels"
									className="flex-[4] p-1 min-w-[80px]"
								/>
							</div>
							<div className="flex items-baseline gap-2 p-1">
								<label htmlFor="email" className="flex-[2]">
									Email:
								</label>
								<input
									type="email"
									id="email"
									placeholder="eels@eels.com"
									className="flex-[4] p-1 min-w-[80px]"
								/>
							</div>
							<div className="flex items-baseline gap-2 p-1">
								<label htmlFor="message" className="flex-[2]">
									Message:
								</label>
								<input
									type="textarea"
									id="message"
									className="flex-[4] p-1 min-w-[80px] h-36"
								/>
							</div>
							<button className="block mt-8 mx-auto py-2 px-8 outline-offset-8 bg-red-300">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}

export default function Page() {
	return (
		<main className="bg-gray-300">
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

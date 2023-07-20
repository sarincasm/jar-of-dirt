function renderStarter() {
	return (
		<section className="py-8 flex items-baseline gap-8">
			<nav className="flex-1 max-w-xs bg-white py-6 px-8 rounded-tr-xl rounded-br-xl">
				<h2 className="text-2xl font-bold text-center text-gray-800 uppercase">
					Contents
				</h2>
				<ul>
					<li>
						<a href="#">Intro</a>
					</li>
					<li>
						<a href="#">Chapter 1</a>
					</li>
					<li>
						<a href="#">Chapter 2</a>
					</li>
					<li>
						<a href="#">Chapter 3</a>
					</li>
					<li>
						<a href="#">Chapter 4</a>
					</li>
					<li>
						<a href="#">Chapter 5</a>
					</li>
					<li>
						<a href="#">Conclusion</a>
					</li>
				</ul>
			</nav>

			<main className="flex-[3] bg-white py-6 px-8 rounded-tl-xl rounded-bl-xl">
				<h1 className="text-3xl font-bold text-gray-800 my-6">
					An Article
				</h1>
				<section>
					<h2 className="text-2xl font-bold text-gray-800 my-2">Intro</h2>
					<p>
						Lorem Ipsum is simply dummy text of the printing and
						typesetting industry. Lorem Ipsum has been the industry&apos;s
						standard dummy text ever since the 1500s, when an unknown
						printer took a galley of type and scrambled it to make a type
						specimen book. It has survived not only five centuries, but
						also the leap into electronic typesetting, remaining
						essentially unchanged.
					</p>
				</section>
				<section>
					<h2 className="text-2xl font-bold text-gray-800 my-2">
						Chapter 1
					</h2>
					<p>
						Contrary to popular belief, Lorem Ipsum is not simply random
						text. It has roots in a piece of classical Latin literature
						from 45 BC, making it over 2000 years old. Richard McClintock,
						a Latin professor at Hampden-Sydney College in Virginia,
						looked up one of the more obscure Latin words, consectetur,
						from a Lorem Ipsum passage, and going through the cites of the
						word in classical literature, discovered the undoubtable
						source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
						&ldquo;de Finibus Bonorum et Malorum&rdquo; (The Extremes of
						Good and Evil) by Cicero, written in 45 BC.
					</p>
				</section>
			</main>
		</section>
	)
}

function renderDone() {
	return (
		<section className="py-8 flex items-baseline gap-8">
			<nav className="flex-1 max-w-xs bg-white py-6 px-8 rounded-tr-xl rounded-br-xl">
				<h2 className="text-2xl font-bold text-center text-gray-800 uppercase">
					Contents
				</h2>
				<ul>
					<li>
						<a href="#">Intro</a>
					</li>
					<li>
						<a href="#">Chapter 1</a>
					</li>
					<li>
						<a href="#">Chapter 2</a>
					</li>
					<li>
						<a href="#">Chapter 3</a>
					</li>
					<li>
						<a href="#">Chapter 4</a>
					</li>
					<li>
						<a href="#">Chapter 5</a>
					</li>
					<li>
						<a href="#">Conclusion</a>
					</li>
				</ul>
			</nav>

			<main className="flex-[3] bg-white py-6 px-8 rounded-tl-xl rounded-bl-xl">
				<h1 className="text-3xl font-bold text-gray-800 my-6">
					An Article
				</h1>
				<section>
					<h2 className="text-2xl font-bold text-gray-800 my-2">Intro</h2>
					<p>
						Lorem Ipsum is simply dummy text of the printing and
						typesetting industry. Lorem Ipsum has been the industry&apos;s
						standard dummy text ever since the 1500s, when an unknown
						printer took a galley of type and scrambled it to make a type
						specimen book. It has survived not only five centuries, but
						also the leap into electronic typesetting, remaining
						essentially unchanged.
					</p>
				</section>
				<section>
					<h2 className="text-2xl font-bold text-gray-800 my-2">
						Chapter 1
					</h2>
					<p>
						Contrary to popular belief, Lorem Ipsum is not simply random
						text. It has roots in a piece of classical Latin literature
						from 45 BC, making it over 2000 years old. Richard McClintock,
						a Latin professor at Hampden-Sydney College in Virginia,
						looked up one of the more obscure Latin words, consectetur,
						from a Lorem Ipsum passage, and going through the cites of the
						word in classical literature, discovered the undoubtable
						source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
						&ldquo;de Finibus Bonorum et Malorum&rdquo; (The Extremes of
						Good and Evil) by Cicero, written in 45 BC.
					</p>
				</section>
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

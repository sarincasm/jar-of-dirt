function renderStarter() {
	return (
		<section className="p-4 bg-white flex gap-8 border-2 border-pink-600">
			<div className="flex-1 p-4">
				<h1 className="text-2xl font-bold mb-4">Growing Column</h1>
				<p className="mb-4">
					This column will grow very tall indeed, whilst the adjacent one
					will be clamped to whatever height this one rests at!
				</p>
				<p className="mb-4">
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry&apos;s standard dummy
					text ever since the 1500s, when an unknown printer took a galley
					of type and scrambled it to make a type specimen book
				</p>
			</div>
			<div className="flex-1 p-4">
				<p className="mb-4">
					Here is a list of all the letters in the English language!
				</p>
				<ol>
					<li className="mb-4">Item A</li>
					<li className="mb-4">Item B</li>
					<li className="mb-4">Item C</li>
					<li className="mb-4">Item D</li>
					<li className="mb-4">Item E</li>
					<li className="mb-4">Item F</li>
					<li className="mb-4">Item G</li>
					<li className="mb-4">Item H</li>
					<li className="mb-4">Item I</li>
					<li className="mb-4">Item J</li>
					<li className="mb-4">Item K</li>
					<li className="mb-4">Item L</li>
					<li className="mb-4">Item M</li>
					<li className="mb-4">Item N</li>
					<li className="mb-4">Item O</li>
					<li className="mb-4">Item P</li>
					<li className="mb-4">Item Q</li>
					<li className="mb-4">Item R</li>
					<li className="mb-4">Item S</li>
					<li className="mb-4">Item T</li>
					<li className="mb-4">Item U</li>
					<li className="mb-4">Item V</li>
					<li className="mb-4">Item W</li>
					<li className="mb-4">Item X</li>
					<li className="mb-4">Item Y</li>
					<li className="mb-4">Item Z</li>
				</ol>
			</div>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-4 bg-white flex gap-8 border-2 border-pink-600">
			<div className="flex-1 p-4">
				<h1 className="text-2xl font-bold mb-4">Growing Column</h1>
				<p className="mb-4">
					This column will grow very tall indeed, whilst the adjacent one
					will be clamped to whatever height this one rests at!
				</p>
				<p className="mb-4">
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry&apos;s standard dummy
					text ever since the 1500s, when an unknown printer took a galley
					of type and scrambled it to make a type specimen book
				</p>
			</div>
			<div className="flex-1 p-4">
				<p className="mb-4">
					Here is a list of all the letters in the English language!
				</p>
				<ol>
					<li className="mb-4">Item A</li>
					<li className="mb-4">Item B</li>
					<li className="mb-4">Item C</li>
					<li className="mb-4">Item D</li>
					<li className="mb-4">Item E</li>
					<li className="mb-4">Item F</li>
					<li className="mb-4">Item G</li>
					<li className="mb-4">Item H</li>
					<li className="mb-4">Item I</li>
					<li className="mb-4">Item J</li>
					<li className="mb-4">Item K</li>
					<li className="mb-4">Item L</li>
					<li className="mb-4">Item M</li>
					<li className="mb-4">Item N</li>
					<li className="mb-4">Item O</li>
					<li className="mb-4">Item P</li>
					<li className="mb-4">Item Q</li>
					<li className="mb-4">Item R</li>
					<li className="mb-4">Item S</li>
					<li className="mb-4">Item T</li>
					<li className="mb-4">Item U</li>
					<li className="mb-4">Item V</li>
					<li className="mb-4">Item W</li>
					<li className="mb-4">Item X</li>
					<li className="mb-4">Item Y</li>
					<li className="mb-4">Item Z</li>
				</ol>
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

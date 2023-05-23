function renderStarter() {
	function renderMessageFrom({message}: {message: string}) {
		return (
			<li className="block p-4 m-2 rounded-md w-fit max-w-[70%] bg-blue-300 text-white">
				{message}
			</li>
		)
	}
	function renderMessageTo({message}: {message: string}) {
		return (
			<li className="block p-4 m-2 rounded-md w-fit max-w-[70%] bg-gray-200 text-black">
				{message}
			</li>
		)
	}
	return (
		<section className="p-4 w-96 mx-auto">
			<ol className="min-h-full m-0 p-0 list-none">
				{renderMessageFrom({message: 'Can you get me a big salad?'})}
				{renderMessageTo({
					message: " What big salad? I'm going to the coffee shop.",
				})}
				{renderMessageFrom({message: 'They have big salads.'})}
				{renderMessageTo({message: " I've never seen a big salad."})}
				{renderMessageFrom({message: 'They have a big salad.'})}
				{renderMessageTo({message: 'Is that what I ask for?'})}
				{renderMessageTo({message: 'The BIG salad?'})}
			</ol>
		</section>
	)
}

function renderDone() {
	function renderMessageFrom({message}: {message: string}) {
		return (
			<li className="block p-4 m-2 rounded-md w-fit max-w-[70%] bg-blue-300 text-white">
				{message}
			</li>
		)
	}
	function renderMessageTo({message}: {message: string}) {
		return (
			<li className="block p-4 m-2 rounded-md w-fit max-w-[70%] bg-gray-200 text-black self-end">
				{message}
			</li>
		)
	}
	return (
		<section className="p-4 w-96 mx-auto border">
			<ol className="min-h-full m-0 p-0 list-none flex flex-col justify-end">
				{renderMessageFrom({message: 'Can you get me a big salad?'})}
				{renderMessageTo({
					message: " What big salad? I'm going to the coffee shop.",
				})}
				{renderMessageFrom({message: 'They have big salads.'})}
				{renderMessageTo({message: " I've never seen a big salad."})}
				{renderMessageFrom({message: 'They have a big salad.'})}
				{renderMessageTo({message: 'Is that what I ask for?'})}
				{renderMessageTo({message: 'The BIG salad?'})}
			</ol>
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

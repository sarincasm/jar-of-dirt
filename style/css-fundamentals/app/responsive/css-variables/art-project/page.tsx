function renderStarter() {
	return (
		<section className="p-8 [--box-size:75px]">
			<div className="flex flex-wrap w-[calc(var(--box-size)*4)] h-[calc(var(--box-size)*4)] m-auto">
				<div className="[--index:1] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:2] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:3] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:4] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:5] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:6] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:7] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:8] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:9] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:10] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:11] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:12] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:13] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:14] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:15] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:16] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
			</div>
		</section>
	)
}

function renderDone() {
	return (
		<section className="p-8 [--box-size:75px]">
			<div className="flex flex-wrap w-[calc(var(--box-size)*4)] h-[calc(var(--box-size)*4)] m-auto">
				<div className="[--index:1] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:2] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:3] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:4] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:5] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:6] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:7] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:8] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:9] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:10] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:11] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:12] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:13] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:14] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:15] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
				<div className="[--index:16] w-[--box-size] h-[--box-size] bg-[hsl(calc(var(--index)*-7deg),100%,50%)]"></div>
			</div>
		</section>
	)
}

export default function Page() {
	return (
		<main className="bg-black">
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

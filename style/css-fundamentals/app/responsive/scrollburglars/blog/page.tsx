/* eslint-disable @next/next/no-img-element */
function renderStarter() {
	return (
		<section>
			<h3 className="text-xl font-semibold py-2 text-center">
				Starter is hidden to be able to see the results of the finished
				solution.
			</h3>
			<section className="flex-col h-full hidden">
				<div className="sticky z-10 top-0 bg-white">
					<header className="flex justify-between items-baseline max-w-3xl mx-auto my-0 p-3">
						<a
							className="text-pink-700 decoration-2 text-xl font-bold no-underline"
							href="/"
						>
							SomeBlog
						</a>
						<nav>
							<ul className="list-none flex text-lg">
								<li className="mr-[5vw]">Posts</li>
								<li>About</li>
							</ul>
						</nav>
					</header>
					<main className="isolate max-w-full pt-16">
						<div className="max-w-2xl mx-auto my-0">
							<aside className="sticky top-0">
								<ul className="w-24 h-0 flex flex-col items-center translate-x-[-150%] translate-y-48">
									<li>
										<a
											href="twitter.com"
											className="block no-underline text-inherit opacity-40 mb-6 hover:opacity-100"
										>
											<img
												className="w-8 h-8"
												alt=""
												src="https://raw.githubusercontent.com/css-for-js/scrollburglars/d72746543e1baa9a10ec90d29e03a9b6ea225370/03-blog-example/assets/twitter.svg"
											/>
											<span className="absolute overflow-hidden h-px w-px -m-px p-0 border-0">
												Share on Twitter
											</span>
										</a>
									</li>
									<li>
										<a
											href="facebook.com"
											className="block no-underline text-inherit opacity-40 mb-6 hover:opacity-100"
										>
											<img
												className="w-8 h-8"
												alt=""
												src="https://raw.githubusercontent.com/css-for-js/scrollburglars/d72746543e1baa9a10ec90d29e03a9b6ea225370/03-blog-example/assets/facebook.svg"
											/>
											<span className="absolute overflow-hidden h-px w-px -m-px p-0 border-0">
												Share on Facebook
											</span>
										</a>
									</li>
								</ul>
							</aside>
							<article className="py-0 px-3">
								<h1 className="text-[clamp(1.75rem,3vw_+_1rem,3rem)] font-bold leading-[1.35] mb-4">
									Working remotely as a software developer
								</h1>

								<img
									className="block max-w-full mb-16"
									src="https://github.com/css-for-js/scrollburglars/blob/main/03-blog-example/assets/remote-work.jpg?raw=true"
									alt="A woman typing on a computer at a café"
								/>

								<p className="text-lg mb-6">
									It&apos;s been about 3 years since I quit my
									traditional in-office job and started working from a
									co-working space for a remote-friendly company. In
									that time I&apos;ve gotten a lot of questions from
									folks about it, and the most common questions tend to
									focus on how to get started as a remote worker.
								</p>

								<p className="text-lg mb-6">
									Let&apos;s talk about how to find a remote gig.
								</p>

								<h2 className="relative text-3xl font-bold mt-12 mb-4">
									<span className="absolute -top-6 w-16 h-16 opacity-100 translate-x-3 skew-x-[-24deg] right-0 bg-[papayawhip]"></span>
									<span className="relative">
										Evaluating friendliness
									</span>
								</h2>

								<p className="text-lg mb-6">
									It&apos;s very easy for companies to add
									&quot;remote&quot; work&quot; as a keyword to a job
									listing, but it&apos;s much harder for companies to
									create policies and culture that treat remote workers
									well.
								</p>

								<p className="text-lg mb-6">
									The first question I always ask when trying to
									evaluate an organization: what % of the company is
									remote?
								</p>
								<p className="text-lg mb-6">
									If the company only has one or two remote workers,
									its almost a guarantee that all elements of the
									culture are biased for in-office workers. These kinds
									of arrangements can still work, but its a much
									steeper hill to climb. By contrast, some
									organizations are fully distributed - they have no
									head office, every employee works from their own
									environment. Entire categories of problems evaporate
									with this kind of arrangement.
								</p>
								<p className="text-lg mb-6">
									A bonus question you can ask: is the company
									remote-friendly all the way up? Are there members of
									the exec team working remotely, or is it only
									individual contributors who work remotely? In my
									experience, its a bit of a yellow flag if remote
									workers arent spread across the org chart, including
									management and senior leadership.
								</p>
							</article>
						</div>
					</main>
					<footer className="text-center mt-24 p-8 bg-[hsl(0deg 0% 90%)]">
						<p>
							This article taken from my {` `}
							<a
								href="https://www.joshwcomeau.com/career/remote-work-pt2/"
								className="text-[deeppink] underline-offset-[0.1em] decoration-2 text-xl font-[bold] no-underline"
							>
								article on remote work
							</a>
							.
						</p>
					</footer>
				</div>
			</section>
		</section>
	)
}

function renderDone() {
	return (
		<section className="flex-col h-full">
			<div className="sticky z-10 top-0 bg-white">
				<header className="flex justify-between items-baseline max-w-3xl mx-auto my-0 p-3">
					<a
						className="text-pink-700 decoration-2 text-xl font-bold no-underline"
						href="/"
					>
						SomeBlog
					</a>
					<nav>
						<ul className="list-none flex text-lg">
							<li className="mr-[5vw]">Posts</li>
							<li>About</li>
						</ul>
					</nav>
				</header>
				<main className="isolate max-w-full pt-16 overflow-hidden sm:overflow-auto">
					<div className="max-w-2xl mx-auto my-0">
						<aside className="sticky top-0">
							<ul className="w-24 h-0 flex flex-col items-center translate-x-[-150%] translate-y-48">
								<li>
									<a
										href="twitter.com"
										className="block no-underline text-inherit opacity-40 mb-6 hover:opacity-100"
									>
										<img
											className="w-8 h-8"
											alt=""
											src="https://raw.githubusercontent.com/css-for-js/scrollburglars/d72746543e1baa9a10ec90d29e03a9b6ea225370/03-blog-example/assets/twitter.svg"
										/>
										<span className="absolute overflow-hidden h-px w-px -m-px p-0 border-0">
											Share on Twitter
										</span>
									</a>
								</li>
								<li>
									<a
										href="facebook.com"
										className="block no-underline text-inherit opacity-40 mb-6 hover:opacity-100"
									>
										<img
											className="w-8 h-8"
											alt=""
											src="https://raw.githubusercontent.com/css-for-js/scrollburglars/d72746543e1baa9a10ec90d29e03a9b6ea225370/03-blog-example/assets/facebook.svg"
										/>
										<span className="absolute overflow-hidden h-px w-px -m-px p-0 border-0">
											Share on Facebook
										</span>
									</a>
								</li>
							</ul>
						</aside>
						<article className="py-0 px-3">
							<h1 className="text-[clamp(1.75rem,3vw_+_1rem,3rem)] font-bold leading-[1.35] mb-4">
								Working remotely as a software developer
							</h1>

							<img
								className="block max-w-full mb-16"
								src="https://github.com/css-for-js/scrollburglars/blob/main/03-blog-example/assets/remote-work.jpg?raw=true"
								alt="A woman typing on a computer at a café"
							/>

							<p className="text-lg mb-6">
								It&apos;s been about 3 years since I quit my traditional
								in-office job and started working from a co-working
								space for a remote-friendly company. In that time
								I&apos;ve gotten a lot of questions from folks about it,
								and the most common questions tend to focus on how to
								get started as a remote worker.
							</p>

							<p className="text-lg mb-6">
								Let&apos;s talk about how to find a remote gig.
							</p>

							<h2 className="relative text-3xl font-bold mt-12 mb-4">
								<span className="absolute -top-6 w-16 h-16 opacity-100 translate-x-3 skew-x-[-24deg] right-0 bg-[papayawhip]"></span>
								<span className="relative">
									Evaluating friendliness
								</span>
							</h2>

							<p className="text-lg mb-6">
								It&apos;s very easy for companies to add
								&quot;remote&quot; work&quot; as a keyword to a job
								listing, but it&apos;s much harder for companies to
								create policies and culture that treat remote workers
								well.
							</p>

							<p className="text-lg mb-6">
								The first question I always ask when trying to evaluate
								an organization: what % of the company is remote?
							</p>
							<p className="text-lg mb-6">
								If the company only has one or two remote workers, its
								almost a guarantee that all elements of the culture are
								biased for in-office workers. These kinds of
								arrangements can still work, but its a much steeper hill
								to climb. By contrast, some organizations are fully
								distributed - they have no head office, every employee
								works from their own environment. Entire categories of
								problems evaporate with this kind of arrangement.
							</p>
							<p className="text-lg mb-6">
								A bonus question you can ask: is the company
								remote-friendly all the way up? Are there members of the
								exec team working remotely, or is it only individual
								contributors who work remotely? In my experience, its a
								bit of a yellow flag if remote workers arent spread
								across the org chart, including management and senior
								leadership.
							</p>
						</article>
					</div>
				</main>
				<footer className="text-center mt-24 p-8 bg-[hsl(0deg 0% 90%)]">
					<p>
						This article taken from my {` `}
						<a
							href="https://www.joshwcomeau.com/career/remote-work-pt2/"
							className="text-[deeppink] underline-offset-[0.1em] decoration-2 text-xl font-[bold] no-underline"
						>
							article on remote work
						</a>
						.
					</p>
				</footer>
			</div>
		</section>
	)
}

export default function Page() {
	return (
		<main className="bg-gray-100">
			<div>
				<h2 className="text-2xl font-bold py-3 text-center">Starter</h2>
				{renderStarter()}
				<h2 className="text-2xl font-bold my-3 text-center">Finished</h2>
				{renderDone()}
			</div>
		</main>
	)
}

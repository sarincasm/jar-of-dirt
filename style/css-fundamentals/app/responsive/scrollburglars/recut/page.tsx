/* eslint-disable @next/next/no-img-element */
function renderStarter() {
	return (
		<section>
			<h3 className="text-xl font-semibold py-2 text-center">
				Starter is hidden to be able to see the results of the finished
				solution.
			</h3>
			<section className="flex-col h-full hidden">
				<header className="mb-10">
					<nav className="p-6 sm:px-12 flex items-center">
						<a
							href="https://getrecut.com/"
							className="inline-flex items-center font-semibold text-bluegray-800 mr-auto"
						>
							<img
								src="https://raw.githubusercontent.com/css-for-js/scrollburglars/main/01-recut/assets/recut-icon.png"
								className="mr-4"
								style={{
									width: '40px',
									filter: 'drop-shadow(0px 3px 8px #8a8ea055)',
								}}
								alt="Recut logo"
							/>
							Recut
						</a>
						<a
							href="https://getrecut.com/reviews/"
							className="hidden sm:inline mr-16 text-bluegray-700 border-b-2 border-transparent hover:border-indigo-400 px-1"
						>
							Reviews
						</a>
						<a
							href="https://getrecut.com/tutorials/"
							className="text-bluegray-700 border-b-2 border-transparent hover:border-indigo-400 px-1"
						>
							Tutorials
						</a>
					</nav>
				</header>

				<main className="flex-1">
					<article className="prose sm:prose-lg max-w-2xl px-4 mx-auto">
						<h1 className="text-3xl sm:text-5xl">
							Reduce Your Video Transcription Bill
						</h1>

						<p>
							Got some audio or video to transcribe? Maybe you already
							use a service like Otter.ai or Descript to automatically
							transcribe your videos.
						</p>
						<p>
							The trouble with transcription services is they usually
							charge you based on the length of the recording – including
							the silent parts!
						</p>
						<p>
							If you were gonna cut out that silence anyway, it seems a
							bit of a waste!
						</p>
						<p>
							You can save on transcription time (and save some money!)
							by removing the silence before you transcribe.
						</p>
						<p>
							Doing this manually is a pain though. It looks something
							like:
						</p>
						<ol>
							<li>
								Open the video in your editor – Final Cut, Premiere,
								Resolve, ScreenFlow, etc.
							</li>
							<li>Select each chunk of silence.</li>
							<li>Ripple delete it.</li>
							<li>Rinse and repeat, maybe hundreds of times.</li>
							<li>Export the video.</li>
						</ol>
						<p>
							That&apos;ll probably take hours though, and your time is
							worth more than that!
						</p>
						<h2>Remove Silence from Videos Automatically</h2>
						<p>
							Instead, you can pass it through this little app called
							<a href="https://getrecut.com/">Recut</a>.
						</p>
						<ol>
							<li>Drag your video or audio into Recut.</li>
							<li>Recut automatically finds the silence.</li>
							<li>
								Export a new video/audio file, with the silence
								automatically removed.
							</li>
						</ol>
						<p>
							Then take that shorter video and upload it for
							transcription 😎
						</p>
						<blockquote>
							<p>
								I have a bunch of random voice notes from iOS voice
								memos and they have a lot of silence in them because
								I&apos;ve just let it run.
							</p>
							<p>
								With Recut I could quickly throw those in and trim the
								audio, and that way the silence isn’t eating into the
								transcription time on Descript.
							</p>
						</blockquote>
						<p>
							Recut is a Mac app that automatically finds and removes
							silence from your videos. Check out this quick demo:
						</p>
						<iframe
							className="mt-8 w-full max-w-xl sm:h-64 md:h-[350px] mx-auto"
							src="./assets/525952080.html"
							allow="autoplay; fullscreen; picture-in-picture"
						></iframe>
						<p>
							In addition to exporting video/audio directly, Recut can
							also export the <strong>cut list</strong>.
						</p>
						<p>
							This is awesome if you normally edit in something like
							ScreenFlow, Final Cut, Premiere, or DaVinci Resolve.
						</p>
						<p>
							Import the premade timeline of cuts, with the silence
							already removed, apply your final edits, and you&apos;re
							all done.
						</p>
						<p>
							<img
								className="max-w-md mx-auto shadow-lg"
								src="https://raw.githubusercontent.com/css-for-js/scrollburglars/main/01-recut/assets/automatically-remove-silence-davinci-resolve.png"
								alt="Automatically remove silence from videos and export the cut list to DaVinci Resolve"
							/>
						</p>
						<p>
							<a href="https://getrecut.com/">
								Download a free trial of Recut here
							</a>
							! Take it for a spin with your own recordings, and see how
							much time (and dollars) you can shave off your
							transcription bill.
						</p>
					</article>
				</main>

				<footer className="bg-bluegray-100 w-full p-5 mt-24">
					<div className="max-w-2xl mx-auto">
						<div className="text-sm text-bluegray-500 text-center">
							© Tiny Wins LLC
						</div>
					</div>
				</footer>
			</section>
		</section>
	)
}

function renderDone() {
	return (
		<section className="flex flex-col h-full">
			<header className="mb-10">
				<nav className="p-6 sm:px-12 flex items-center">
					<a
						href="https://getrecut.com/"
						className="inline-flex items-center font-semibold text-bluegray-800 mr-auto"
					>
						<img
							src="https://raw.githubusercontent.com/css-for-js/scrollburglars/main/01-recut/assets/recut-icon.png"
							className="mr-4"
							style={{
								width: '40px',
								filter: 'drop-shadow(0px 3px 8px #8a8ea055)',
							}}
							alt="Recut logo"
						/>
						Recut
					</a>
					<a
						href="https://getrecut.com/reviews/"
						className="hidden sm:inline mr-16 text-bluegray-700 border-b-2 border-transparent hover:border-indigo-400 px-1"
					>
						Reviews
					</a>
					<a
						href="https://getrecut.com/tutorials/"
						className="text-bluegray-700 border-b-2 border-transparent hover:border-indigo-400 px-1"
					>
						Tutorials
					</a>
				</nav>
			</header>

			<main className="flex-1">
				<article className="prose sm:prose-lg max-w-2xl px-4 mx-auto">
					<h1 className="text-3xl sm:text-5xl">
						Reduce Your Video Transcription Bill
					</h1>

					<p>
						Got some audio or video to transcribe? Maybe you already use a
						service like Otter.ai or Descript to automatically transcribe
						your videos.
					</p>
					<p>
						The trouble with transcription services is they usually charge
						you based on the length of the recording – including the
						silent parts!
					</p>
					<p>
						If you were gonna cut out that silence anyway, it seems a bit
						of a waste!
					</p>
					<p>
						You can save on transcription time (and save some money!) by
						removing the silence before you transcribe.
					</p>
					<p>
						Doing this manually is a pain though. It looks something like:
					</p>
					<ol>
						<li>
							Open the video in your editor – Final Cut, Premiere,
							Resolve, ScreenFlow, etc.
						</li>
						<li>Select each chunk of silence.</li>
						<li>Ripple delete it.</li>
						<li>Rinse and repeat, maybe hundreds of times.</li>
						<li>Export the video.</li>
					</ol>
					<p>
						That&apos;ll probably take hours though, and your time is
						worth more than that!
					</p>
					<h2>Remove Silence from Videos Automatically</h2>
					<p>
						Instead, you can pass it through this little app called
						<a href="https://getrecut.com/">Recut</a>.
					</p>
					<ol>
						<li>Drag your video or audio into Recut.</li>
						<li>Recut automatically finds the silence.</li>
						<li>
							Export a new video/audio file, with the silence
							automatically removed.
						</li>
					</ol>
					<p>
						Then take that shorter video and upload it for transcription
						😎
					</p>
					<blockquote>
						<p>
							I have a bunch of random voice notes from iOS voice memos
							and they have a lot of silence in them because I&apos;ve
							just let it run.
						</p>
						<p>
							With Recut I could quickly throw those in and trim the
							audio, and that way the silence isn’t eating into the
							transcription time on Descript.
						</p>
					</blockquote>
					<p>
						Recut is a Mac app that automatically finds and removes
						silence from your videos. Check out this quick demo:
					</p>
					<iframe
						className="mt-8 w-full max-w-xl sm:h-64 md:h-[350px] mx-auto"
						src="./assets/525952080.html"
						allow="autoplay; fullscreen; picture-in-picture"
					></iframe>
					<p>
						In addition to exporting video/audio directly, Recut can also
						export the <strong>cut list</strong>.
					</p>
					<p>
						This is awesome if you normally edit in something like
						ScreenFlow, Final Cut, Premiere, or DaVinci Resolve.
					</p>
					<p>
						Import the premade timeline of cuts, with the silence already
						removed, apply your final edits, and you&apos;re all done.
					</p>
					<p>
						<img
							className="max-w-[min(28rem,100%)] mx-auto shadow-lg"
							src="https://raw.githubusercontent.com/css-for-js/scrollburglars/main/01-recut/assets/automatically-remove-silence-davinci-resolve.png"
							alt="Automatically remove silence from videos and export the cut list to DaVinci Resolve"
						/>
					</p>
					<p>
						<a href="https://getrecut.com/">
							Download a free trial of Recut here
						</a>
						! Take it for a spin with your own recordings, and see how
						much time (and dollars) you can shave off your transcription
						bill.
					</p>
				</article>
			</main>

			<footer className="bg-bluegray-100 w-full p-5 mt-24">
				<div className="max-w-2xl mx-auto">
					<div className="text-sm text-bluegray-500 text-center">
						© Tiny Wins LLC
					</div>
				</div>
			</footer>
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

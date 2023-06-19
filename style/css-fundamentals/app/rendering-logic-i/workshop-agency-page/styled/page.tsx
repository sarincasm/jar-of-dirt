import {Metadata} from 'next'

export const metadata: Metadata = {
	title: 'Huckleberry',
}

export default function Page() {
	return (
		<>
			<header className="border-b-8 border-gray-600">
				<div className="max-w-3xl pt-24 mx-auto pb-14 px-6">
					<h1 className="mb-12 font-extrabold text-3xl">Huckleberry</h1>

					<p className="font-normal text-xl py-2 max-w-[415px]">
						An avant-garde agency focused on connecting{' '}
						<strong className="text-green-600">passion</strong> with{' '}
						<strong className="text-green-600">logistics</strong>.
					</p>

					<p className="font-normal text-xl py-2 max-w-[415px]">
						A better way to solve the problems of tomorrow.
					</p>
				</div>
			</header>

			<main>
				<section className="bg-gray-500 py-[72px] min-h-full">
					<div className="mx-auto max-w-3xl bg-white border-b-8 border-gray-600">
						<h2 className="font-extrabold text-2xl bg-yellow-400 inline-block px-8 py-4 mt-2 -ml-2 border-b-8 border-yellow-600">
							Wealth comes from operations
						</h2>
						<p className="py-4 font-medium text-xl px-6">
							No modern business can thrive without developing a
							specialization in operations. Huckleberry has helped dozens
							of companies, from Fortune 50 monoliths to fast-growing Bay
							Area startups, achieve their goals and meet their KPIs by
							leveraging our extensive network of logistics experts.
						</p>
						<p className="py-4 font-medium text-xl px-6">
							Huckleberry was established in 2003 to help ambitious
							businesses discover their true potential. If that
							resonates, let&apos;s chat!
						</p>
					</div>
				</section>
			</main>
		</>
	)
}

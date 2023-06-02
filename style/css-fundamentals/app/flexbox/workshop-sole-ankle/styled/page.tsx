import Image from 'next/image'

import SHOES from '../data'
type Shoe = (typeof SHOES)[0]

export function formatPrice(price: Shoe['price']) {
	return `$${price / 100}`
}

export function pluralize(string: string, num: number) {
	return num === 1 ? `1 ${string}` : `${num} ${string}s`
}

function Icon({className = '', color = 'white'}) {
	return (
		<div
			className={`rounded-full bg-transparent border w-3 h-3 inline-block ${className}`}
		></div>
	)
}

function Shoe({slug, imageSrc, name, price, numOfColors}: Shoe) {
	return (
		<a href={`/shoe/${slug}`}>
			<article>
				<div className="relative">
					<Image alt="shoe" width={864} height={600} src={imageSrc} />
					<span className="block h-8"></span>
					<div className="text-base">
						<h3 className="font-medium text-gray-900">{name}</h3>
						<span>{formatPrice(price)}</span>
					</div>
					<div className="text-base">
						<p className="text-gray-700">
							{pluralize('Color', numOfColors)}
						</p>
					</div>
				</div>
			</article>
		</a>
	)
}

export default function Page() {
	return (
		<>
			<header>
				<div className="text-sm text-gray-300 bg-gray-900">
					<span className="text-white">
						Free shipping on domestic orders over $75!
					</span>
					<label htmlFor="" className="relative">
						<div className="absolute overflow-hidden [clip:rect(0,0,0,0)] h-px w-px -m-px p-0 border-0">
							Search
						</div>
						<input
							type="text"
							className="border-none bg-transparent border-b-gray-300 border-b pl-6 text-sm text-gray-100 outline-offset-4 placeholder:text-gray-500"
							placeholder="Search"
						/>
						<Icon className="absolute top-0 left-0 bottom-0 m-auto" />
					</label>
					<a
						href="#"
						className="text-inherit no-underline focus-visible:outline-offset-2 [&:not(:focus-visible):outline-none]"
					>
						Help
					</a>
					<button className="block m-0 p-0 cursor-pointer bg-transparent text-left text-inherit focus:outline-offset-2 [&:not(:focus-visible):outline-none] relative">
						<Icon />
					</button>
				</div>
				<div className="py-0 px-8 border-b border-gray-300">
					<a href="/">
						<h1 className="text-2xl font-bold">Sole&amp;Ankle</h1>
					</a>
					<nav>
						<a
							href="/sale"
							className="text-sm uppercase text-blue-700 font-medium"
						>
							Sale
						</a>
						<a
							href="/new"
							className="text-sm uppercase text-gray-900 font-medium"
						>
							New&nbsp;Releases
						</a>
						<a
							href="/men"
							className="text-sm uppercase text-gray-900 font-medium"
						>
							Men
						</a>
						<a
							href="/women"
							className="text-sm uppercase text-gray-900 font-medium"
						>
							Women
						</a>
						<a
							href="/kids"
							className="text-sm uppercase text-gray-900 font-medium"
						>
							Kids
						</a>
						<a
							href="/collections"
							className="text-sm uppercase text-gray-900 font-medium"
						>
							Collections
						</a>
					</nav>
				</div>
			</header>
			<div className="py-16 px-8">
				<div>
					<div>
						<header>
							<h2 className="text-2xl font-medium">Running</h2>
							<label htmlFor="">
								<span className="text-gray-700 mr-4">Sort</span>
								<div className="relative">
									<select className="opacity-0 absolute inset-0 w-full h-full cursor-pointer">
										<option value="newest">Newest Releases</option>
										<option value="price">Price</option>
									</select>
									<span className="block bg-gray-100 text-base font-medium text-gray-900 py-3 pr-10 pl-4 rounded-lg pointer-events-none">
										Newest Releases
										<Icon className="absolute top-0 bottom-0 right-2 my-auto border-black" />
									</span>
								</div>
							</label>
						</header>
						<span className="block h-8"></span>
						<div>{SHOES.map(Shoe)}</div>
					</div>
					<div>
						<nav className="flex text-sm">
							<div>
								<a
									className="text-gray-700 hover:text-gray-900"
									href="/"
								>
									Home
								</a>
							</div>
							<div className="ml-2 before:content-['/'] before:mr-2 before:text-gray-300">
								<a
									className="text-gray-700 hover:text-gray-900"
									href="/"
								>
									Sale
								</a>
							</div>
							<div className="ml-2 before:content-['/'] before:mr-2 before:text-gray-300">
								<a
									className="text-gray-700 hover:text-gray-900"
									href="/"
								>
									Shoes
								</a>
							</div>
						</nav>
						<span className="block h-10 leading-8"></span>
						<aside>
							<a
								href="/lifestyle"
								className="block font-medium text-medium text-gray-900 leading-8"
							>
								Lifestyle
							</a>
							<a
								href="/jordan"
								className="block font-medium text-medium text-gray-900 leading-8"
							>
								Jordan
							</a>
							<a
								href="/running"
								className="block font-medium text-medium text-pink-500 leading-8"
							>
								Running
							</a>
							<a
								href="/basketball"
								className="block font-medium text-medium text-gray-900 leading-8"
							>
								Basketball
							</a>
							<a
								href="/training"
								className="block font-medium text-medium text-gray-900 leading-8"
							>
								Training
							</a>
							<a
								href="/football"
								className="block font-medium text-medium text-gray-900 leading-8"
							>
								Football
							</a>
							<a
								href="/skate"
								className="block font-medium text-medium text-gray-900 leading-8"
							>
								Skateboarding
							</a>
							<a
								href="/us-football"
								className="block font-medium text-medium text-gray-900 leading-8"
							>
								American Football
							</a>
							<a
								href="/baseball"
								className="block font-medium text-medium text-gray-900 leading-8"
							>
								Baseball
							</a>
							<a
								href="/tennis"
								className="block font-medium text-medium text-gray-900 leading-8"
							>
								Tennis
							</a>
							<a
								href="/golf"
								className="block font-medium text-medium text-gray-900 leading-8"
							>
								Golf
							</a>
							<a
								href="/athletics"
								className="block font-medium text-medium text-gray-900 leading-8"
							>
								Athletics
							</a>
							<a
								href="/walking"
								className="block font-medium text-medium text-gray-900 leading-8"
							>
								Walking
							</a>
						</aside>
					</div>
				</div>
			</div>
		</>
	)
}

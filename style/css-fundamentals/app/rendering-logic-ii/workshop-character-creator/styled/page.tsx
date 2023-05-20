import Character from '../Character'
import {
	bodyOptions,
	headOptions,
	faceOptions,
	accessoryOptions,
	skinColorOptions,
	clothesColorOptions,
} from '../data'

interface ControlPaneProps {
	title: string
	options: {
		id: string | number
		label: string
		children: React.ReactNode
	}[]
}

function ControlPane({title, options}: ControlPaneProps) {
	return (
		<div className="p-6 pt-4 bg-white rounded-lg mb-8">
			<h2 className="text-2xl font-bold m-0 -mb-1">
				{title}

				<span className="ml-4 text-sm font-normal text-gray-800">
					{options.length} options
				</span>
			</h2>

			<div className="relative whitespace-nowrap overflow-x-auto -mx-5 -mb-5 p-5">
				{options.map(({id, children}) => (
					<button
						key={id}
						className="w-12 h-12 text-xl font-bold border-2 border-gray-700 bg-white rounded-sm cursor-pointer mr-1"
					>
						<span className="absolute overflow-hidden clip h-px w-px -m-px p-0 border-0">
							Description for Non-Sighted
						</span>
						{children}
					</button>
				))}
			</div>
		</div>
	)
}

export default function Page() {
	return (
		<div className="bg-green-300">
			<main className="pt-32 pb-16 bg-green-300 w-full">
				<div className="fixed bottom-0 bg-green-100 h-2/5 w-full "></div>

				<div className="relative max-w-5xl px-8 mx-auto">
					<header className="pb-16 w-2/3">
						<h1 className="text-5xl font-semibold mt-0 mb-4 tracking-tighter">
							Create your Character
						</h1>
						<p className="m-0 text-xl">
							Customize your character&apos;s look and style using the
							controls below. What sort of adventure will you embark on?{' '}
						</p>
					</header>

					<div className="w-1/2">
						<ControlPane
							title="Bodies"
							options={bodyOptions}
							// currentOption={body}
							// handleSelectOption={setBody}
						/>
						<ControlPane
							title="Heads"
							options={headOptions}
							// currentOption={head}
							// handleSelectOption={setHead}
						/>
						<ControlPane
							title="Faces"
							options={faceOptions}
							// currentOption={face}
							// handleSelectOption={setFace}
						/>
						<ControlPane
							title="Accessories"
							options={accessoryOptions}
							// currentOption={accessory}
							// handleSelectOption={setAccessory}
						/>
						<ControlPane
							title="Skin Color"
							options={skinColorOptions}
							// currentOption={skinColor}
							// handleSelectOption={setSkinColor}
						/>
						<ControlPane
							title="Clothing Color"
							options={clothesColorOptions}
							// currentOption={clothesColor}
							// handleSelectOption={setClothesColor}
						/>
					</div>
				</div>

				<div className="fixed left-[60%] top-[15%] bottom-[15%] min-h-[500px]">
					<Character
						skinColor={skinColorOptions[0].color}
						clothesColor={clothesColorOptions[0].color}
					/>
				</div>
			</main>

			<footer className="relative p-16 bg-gray-900 text-white text-center">
				All character assets taken from{' '}
				<a
					href="https://www.openpeeps.com/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-inherit"
				>
					Open Peeps
				</a>
				, by Pablo Stanley
			</footer>
		</div>
	)
}

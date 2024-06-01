'use client'

import {useChat} from 'ai/react'
import Image from 'next/image'

import userImage from './user.jpeg'
import assistantImage from './Crim.jpg'

export default function Chat() {
	const {messages, input, handleInputChange, handleSubmit} = useChat()

	return (
		<>
			<ul role="list" className="space-y-6">
				{messages.map((message) => (
					<li key={message.id} className="relative flex gap-x-4">
						<Image
							src={message.role === 'user' ? userImage : assistantImage}
							alt=""
							className="relative mt-3 h-12 w-12 flex-none rounded-full bg-gray-50"
						/>
						<div className="flex-auto rounded-md py-3 px-5 ring-1 ring-inset ring-gray-200">
							<div className="flex justify-between">
								<div className="py-0.5 text-xs leading-5 text-gray-500">
									<span className="font-medium text-gray-900">
										{message.role === 'user' ? 'Sarin: ' : 'Crim: '}
									</span>
								</div>
							</div>
							<p className="text-lg leading-6 text-gray-500">
								{message.content}
							</p>
						</div>
					</li>
				))}
			</ul>

			{/* New comment form */}
			<div className="mt-6 flex gap-x-3">
				<Image
					src={userImage}
					alt=""
					className="relative mt-3 h-12 w-12 flex-none rounded-full bg-gray-50"
				/>
				<form onSubmit={handleSubmit} className="relative flex-auto">
					<div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
						<label htmlFor="comment" className="sr-only">
							Add your comment
						</label>
						<input
							name="comment"
							id="comment"
							className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
							placeholder="Add your comment..."
							value={input}
							onChange={handleInputChange}
						/>
					</div>

					<div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2">
						<button
							type="submit"
							className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						>
							You&apos;re Here!
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

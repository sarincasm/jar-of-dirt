import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
	title: 'Dirty LLM',
	description: 'Dirty LLM',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="py-10 mx-auto lg:max-w-2xl md:max-w-2xl">
					{children}
				</div>
			</body>
		</html>
	)
}

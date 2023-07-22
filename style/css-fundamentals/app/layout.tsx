import './globals.css'

import {Footer} from '@/components/Footer'

export const metadata = {
	title: 'CSS Fundamentals',
	description: 'CSS Fundamentals',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en">
			<body className="flex flex-col min-h-full">
				<div className="isolate z-10">{children}</div>
				<div className="isolate">
					<Footer />
				</div>
			</body>
		</html>
	)
}

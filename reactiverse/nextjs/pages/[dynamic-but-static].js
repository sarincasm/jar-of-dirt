/** @format */

import Link from 'next/link'

export default function Dynamic(props) {
	return (
		<>
			<h1>The {props['dynamic-but-static']} Page is Dirty.</h1>
			<Link href="/">
				<a>Home Page</a>
			</Link>
		</>
	)
}

export async function getStaticPaths() {
	return {
		// these paths will be rendered with this component
		// pages generated at build time
		paths: ['/static-dynamic-1', '/static-dynamic-2'],
		fallback: false,
	}
}

export async function getStaticProps({params}) {
	// params will be of the form { 'dynamic-but-static': 'static-dynamic-1' }

	return {
		props: params,
	}
}

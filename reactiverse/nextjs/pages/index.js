/** @format */

import Head from 'next/head'
import Link from 'next/link'

export default function Home({data}) {
	return (
		<>
			<Head>
				<title>{data.name}</title>
			</Head>
			<h1>This Page is Dirty. {data.name} is Awesome</h1>
			<Link href="/second">
				<a>Second Page</a>
			</Link>
			<br />
			<Link href="/static-dynamic-1">
				<a>Dynamic But Static Page</a>
			</Link>
			<br />
			<Link href="/dynamic-dynamic/1">
				<a>Dynamic Dynamic Page</a>
			</Link>
		</>
	)
}

// called at build time
// props object from return value passed to component
export async function getStaticProps() {
	const response = await fetch('https://pokeapi.co/api/v2/pokemon/haunter')
	const data = await response.json()
	return {
		props: {
			data,
		},
	}
}

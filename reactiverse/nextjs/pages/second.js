/** @format */

import {useRouter} from 'next/router'

export default function Second() {
	const router = useRouter()

	function extraSteps(event) {
		router.push('/')
	}

	return (
		<>
			<h1>The Second Page is Dirty.</h1>
			<button onClick={extraSteps}>Link But With Extra Steps</button>
		</>
	)
}

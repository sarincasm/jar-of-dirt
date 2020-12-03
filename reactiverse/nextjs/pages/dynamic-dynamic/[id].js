/** @format */

import {useRouter} from 'next/router'

// will handle all /dynamic-dynamic/[id] paths
// eg: /dynamic/1 => router.query.id = 1
export default function Dynamic(props) {
	const router = useRouter()

	const {id} = router.query

	function extraSteps(event) {
		router.push('/')
	}

	return (
		<>
			<h1>The {id} Page is Dirty.</h1>
			<button onClick={extraSteps}>Link But With Extra Steps</button>
		</>
	)
}

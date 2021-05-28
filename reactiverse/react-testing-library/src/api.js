/** @format */

// simulate interacting with a server

// simulate network request time
const sleep = (time) =>
	new Promise((resolve) => {
		setTimeout(resolve, time)
	})

// a fire-and-forget function to report errors
// for componentDidCatch
async function reportError() {
	await sleep(1000)
	return {success: true}
}

export {reportError}

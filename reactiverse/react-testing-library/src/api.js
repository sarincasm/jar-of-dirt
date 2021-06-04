/** @format */

// simulate interacting with a server

// simulate network request time
const sleep = (time) =>
	new Promise((resolve) => {
		setTimeout(resolve, time)
	})

const greetings = ['Hello', 'Hi', 'Hey there', `What's up`, 'Howdy', `G'day`]

async function fetchRandomGreeting() {
	await sleep(1000)
	return greetings[Math.floor(Math.random() * greetings.length)]
}

async function loadGreeting(subject) {
	return {data: {greeting: `${await fetchRandomGreeting()} ${subject}`}}
}

// a fire-and-forget function to report errors
// for componentDidCatch
async function reportError() {
	await sleep(1000)
	return {success: true}
}

async function savePost(postData) {
	await sleep(1000)
	return {data: {post: postData}}
}

export {loadGreeting, reportError, savePost}

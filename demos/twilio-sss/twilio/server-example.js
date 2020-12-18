/** @format */

require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client = require('twilio')(accountSid, authToken)

function makeCall({to}) {
	client.calls
		.create({
			url: 'https://pistachio-horse-5853.twil.io/assets/call.xml',
			to,
			from: process.env.FROM,
		})
		.then((call) => console.log(call))
}

module.exports = {makeCall}

/** @format */

exports.handler = function (context, event, callback) {
	const twilioClient = context.getTwilioClient()
	const from = context.FROM
	const to = event.TO
	const url = context.TWIML_URL

	twilioClient.calls
		.create({
			url,
			from,
			to,
		})
		.then((_result) => {
			return callback(null, 'success')
		})
		.catch((error) => {
			console.log(error)
			return callback(error)
		})
}

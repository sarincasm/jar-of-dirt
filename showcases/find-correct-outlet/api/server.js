/** @format */

const express = require('express')
const cors = require('cors')

const {findOutlet} = require('./find-outlet-service')

const app = express()
const port = 4000

app.use(cors())

app.get('/outlet', async (req, res) => {
	const {lat, lng} = req.query
	const outletDetails = findOutlet({
		lat: parseFloat(lat),
		lng: parseFloat(lng),
	})
	res.json(outletDetails)
})

app.listen(port, () => {
	console.log(`Outlet Server Listening on Port ${port}`)
})

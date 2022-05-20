const express = require('express')
const cors = require('cors')

const app = express()
const port = 4000

const employees = [
	{employee_id: '0', current_state: 'ADDED'},
	{employee_id: '1', current_state: 'IN-CHECK'},
	{employee_id: '2', current_state: 'ACTIVE'},
	{employee_id: '3', current_state: 'APPROVED'},
	{employee_id: '4', current_state: 'INACTIVE'},
	{employee_id: '5', current_state: 'INACTIVE'},
	{employee_id: '6', current_state: 'ADDED'},
]

app.use(cors())

app.get('/employees', (_req, res) => {
	res.send(employees)
})

app.post('/employees', (_req, res) => {
	employees.push({
		employee_id: employees.length.toString(),
		current_state: 'ADDED',
	})
	res.send(employees)
})

app.use(express.json())
app.patch('/employees/:employee_id', (req, res) => {
	const {new_state} = req.body
	const {employee_id} = req.params
	const employee = employees.find(
		(employee) => employee.employee_id === employee_id
	)
	employee.current_state = new_state
	res.send(employees)
})

app.listen(port, () => {
	console.log(`Employee Server Listening on Port ${port}`)
})

import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab'

import EmployeeTable from '../components/EmployeeTable'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

const Dashboard: React.FC = () => {
	const [employees, setEmployees] = useState([])
	const [isLoading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		fetch(SERVER_URL + '/employees')
			.then((res) => res.json())
			.then((employees) => {
				setEmployees(employees)
				setLoading(false)
			})
	}, [])

	function handleStateChange(
		employee_id: string,
		new_state: string
	) {
		const data = {new_state}
		fetch(`${SERVER_URL}/employees/${employee_id}`, {
			method: 'PATCH',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setEmployees(data)
				setLoading(false)
			})
	}

	function addNewEmployee() {
		fetch(`${SERVER_URL}/employees`, {
			method: 'POST',
		})
			.then((res) => res.json())
			.then((data) => {
				setEmployees(data)
				setLoading(false)
			})
	}

	if (isLoading) return <p>Loading...</p>
	if (!employees || !employees.length) return <p>No Employee Data</p>

	return (
		<>
			<Head>
				<title>Employee Dashboard</title>
			</Head>
			<Typography align="center" variant="h4" gutterBottom>
				Employee Dashboard
			</Typography>
			<EmployeeTable
				employees={employees}
				onChange={handleStateChange}
			/>
			<Fab
				aria-label="add"
				sx={{
					position: 'fixed',
					bottom: '2%',
					left: '3%',
					backgroundColor: '#0157D9',
				}}
				onClick={addNewEmployee}
			>
				+
			</Fab>
		</>
	)
}

export default Dashboard

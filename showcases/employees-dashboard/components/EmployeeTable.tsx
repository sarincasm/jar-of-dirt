import React from 'react'
import {styled} from '@mui/material/styles'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import {states} from './constants'

interface IToggleButton {
	index: number
}
interface Employee {
	employee_id: string
	current_state: string
}
interface EmployeeTableProps {
	employees: Employee[]
	onChange: (employee_id: string, new_state: string) => void
}
const StyledToggleButton = styled(ToggleButton)<IToggleButton>(
	(props) => {
		const {index, selected} = props
		const backgroundColor = selected ? '#0157D9' : '#fff'

		const left = index * -0.5 + '%'
		let clipPath =
			'polygon(95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%, 0% 0%)'
		if (index === 0)
			clipPath =
				'polygon(95% 0%, 100% 50%, 95% 100%, 0% 100%, 0% 50%, 0% 0%)'
		if (index === states.length - 1)
			clipPath =
				'polygon(100% 0%, 100% 50%, 100% 100%, 0% 100%, 5% 50%, 0% 0%)'

		return {
			width: '20%',
			height: '50px',
			backgroundColor,
			left,
			'&.Mui-selected': {
				backgroundColor: '#0157D9',
			},
			clipPath,
			':not(:last-child):after': {},
		}
	}
)

const EmployeeTable: React.FC<EmployeeTableProps> = ({
	employees,
	onChange,
}) => {
	function renderEmployees() {
		return employees.map((employee) => (
			<TableRow
				key={employee.employee_id}
				sx={{backgroundColor: '#eeeef1'}}
			>
				<TableCell align="center">
					{employee.employee_id}
				</TableCell>
				<TableCell>
					<ToggleButtonGroup
						value={employee.current_state}
						exclusive
						onChange={(_, newState) => {
							onChange(employee.employee_id, newState)
						}}
						aria-label="text alignment"
						sx={{width: '100%'}}
					>
						{states.map((state, index) => (
							<StyledToggleButton
								key={state}
								value={state}
								aria-label="centered"
								index={index}
							>
								{state}
							</StyledToggleButton>
						))}
					</ToggleButtonGroup>
				</TableCell>
			</TableRow>
		))
	}

	return (
		<Table sx={{minWidth: 650}} aria-label="simple table">
			<TableHead>
				<TableRow>
					<TableCell align="center">Employee Id</TableCell>
					<TableCell align="center">Current State</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>{renderEmployees()}</TableBody>
		</Table>
	)
}

export default EmployeeTable

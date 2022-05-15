import React from 'react'
import {
	render,
	act,
	getByText,
	waitFor,
	queryAllByText,
} from '@testing-library/react'

import Dashboard from './Dashboard'

const mockEmployees = [
	{employee_id: '0', current_state: 'ADDED'},
	{employee_id: '1', current_state: 'IN-CHECK'},
	{employee_id: '2', current_state: 'ACTIVE'},
	{employee_id: '3', current_state: 'APPROVED'},
	{employee_id: '4', current_state: 'INACTIVE'},
]

const mockFetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve(mockEmployees),
	})
)
// @ts-ignore
global.fetch = mockFetch

describe('Tests for Dashboard', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})
	test('Dashboard renders Loading state', async () => {
		act(() => {
			render(<Dashboard />)
		})
		getByText(document.body, /loading/i)
		expect(mockFetch).toBeCalledTimes(1)
		const mockFetchArgs = mockFetch.mock.calls[0]
		expect(mockFetchArgs).toMatchSnapshot()
		await waitFor(() => getByText(document.body, /dashboard/i))
	})

	test('Dashboard renders initial list of employees', async () => {
		act(() => {
			render(<Dashboard />)
		})
		await waitFor(() => getByText(document.body, /dashboard/i))
		const rowCount = queryAllByText(
			document.body,
			/approved/i
		).length
		expect(rowCount).toBe(5)
	})

	test('Changing state calls the API', async () => {
		act(() => {
			render(<Dashboard />)
		})
		await waitFor(() => getByText(document.body, /dashboard/i))
		const approvedButton = queryAllByText(
			document.body,
			/approved/i
		)[0]
		act(() => {
			approvedButton.click()
		})
		expect(mockFetch).toBeCalledTimes(2)
		const mockFetchArgs = mockFetch.mock.calls[1]
		expect(mockFetchArgs).toMatchSnapshot()
		await waitFor(
			() =>
				new Promise((resolve) => {
					setTimeout(() => {
						resolve('')
					})
				})
		)
	})

	test('Clicking Add button adds an employee', async () => {
		act(() => {
			render(<Dashboard />)
		})
		await waitFor(() => getByText(document.body, /dashboard/i))
		const addButton = getByText(document.body, '+')
		mockFetch.mockResolvedValueOnce({
			json: () =>
				Promise.resolve([
					...mockEmployees,
					{employee_id: '5', current_state: 'ADDED'},
				]),
		})
		act(() => {
			addButton.click()
		})

		expect(mockFetch).toBeCalledTimes(2)
		const mockFetchArgs = mockFetch.mock.calls[1]
		expect(mockFetchArgs).toMatchSnapshot()
		await waitFor(() => getByText(document.body, '5'))
	})
})

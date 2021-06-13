/** @format */

import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {loadGreeting} from '../api'
import {GreetingLoader} from '../greeting-loader'

jest.mock('../api')

test('loads greetings on click', async () => {
	const testGreeting = 'TEST_GREETING'
	loadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})
	render(<GreetingLoader />)
	const {getByLabelText, getByText} = screen
	const nameInput = getByLabelText('Name')
	const loadButton = getByText('Load Greeting')
	nameInput.value = 'Eels'
	userEvent.click(loadButton)
	expect(loadGreeting).toHaveBeenCalledWith('Eels')
	expect(loadGreeting).toHaveBeenCalledTimes(1)
	await waitFor(() =>
		expect(getByLabelText('greeting')).toHaveTextContent(testGreeting)
	)
})

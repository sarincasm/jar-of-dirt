/** @format */

import React from 'react'
import {render, fireEvent, waitFor} from '@testing-library/react'
import {loadGreeting} from '../api'
import {GreetingLoader} from '../greeting-loader'

jest.mock('../api')

test('loads greetings on click', async () => {
	const testGreeting = 'TEST_GREETING'
	loadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})
	const {getByLabelText, getByText} = render(<GreetingLoader />)
	const nameInput = getByLabelText('Name')
	const loadButton = getByText('Load Greeting')
	nameInput.value = 'Eels'
	fireEvent.click(loadButton)
	expect(loadGreeting).toHaveBeenCalledWith('Eels')
	expect(loadGreeting).toHaveBeenCalledTimes(1)
	await waitFor(() =>
		expect(getByLabelText('greeting')).toHaveTextContent(testGreeting)
	)
})

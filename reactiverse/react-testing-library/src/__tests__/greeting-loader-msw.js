/** @format */

import 'whatwg-fetch'
import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {GreetingLoader} from '../greeting-loader-rest'

const server = setupServer(
	rest.post('/greeting', (req, res, ctx) => {
		return res(ctx.json({data: {greeting: `Hello ${req.body.subject}`}}))
	})
)

beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('loads greetings on click', async () => {
	render(<GreetingLoader />)
	const nameInput = screen.getByLabelText('Name')
	const loadButton = screen.getByText('Load Greeting')
	userEvent.type(nameInput, 'Eels')
	userEvent.click(loadButton)
	await waitFor(() =>
		expect(screen.getByLabelText('greeting')).toHaveTextContent('Hello Eels')
	)
})

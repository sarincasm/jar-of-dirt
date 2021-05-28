/** @format */

import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {reportError} from '../api'
import {ErrorBoundary} from '../error-boundary'

jest.mock('../api')

afterEach(() => {
	jest.clearAllMocks()
	console.error.mockRestore()
})

beforeEach(() => {
	jest.spyOn(console, 'error').mockImplementation(() => {})
})

function Bomb({shouldThrow}) {
	if (shouldThrow) {
		throw new Error('💣')
	} else {
		return null
	}
}

test('calls reportError and renders that there was a problem', async () => {
	reportError.mockResolvedValueOnce({success: true})
	const {rerender, getByText, getByRole, queryByRole, queryByText} = render(
		<ErrorBoundary>
			<Bomb />
		</ErrorBoundary>
	)

	rerender(
		<ErrorBoundary>
			<Bomb shouldThrow={true} />
		</ErrorBoundary>
	)

	const error = expect.any(Error)
	const info = {componentStack: expect.stringContaining('Bomb')}
	expect(reportError).toHaveBeenCalledWith(error, info)
	expect(reportError).toHaveBeenCalledTimes(1)

	expect(console.error).toHaveBeenCalledTimes(2)

	expect(getByRole('alert').textContent).toMatchInlineSnapshot(
		`"There was a problem."`
	)

	console.error.mockClear()
	reportError.mockClear()

	rerender(
		<ErrorBoundary>
			<Bomb />
		</ErrorBoundary>
	)

	fireEvent.click(getByText('Try again?'))

	expect(reportError).not.toHaveBeenCalled()
	expect(console.error).not.toHaveBeenCalled()
	expect(queryByRole('alert')).not.toBeInTheDocument()
	expect(queryByText('Try again?')).not.toBeInTheDocument()
})

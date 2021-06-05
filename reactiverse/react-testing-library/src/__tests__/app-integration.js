/** @format */

import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {submitForm} from '../api'
import App from '../app'

jest.mock('../api')

afterEach(() => {
	jest.clearAllMocks()
})

test('Can fill out a form across multiple pages', async () => {
	submitForm.mockResolvedValueOnce({success: true})
	const testData = {food: 'test food', drink: 'test drink'}
	render(<App />)
	const {getByLabelText, getByText, findByText} = screen

	userEvent.click(getByText(/fill.*form/i))

	userEvent.type(getByLabelText(/food/i), testData.food)
	userEvent.click(getByText(/next/i))

	userEvent.type(getByLabelText(/drink/i), testData.drink)
	userEvent.click(getByText(/review/i))

	expect(getByLabelText(/food/i)).toHaveTextContent(testData.food)
	expect(getByLabelText(/drink/i)).toHaveTextContent(testData.drink)

	userEvent.click(getByText(/confirm/i, {selector: 'button'}))

	expect(submitForm).toHaveBeenCalledWith(testData)
	expect(submitForm).toHaveBeenCalledTimes(1)

	userEvent.click(await findByText(/home/i))

	expect(getByText(/welcome home/i)).toBeInTheDocument()
})

test('Can fill out a form across multiple pages - async', async () => {
	submitForm.mockResolvedValueOnce({success: true})
	const testData = {food: 'test food', drink: 'test drink'}
	render(<App />)
	const {findByLabelText, findByText} = screen

	userEvent.click(await findByText(/fill.*form/i))

	userEvent.type(await findByLabelText(/food/i), testData.food)
	userEvent.click(await findByText(/next/i))

	userEvent.type(await findByLabelText(/drink/i), testData.drink)
	userEvent.click(await findByText(/review/i))

	expect(await findByLabelText(/food/i)).toHaveTextContent(testData.food)
	expect(await findByLabelText(/drink/i)).toHaveTextContent(testData.drink)

	userEvent.click(await findByText(/confirm/i, {selector: 'button'}))

	expect(submitForm).toHaveBeenCalledWith(testData)
	expect(submitForm).toHaveBeenCalledTimes(1)

	userEvent.click(await findByText(/home/i))

	expect(await findByText(/welcome home/i)).toBeInTheDocument()
})

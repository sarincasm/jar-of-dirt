/** @format */

import React from 'react'
import {render, fireEvent} from 'test-utils'

import Calculator from '../calculator'

test('render calculator', () => {
	const {getByText} = render(<Calculator />)
	const button = getByText('AC')

	fireEvent.click(getByText(/3/))
	expect(button).toHaveTextContent('C')

	fireEvent.click(button)
	expect(button).toHaveTextContent('AC')
})

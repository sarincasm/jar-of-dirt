/** @format */

import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {FavoriteNumber} from '../favorite-number'

test('entering an invalid value shows an error message', () => {
	render(<FavoriteNumber />)
	const {getByLabelText, getByRole} = screen
	const input = getByLabelText('Favorite Number')
	userEvent.type(input, '10')
	expect(getByRole('alert')).toHaveTextContent('The number is invalid')
})

/** @format */

import React from 'react'
import user from '@testing-library/user-event'
import {render, screen} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'

test('entering an invalid value shows an error message', () => {
	const {getByLabelText, getByRole, queryByRole} = screen
	const {rerender, debug} = render(<FavoriteNumber />)
	const input = getByLabelText(/favorite number/i)
	user.type(input, '10')
	expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
	// debug()
	rerender(<FavoriteNumber max={10} />)
	// debug()
	expect(queryByRole('alert')).toBeNull()
})

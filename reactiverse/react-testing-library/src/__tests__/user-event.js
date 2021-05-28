/** @format */

import React from 'react'
import user from '@testing-library/user-event'
import {render} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'

test('entering an invalid value shows an error message', () => {
	const {getByLabelText, getByRole} = render(<FavoriteNumber />)
	const input = getByLabelText('Favorite Number')
	user.type(input, '10')
	expect(getByRole('alert')).toHaveTextContent('The number is invalid')
})

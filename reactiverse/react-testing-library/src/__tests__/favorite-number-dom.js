/** @format */

import React from 'react'
import ReactDOM from 'react-dom'
import {getQueriesForElement} from '@testing-library/dom'

import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label "Favorite Number"', () => {
	const div = document.createElement('div')
	ReactDOM.render(<FavoriteNumber />, div)
	// expect(div.querySelector('input').type).toBe('number')
	// expect(div.querySelector('label').textContent).toBe('Favorite Number')

	// or input = queries.getByLabelText()
	const {getByLabelText} = getQueriesForElement(div)
	const input = getByLabelText('Favorite Number')
	expect(input).toHaveAttribute('type', 'number')

	// expect(div.querySelector('label')).toHaveTextContent('Favorite Number')
})

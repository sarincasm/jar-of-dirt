/** @format */

import React from 'react'
// import ReactDOM from 'react-dom'
// import {getQueriesForElement} from '@testing-library/dom'
import {render, screen} from '@testing-library/react'

import {FavoriteNumber} from '../favorite-number'

// implementation of render similar to one in @t-l/r
// function render(ui) {
// 	const container = document.createElement('div')
// 	ReactDOM.render(ui, container)
// 	const queries = getQueriesForElement(container)
// 	return {container, ...queries}
// }

test('renders a number input with a label "Favorite Number"', () => {
	render(<FavoriteNumber />)
	const input = screen.getByLabelText('Favorite Number')
	expect(input).toHaveAttribute('type', 'number')
})

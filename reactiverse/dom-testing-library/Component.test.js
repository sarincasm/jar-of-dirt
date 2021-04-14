/** @format */

import React from 'react'
import ReactDOM from 'react-dom'

import {getQueriesForElement} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import Counter from './Component'

test('Counter', () => {
	// render
	const container = document.createElement('div')
	ReactDOM.render(<Counter />, container)
	document.body.appendChild(container)

	// test
	const {getByText} = getQueriesForElement(container)
	const button = getByText('0')
	userEvent.click(button)
	expect(button).toHaveTextContent('1')
	userEvent.click(button)
	expect(button).toHaveTextContent('2')

	// cleanup
	ReactDOM.unmountComponentAtNode(button)
	document.body.removeChild(container)
})

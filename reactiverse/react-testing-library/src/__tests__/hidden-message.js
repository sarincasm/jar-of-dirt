/** @format */

import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {HiddenMessage} from '../hidden-message'

jest.mock('react-transition-group', () => {
	return {
		CSSTransition: (props) => (props.in ? props.children : null),
	}
})

test('shows hidden message when toggle is clicked', () => {
	const myMessage = 'Dirty Message'
	const {getByText, queryByText} = render(
		<HiddenMessage>{myMessage}</HiddenMessage>
	)
	const toggleButton = getByText('Toggle')
	expect(queryByText(myMessage)).not.toBeInTheDocument()
	fireEvent.click(toggleButton)
	expect(getByText(myMessage)).toBeInTheDocument()
	fireEvent.click(toggleButton)
	// await wait(() => expect(queryByText(myMessage)).not.toBeInTheDocument())
	expect(queryByText(myMessage)).not.toBeInTheDocument()
})

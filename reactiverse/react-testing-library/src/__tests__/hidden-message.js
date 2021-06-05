/** @format */

import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {HiddenMessage} from '../hidden-message'

jest.mock('react-transition-group', () => {
	return {
		CSSTransition: (props) => (props.in ? props.children : null),
	}
})

test('shows hidden message when toggle is clicked', () => {
	const myMessage = 'Dirty Message'
	render(<HiddenMessage>{myMessage}</HiddenMessage>)
	const {getByText, queryByText} = screen
	const toggleButton = getByText('Toggle')
	expect(queryByText(myMessage)).not.toBeInTheDocument()
	userEvent.click(toggleButton)
	expect(getByText(myMessage)).toBeInTheDocument()
	userEvent.click(toggleButton)
	// await waitFor(() => expect(queryByText(myMessage)).not.toBeInTheDocument())
	expect(queryByText(myMessage)).not.toBeInTheDocument()
})

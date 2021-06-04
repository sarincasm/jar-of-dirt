/** @format */

import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {render as rtlRender} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {Counter} from '../redux-counter'
import {reducer} from '../reducer'

function render(
	ui,
	{
		initialState,
		store = createStore(reducer, initialState),
		...renderOptions
	} = {}
) {
	function Wrapper({children}) {
		return <Provider store={store}>{children}</Provider>
	}
	return {
		...rtlRender(ui, {
			wrapper: Wrapper,
			...renderOptions,
		}),
		store,
	}
}

test('can render with redux with defaults', () => {
	const {getByLabelText, getByText} = render(<Counter />)
	userEvent.click(getByText('+'))
	expect(getByLabelText('count')).toHaveTextContent('1')
})

test('can decrement the value', () => {
	const {getByLabelText, getByText} = render(<Counter />, {
		initialState: {count: 3},
	})
	userEvent.click(getByText('-'))
	expect(getByLabelText('count')).toHaveTextContent('2')
})

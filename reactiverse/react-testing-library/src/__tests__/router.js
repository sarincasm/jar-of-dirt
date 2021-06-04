/** @format */

import React from 'react'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import {render as rtlRender} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Main} from '../main'

function render(
	ui,
	{
		route = '/',
		history = createMemoryHistory({initialEntries: [route]}),
		...renderOptions
	} = {}
) {
	function Wrapper({children}) {
		return <Router history={history}>{children}</Router>
	}
	return {
		...rtlRender(ui, {
			wrapper: Wrapper,
			...renderOptions,
		}),
		history,
	}
}

test('main renders about and home and I can navigate to those pages', () => {
	const {getByRole, getByText} = render(<Main />)
	expect(getByRole('heading')).toHaveTextContent('Home')
	userEvent.click(getByText('About'))
	expect(getByRole('heading')).toHaveTextContent('About')
})

test('landing on a bad page shows no match component', () => {
	const {getByRole} = render(<Main />, {
		route: '/something-that-does-not-match',
	})
	expect(getByRole('heading')).toHaveTextContent('404')
})

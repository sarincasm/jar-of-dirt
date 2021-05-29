/** @format */

import React from 'react'
import {render} from '@testing-library/react'
import {Editor} from '../post-editor'

test('renders a form with title, content, tags, and a submit button', () => {
	const {getByLabelText, getByText} = render(<Editor />)
	getByLabelText('Title')
	getByLabelText('Content')
	getByLabelText('Tags')
	getByText('Submit')
})

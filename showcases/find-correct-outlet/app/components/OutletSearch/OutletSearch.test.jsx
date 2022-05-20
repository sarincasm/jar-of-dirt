/** @format */

import React from 'react'
import {render, getByRole} from '@testing-library/react'
import '@testing-library/jest-dom'

import OutletSearch from './OutletSearch'

describe('Tests for OutletSearch', () => {
	test('OutletSearch is rendered', async () => {
		render(<OutletSearch />)
		getByRole(document.body, 'textbox')
		const searchButton = getByRole(document.body, 'button')
		expect(searchButton).toBeDisabled()
	})
})

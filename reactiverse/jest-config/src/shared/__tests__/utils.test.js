/** @format */

import {getFormattedValue} from '../utils'

test('get formatted value', () => {
	expect(getFormattedValue('1234.0')).toBe('1,234.0')
})

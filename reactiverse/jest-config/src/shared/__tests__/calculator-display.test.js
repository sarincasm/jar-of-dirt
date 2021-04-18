/** @format */

import React from 'react'
import {render} from 'test-utils'
import CalculatorDisplay from '../calculator-display'

test('renders', () => {
	const {container} = render(<CalculatorDisplay value="0" />)
	expect(container).toMatchInlineSnapshot(`
		.emotion-0 {
		  position: relative;
		  line-height: 130px;
		  font-size: 6em;
		  -webkit-flex: 1;
		  -ms-flex: 1;
		  flex: 1;
		  color: white;
		  background: #1c191c;
		}

		<div>
		  <div
		    class="emotion-0 emotion-1"
		  >
		    <div
		      class="autoScalingText"
		      data-testid="total"
		      style="transform: scale(1,1);"
		    >
		      0
		    </div>
		  </div>
		</div>
	`)
})

/** @format */

import {getFlying} from './super-heros'

test('return flying heros', () => {
	const flyingHeros = getFlying()
	expect(flyingHeros).toMatchInlineSnapshot(`
		Array [
		  Object {
		    "name": "Hero 1",
		    "powers": Array [
		      "ray",
		      "fly",
		    ],
		  },
		  Object {
		    "name": "Hero 2",
		    "powers": Array [
		      "fire",
		      "fly",
		    ],
		  },
		  Object {
		    "name": "Hero 4",
		    "powers": Array [
		      "speed",
		      "fly",
		    ],
		  },
		]
	`)
})

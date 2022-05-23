/**
 * Modify tsconfig
 * module: es2015
 * target: es6 or higher
 *
 * @format
 */

import {MyIESM, hi} from './esm-export.js'

const using: MyIESM = {
	key: hi,
}
console.log(using)

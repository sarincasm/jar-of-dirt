/** @format */

/**
 * Modify tsconfig
 * Use outfile (concat into a single file)
 * amd module type
 */

/// <reference path="namespace-import.ts">

namespace App {
	const usingMyI: MyI = {
		key: 'hi',
	}
	console.log(usingMyI)
}

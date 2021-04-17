/** @format */

const path = require('path')

module.exports = {
	testEnvironment: 'jest-environment-jsdom',
	moduleDirectories: [
		'node_modules',
		path.join(__dirname, 'src'),
		'shared',
		path.join(__dirname, 'test'),
	],
	moduleNameMapper: {
		// use these while resolving css, module css files
		'\\.module\\.css$': 'identity-obj-proxy',
		'\\.css$': require.resolve('./test/style-mock.js'),
	},
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	// custom snapshot serializer
	snapshotSerializers: ['jest-emotion'],
}

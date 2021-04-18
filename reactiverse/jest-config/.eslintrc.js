/** @format */

const path = require('path')
module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:jest/recommended',
		'eslint-config-prettier',
	],
	parserOptions: {
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
	},
	rules: {'import/named': 'off'},
	settings: {
		'import/resolver': 'node',
		react: {
			version: 'detect',
		},
	},
	overrides: [
		{
			files: ['**/src/**'],
			settings: {'import/resolver': 'webpack'},
		},
		{
			files: ['**/__tests__/**'],
			settings: {
				'import/resolver': {
					jest: {
						jestConfigFile: path.join(__dirname, './jest.config.js'),
					},
				},
			},
		},
	],
}

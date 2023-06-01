import fs from 'fs'

import {parse} from '@babel/parser'
import traverse from '@babel/traverse'
import * as t from '@babel/types'
import generate from '@babel/generator'

const code = fs.readFileSync('input.ts', 'utf8')

const ast = parse(code, {})

traverse(ast, {
	CallExpression(path) {
		const relevantNode = path.node.callee

		if (t.isIdentifier(relevantNode, {name: '$'})) {
			const mainParent = path.parentPath.parentPath
			const [el] = path.node.arguments
			const newNode = t.assignmentExpression(
				'=',
				t.memberExpression(
					el as t.Expression,
					t.identifier('style.display')
				),
				t.stringLiteral('none')
			)
			if (mainParent) mainParent.replaceWith(newNode)
		}
	},
})

const finalResult = generate(ast)
fs.writeFileSync('output.ts', finalResult.code, 'utf8')

/** @format */

/**
 * Built-in Generics
 */

const names: Array<string> = []
const promise: Promise<string> = new Promise((resolve) => {
	setTimeout(() => resolve('Yo'), 200)
})

/**
 * Generic Functions/types, constraints
 */

function merge<T extends object, U extends object>(a: T, b: U) {
	return Object.assign(a, b)
}
merge({name: 'a'}, {yo: 'yo'})
// syntax to specify type for this specific call
// but error in this case
// merge<string, string>({name: 'a'}, {yo: 'yo'})

interface Lengthy {
	length: number
}

function countAndPrint<T extends Lengthy>(element: T) {
	let text = '0'
	if (element.length) text = element.length.toString()
	return text
}
console.log(countAndPrint('99'))
console.log(countAndPrint(['99']))
// console.log(countAndPrint(99)) // error

function extract<T extends object, U extends keyof T>(obj: T, key: U) {
	console.log(obj[key])
}
extract({name: 'Eels'}, 'name')

/**
 * Generic Class
 */

class DStorage<T> {
	private data: T[] = []

	addItem(item: T) {
		this.data.push(item)
	}

	getItems() {
		return [...this.data]
	}
}

const textS = new DStorage<string>()
const numberS = new DStorage<number>()

/**
 * Partial, Readonly
 */
interface Goal {
	title: string
	description: string
}
function createGoal(title: string, description: string): Goal {
	const goal: Partial<Goal> = {}
	goal.title = title
	goal.description = description
	return goal as Goal
}

const namesArr: Readonly<string[]> = ['Eels']
// namesArr.push('Zarte') // error

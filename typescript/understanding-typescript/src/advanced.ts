/** @format */

/**
 * Intersection
 */

type A = string | number
type B = number | boolean
type C = A & B

type D = string
type E = number
type F = D & B

type ObA = {
	name: string
	onlyA: string[]
}
type ObB = {
	name: string
	onlyB: boolean
}
type ObC = ObA & ObB
const c: ObC = {
	name: 'hi',
	onlyA: ['hi'],
	onlyB: false,
}

/**
 * type guards
 */

function addG(a: A, b: A) {
	if (typeof a === 'string' || typeof b === 'string') {
		return a.toString() + b.toString()
	}
	return a + b
}

type ObD = ObA | ObB
function printStuff(e: ObD) {
	// error
	// console.log(e.onlyB)

	if ('onlyB' in e) console.log(e.onlyB)
}

class Car {
	drive() {
		console.log('Driving')
	}
	onlyCar() {
		console.log('only car')
	}
}
class Truck {
	drive() {
		console.log('Driving')
	}
}
type Vehicle = Car | Truck
function driveVehicle(v: Vehicle) {
	// error
	// v.onlyCar()
	if (v instanceof Car) {
		v.onlyCar()
	}
}

/**
 * Discriminated Union
 */

interface Bird {
	type: 'bird'
	fly: number
}
interface Horse {
	type: 'horse'
	run: number
}
type Animal = Bird | Horse

function moveA(a: Animal) {
	let result
	switch (a.type) {
		case 'bird': {
			result = a.fly
			break
		}
		case 'horse': {
			result = a.run
		}
	}
	return result
}

/**
 * Type Casting
 */

// won't be null
const para = document.getElementById('para')!
para.TEXT_NODE

const inputv1 = <HTMLInputElement>(
	document.getElementById('user-input')
)
const input = document.getElementById(
	'user-input'
)! as HTMLInputElement
inputv1.value = 'Hii'
input.value = 'Hi'

/**
 * index types
 */

interface ErrorC {
	id: string
	// nn: number - not allowed
	[key: string]: string
}
const er: ErrorC = {
	id: '1',
	email: 'emailerror',
	u: 'userrror',
}

/**
 * Overloading
 */
function addO(a: number, b: number): number
function addO(a: string, b: number): string
function addO(a: string, b: string): string
function addO(a: number, b: string): string
function addO(a: A, b: A) {
	if (typeof a === 'string' || typeof b === 'string') {
		return a.toString() + b.toString()
	}
	return a + b
}

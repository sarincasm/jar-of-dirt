/** @format */

interface Personable {
	name: string
	age: number
	greet(phrase: string): void
}

const p1: Personable = {
	name: 'N1',
	age: 19,
	greet: (phrase) => phrase,
}

console.log(p1.greet('Hi'))

class Person implements Personable {
	constructor(
		public name: string,
		public age: number,
		public not_included: string
	) {}

	greet(phrase: string): void {
		console.log(phrase + this.name)
	}
}

const p0 = new Person('N2', 20, 'noo')
console.log(p0)

interface AddFn {
	(a: number, b: number): number
}

interface P3 {
	e0: string
}
interface Extended extends Personable, P3 {
	extra: string
}

// readonly
type Areadonly = {
	readonly name: string
}
interface AreadonlyI {
	readonly name: string
}

// optional
interface WithOptional {
	name?: string
}
class DefaultName implements WithOptional {
	constructor(public name: string = 'What') {}

	// or
	// constructor(public name?: string) {}

	greet(phrase: string): void {
		console.log(phrase + this.name)
	}
}

interface NotOptional {
	name: string
}
class DefaultName2 implements NotOptional {
	constructor(public name: string = 'What') {}

	// error
	// constructor(public name?: string) {}

	greet(phrase: string): void {
		console.log(phrase + this.name)
	}
}

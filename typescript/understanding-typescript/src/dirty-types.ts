/** @format */

// explicit
const person: {
	name: string
	age: number
} = {
	name: 'hi',
	age: 1,
}

// inferred
const p2 = {name: 'hi', age: 1}

// optional property
const p3: {
	name: string
	age?: string
} = {name: 'hi'}

// arrays
const p = {array: ['dirty']}
let a: string[]
a = ['a']
p.array.map((value) => {
	value.toUpperCase() // valid because value is string
	// value.map() // error
})

// tuples
const tuple: [number, string] = [1, '1']
// push strictness not enforced

// enums
enum Role {
	ADMIN = 9,
	USER,
}
const pr = {
	role: Role.ADMIN,
}

// any
const useless: any = 9

// union
let union: string | number

// literal
let literal: '1' | 2
literal = 2

// type alias
type OneOrTwo = '1' | 2
let oneOrTwo: OneOrTwo = '1'

// unknown, any
let unk: unknown
let an: any

let known: string

// known = unk // err
if (typeof unk === 'string') known = unk // no error
known = an

/////////

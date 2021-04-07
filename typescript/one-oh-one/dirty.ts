// explicit
const person: {
  name: string;
  age: number
} = {
  name: 'hi',
  age: 1
}

// inferred
const p2 = {name: 'hi', age: 1}

const p = {array: ['dirty']}

let a: string[]
a = ['a']

p.array.map(value=>{
  value.toUpperCase()
  // value.map() // error
})

const tuple: [number, string] = [1, '1']
// push strictness not enforced

enum Role {ADMIN = 9, USER}

const p3 = {
  role: Role.ADMIN
}

const useless: any = 9

let union: string | number

let literal: '1' | 2
literal = 2

type OneOrTwo = '1' | 2

let oneOrTwo: OneOrTwo = '1'
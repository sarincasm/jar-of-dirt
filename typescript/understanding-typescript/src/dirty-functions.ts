/** @format */

// function return type
function addNums(n1: number, n2: number): number {
	return n1 + n2
}

// void & undefined
function print(): void {}
function print(): void {
	return
}
function p9(): undefined {
	return
}

// can assign to any function
let fnP: Function

// lockdown function signature
let fnT: (num1: number, num2: number) => number
fnT = addNums
// fnT = print // error

// with callback
function withCB(arg: string, cb: (s: string) => void) {
	cb(arg)
}

// never
function throwing(): never {
	throw 'Neva'
	// while(true) {}n
}

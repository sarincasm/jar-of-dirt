/** @format */

const button = document.querySelector('button')
const i1 = document.getElementById('num1') as HTMLInputElement
const i2 = document.getElementById('num2') as HTMLInputElement

function add(
	num1: number,
	num2: number,
	print: boolean,
	outputTemplate: string
) {
	const result = num1 + num2
	if (print) console.log(outputTemplate + result)
	return num1 + num2
}

button.addEventListener('click', () => {
	add(+i1.value, +i2.value, true, 'Result: ')
})

// const num1 = 9
// const num2 = 11
// add(num1, num2, true, 'Result: ')

// const button = document.querySelector('button')
// const i1 = document.getElementById('num1') as HTMLInputElement
// const i2 = document.getElementById('num2') as HTMLInputElement

const num1 = 9
const num2 = 11

function add(num1: number, num2: number, print: boolean, outputTemplate: string) {
  const result = num1 + num2
  if(print) console.log(outputTemplate + result)
  return num1 + num2
}

add(num1, num2, true, 'Result: ')

// button.addEventListener('click', () => {
//   add(+i1.value, +i2.value, true, 'Result: ')
// })

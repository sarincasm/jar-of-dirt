const button = document.querySelector('button')
const i1 = document.getElementById('num1') as HTMLInputElement
const i2 = document.getElementById('num2') as HTMLInputElement

function add(num1: number, num2: number) {
  return num1 + num2
}

button.addEventListener('click', () => {
  console.log(add(+i1.value, +i2.value))
})
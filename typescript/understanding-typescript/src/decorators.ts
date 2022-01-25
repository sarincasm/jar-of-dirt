/** @format */

function Logger(target: Function) {
	console.log('Running Logger')
	console.log(target)
}

function LoggerFactory(param: string) {
	return function Logger(target: Function) {
		console.log(param)
		console.log(target)
	}
}

@Logger
class PersonPerson {
	name = 'Eels'

	constructor() {
		console.log('Creating')
	}
}

const pp = new PersonPerson()

@LoggerFactory('Custom Stuff')
class PersonWithFactory {
	name = 'Eels'

	constructor() {
		console.log('Creating')
	}
}

const pp2 = new PersonWithFactory()

function TemplateDecorator(template: string, divId: string) {
	return function (_child: Function) {
		const element = document.getElementById(divId)
		if (element) {
			element.innerHTML = template
		}
	}
}

/**
 * Order of execution
 * Factories - top to bottom
 * Decorators - bottom to top
 * finally - constructor
 */

@LoggerFactory('Logging Decorated')
@TemplateDecorator('<h1>Yo!</h1>', 'decorate-this')
class PersonDecorated {
	name = 'Eels'

	constructor() {
		console.log('Creating')
	}
}
new PersonDecorated()

/**
 * Decorator for property
 * Execute during class definition (not object instantiation)
 * Can also be defined for
 * accessor (target, name, descriptor: PropertyDescriptor),
 * methods (target, name: string|Symbol, descriptor)
 * method params (target, name, position)
 * Called at class definition
 */

function PropDecorator(target: any, propertyName: string) {
	console.log(target, propertyName)
}
class PropDecorated {
	@PropDecorator
	name: string

	constructor(name: string) {
		this.name = name
		console.log('Creating')
	}
}

/**
 * Decorator with return
 * Can do similar to methods, accesor - modify PropertyDescriptor
 */
function DecoratorWithReturn(template: string, divId: string) {
	return function <T extends {new (...args: any[]): {name: string}}>(
		childConstructor: T
	) {
		return class extends childConstructor {
			constructor(..._: any[]) {
				super()
				console.log(this)
				const element = document.getElementById(divId)
				if (element) {
					element.innerHTML = template
					console.log(100, this.name)
					element.querySelector('h1')!.textContent = this.name
				}
			}
		}
	}
}
@DecoratorWithReturn('<h1>Yo!</h1>', 'decorate-this')
class PersonReplaced {
	name = 'Eels'

	constructor() {
		console.log('Creating')
	}
}
const tt = new PersonReplaced()

/**
 * overwrite PropertyDescriptor
 */

function AutoBind(
	_target: any,
	_methodName: string,
	descriptor: PropertyDescriptor
) {
	const originalMethod = descriptor.value
	const newDescriptor: PropertyDescriptor = {
		configurable: true,
		enumerable: false,
		get() {
			const boundFn = originalMethod.bind(this)
			return boundFn
		},
	}
	return newDescriptor
}

class Printer {
	constructor(public message: string) {}

	@AutoBind
	showMessage() {
		console.log(this.message)
	}
}

const printerObj = new Printer('Works')
const fakeButton = document.getElementById('user-input')!
fakeButton.addEventListener('click', printerObj.showMessage)

/**
 * Build simple validators using decorators
 */

interface ValidatorConfig {
	[property: string]: {
		[validatableProp: string]: string[] // ['required', 'positive']
	}
}

const registeredValidators: ValidatorConfig = {}

function Required(target: any, propName: string) {
	registeredValidators[target.constructor.name] = {
		...registeredValidators[target.constructor.name],
		[propName]: ['required'],
	}
}

function PositiveNumber(target: any, propName: string) {
	registeredValidators[target.constructor.name] = {
		...registeredValidators[target.constructor.name],
		[propName]: ['positive'],
	}
}

function validate(obj: any) {
	const objValidatorConfig = registeredValidators[obj.constructor.name]
	if (!objValidatorConfig) {
		return true
	}
	let isValid = true
	for (const prop in objValidatorConfig) {
		for (const validator of objValidatorConfig[prop]) {
			switch (validator) {
				case 'required':
					isValid = isValid && !!obj[prop]
					break
				case 'positive':
					isValid = isValid && obj[prop] > 0
					break
			}
		}
	}
	return isValid
}

class Course {
	@Required
	title: string
	@PositiveNumber
	price: number

	constructor(t: string, p: number) {
		this.title = t
		this.price = p
	}
}

function eventHandler(event: SubmitEvent) {
	event.preventDefault()
	const titleEl = document.getElementById('title') as HTMLInputElement
	const priceEl = document.getElementById('price') as HTMLInputElement

	const title = titleEl.value
	const price = +priceEl.value

	const createdCourse = new Course(title, price)

	if (!validate(createdCourse)) {
		alert('Invalid input, please try again!')
		return
	}
	console.log(createdCourse)
}

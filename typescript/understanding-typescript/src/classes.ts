/** @format */

class Dept {
	name: string

	constructor(name: string) {
		this.name = name
	}

	// additional check for type of this
	describe(this: Dept) {
		console.log(this.name)
	}
}

const d = new Dept('dept name')
d.describe()
const dCopy = {describe: d.describe}

// error - name is missing in type of dCopy
// dCopy.describe()

const dCopy2 = {name: 'name2', describe: d.describe}
dCopy2.describe()

// public, private
class DeptTS {
	public name: string
	private employees: string[]

	constructor(name: string) {
		this.name = name
		this.employees = []
	}

	addEmployee(employee: string) {
		this.employees.push(employee)
	}
}

// shorthand
// readonly
// protected
// getter, static (available in JS)
class DeptTSShortand {
	protected employees: string[]
	static year = '2022'

	constructor(private readonly id: string, public name: string) {
		// not needed with shorthand
		// this.id = id
		// this.name = name
		this.employees = []
	}

	addEmployee(employee: string) {
		this.employees.push(employee)
	}

	printId() {
		console.log(this.id)
	}

	get deptName() {
		return this.name.toUpperCase()
	}

	static createStuff(name: string) {
		return {name}
	}
}

// private constructor
// singleton pattern
class DeptA extends DeptTSShortand {
	private static instance: DeptA
	private constructor(public admins: string[]) {
		super('d-1', 'dept A')
	}

	static getInstance(admins: string[]) {
		if (this.instance) {
			return this.instance
		}

		this.instance = new DeptA(admins)
		return this.instance
	}
}

const da = DeptA.getInstance(['ad-1'])
da.printId()

class DeptB extends DeptTSShortand {
	constructor(private reports: string[]) {
		super('d-2', 'dept B')
	}

	printReports() {
		console.log(this.reports)
	}
}

const db = new DeptB(['R1'])
db.printId()
db.printReports()
console.log(db.deptName)
console.log(DeptTSShortand.year)
console.log(DeptTSShortand.createStuff('StuffName'))

// abstract class, method
abstract class DeptAbs {
	constructor(protected id: string) {}

	abstract describeId(): void
}

class DeptC extends DeptAbs {
	describeId() {
		console.log(this.id)
	}
}

const dc = new DeptC('d-3')
dc.describeId()

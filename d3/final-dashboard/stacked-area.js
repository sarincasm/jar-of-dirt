/** @format */

class StackedAreaChart {
	constructor(parent) {
		this.parent = parent
		this.initialize()
	}

	initialize() {
		const margin = {
			top: 75,
			right: 50,
			bottom: 80,
			left: 100,
		}
		const width = fullWidth - margin.left - margin.right
		this.width = width
		const height = fullHeight - margin.top - margin.bottom
		this.height = height

		const svg = d3
			.select(this.parent)
			.append('svg')
			.attr('width', fullWidth)
			.attr('height', fullHeight)

		const g = svg
			.append('g')
			.attr('transform', `translate(${margin.left}, ${margin.top})`)

		const color = d3.scaleOrdinal(d3.schemePastel1)

		this.xScale = d3.scaleTime().range([0, width])
		this.yScale = d3.scaleLinear().range([height, 0])

		this.bottomAxis = d3.axisBottom().ticks(4)
		this.leftAxis = d3.axisLeft()

		this.bottomAxisG = g
			.append('g')
			.attr('transform', `translate(0, ${height})`)
		this.leftAxisG = g.append('g')

		const area = d3
			.area()
			.x((d) => this.xScale(parseTime(d.data.date)))
			.y0((d) => this.yScale(d[0]))
			.y1((d) => this.yScale(d[1]))

		this.g = g
		this.refresh()
	}

	refresh() {
		const transitionFunction = d3.transition().duration(750)

		const callsByDate = d3.group(calls, (d) => formatTime(d.date)).entries()

		const data = []

		while (true) {
			const {done, value} = callsByDate.next()
			if (done) break
			const [date, calls] = value
		}
	}
}

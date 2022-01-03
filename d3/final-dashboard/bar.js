/** @format */

class BarChart {
	constructor(parent, variable) {
		this.parent = parent
		this.variable = variable
		this.initialize()
	}

	initialize() {
		const margin = {
			top: 30,
			right: 10,
			bottom: 30,
			left: 50,
		}
		const svgWidth = fullWidth * 0.3
		const width = svgWidth - margin.left - margin.right
		this.width = width
		const svgHeight = fullHeight * 0.2
		const height = svgHeight - margin.top - margin.bottom
		this.height = height

		const svg = d3
			.select(this.parent)
			.append('svg')
			.attr('width', svgWidth)
			.attr('height', svgHeight)

		const g = svg
			.append('g')
			.attr('transform', `translate(${margin.left}, ${margin.top})`)

		g.append('path')
			.attr('class', 'line')
			.attr('fill', 'none')
			.attr('stroke-width', '3px')

		this.xScale = d3
			.scaleBand()
			.domain(['electronics', 'furniture', 'appliances', 'materials'])
			.range([0, width])
			.padding(0.5)
		this.yScale = d3.scaleLinear().range([height, 0])

		this.bottomAxis = d3.axisBottom()
		this.leftAxis = d3.axisLeft().ticks(4)

		this.bottomAxisG = g
			.append('g')
			.attr('transform', `translate(0, ${height})`)
		this.leftAxisG = g.append('g')

		const title = startCase(this.variable)

		g.append('text')
			.attr('class', 'title')
			.attr('y', -15)
			.attr('x', -50)
			.attr('font-size', '12px')
			.attr('text-anchor', 'start')
			.text(title)

		this.g = g
		this.refresh()
	}

	refresh() {
		const transitionFunction = d3.transition().duration(750)

		const callsByCategory = d3.group(calls, (d) => d.category).entries()

		const data = []

		while (true) {
			const {done, value} = callsByCategory.next()
			if (done) break
			const [category, calls] = value
			const dataForCategory = calls.reduce((accumulator, current) => {
				accumulator += current[this.variable]
				return accumulator
			}, 0)
			data.push({
				category,
				size: dataForCategory / calls.length,
			})
		}

		const {
			g,
			xScale,
			yScale,
			leftAxis,
			leftAxisG,
			bottomAxis,
			bottomAxisG,
			height,
		} = this

		yScale.domain([0, d3.max(data, (d) => d.size)])

		bottomAxis.scale(xScale)
		bottomAxisG.transition(transitionFunction).call(bottomAxis)
		leftAxis.scale(yScale)
		leftAxisG.transition(transitionFunction).call(leftAxis)

		const rects = g.selectAll('rect').data(data, (d) => d.category)

		rects
			.enter()
			.append('rect')
			.attr('class', 'enter')
			.attr('y', (d) => yScale(d.size))
			.attr('height', (d) => height - yScale(d.size))
			.attr('x', (d) => xScale(d.category))
			.attr('width', xScale.bandwidth)
			.attr('fill', '#ccc')

		rects
			.attr('class', 'update')
			.transition(transitionFunction)
			.attr('y', (d) => yScale(d.size))
			.attr('height', (d) => height - yScale(d.size))
			.attr('x', (d) => xScale(d.category))
			.attr('width', xScale.bandwidth)

		rects
			.exit()
			.attr('class', 'exit')
			.transition(transitionFunction)
			.attr('height', 0)
			.attr('y', height)
			.style('fill-opacity', '0.1')
			.remove()
	}
}

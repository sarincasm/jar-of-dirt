/** @format */

class StackedAreaChart {
	constructor(parent) {
		this.parent = parent
		this.initialize()
	}

	initialize() {
		const margin = {
			top: 75,
			right: 10,
			bottom: 80,
			left: 50,
		}
		const svgWidth = fullWidth * 0.55
		const width = svgWidth - margin.left - margin.right
		this.width = width

		const svgHeight = fullHeight * 0.5
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

		this.colorScale = d3.scaleOrdinal(d3.schemePastel1)

		this.xScale = d3.scaleTime().range([0, width])
		this.yScale = d3.scaleLinear().range([height, 0])

		this.bottomAxis = d3.axisBottom().ticks(4)
		this.leftAxis = d3.axisLeft()

		this.bottomAxisG = g
			.append('g')
			.attr('transform', `translate(0, ${height})`)
		this.leftAxisG = g.append('g')

		const stack = d3.stack().keys(regions)
		const area = d3
			.area()
			.x((d) => this.xScale(parseTime(d.data.date)))
			.y0((d) => this.yScale(d[0]))
			.y1((d) => this.yScale(d[1]))

		this.stack = stack
		this.area = area

		this.g = g
		this.addLegend()
		this.refresh()
	}

	addLegend() {
		const {g, colorScale} = this
		const legend = g.append('g').attr('transform', 'translate(50, -25)')

		const legendData = regions.map((region) => ({
			label: region,
			color: colorScale(region),
		}))

		const legendCol = legend
			.selectAll('.legendCol')
			.data(legendData)
			.enter()
			.append('g')
			.attr('class', 'legendCol')
			.attr('transform', (_d, i) => `translate(${i * 150}, 0)`)

		legendCol
			.append('rect')
			.attr('class', 'legendRect')
			.attr('width', 10)
			.attr('height', 10)
			.attr('fill', (d) => d.color)
			.attr('fill-opacity', 0.5)

		legendCol
			.append('text')
			.attr('class', 'legendText')
			.attr('x', 20)
			.attr('y', 10)
			.attr('text-anchor', 'start')
			.text((d) => d.label)
	}

	refresh() {
		const transitionFunction = d3.transition().duration(750)

		const callsByDate = d3.group(calls, (d) => formatTime(d.date)).entries()

		const data = []

		while (true) {
			const {done, value} = callsByDate.next()
			if (done) break
			const [date, calls] = value
			const dataForDate = calls.reduce(
				(accumulator, current) => {
					accumulator[current.team] += current[selectedVariable]
					return accumulator
				},
				{
					date,
					northeast: 0,
					midwest: 0,
					south: 0,
					west: 0,
				}
			)
			data.push(dataForDate)
		}

		const maxValueOnADate = d3.max(data, (d) => {
			const values = regions.map((region) => d[region])
			return d3.sum(values)
		})

		const {
			g,
			xScale,
			yScale,
			leftAxis,
			leftAxisG,
			bottomAxis,
			bottomAxisG,
			stack,
			area,
			colorScale,
		} = this

		xScale.domain(d3.extent(data, (d) => parseTime(d.date)))
		yScale.domain([0, maxValueOnADate])

		bottomAxis.scale(xScale)
		bottomAxisG.transition(transitionFunction).call(bottomAxis)
		leftAxis.scale(yScale)
		leftAxisG.transition(transitionFunction).call(leftAxis)

		const teams = g.selectAll('.team').data(stack(data))

		teams.select('.area').attr('d', area)

		teams
			.enter()
			.append('g')
			.attr('class', (d) => `team ${d.key}`)
			.append('path')
			.attr('class', 'area')
			.attr('d', area)
			.style('fill', (d) => colorScale(d.key))
			.style('fill-opacity', 0.5)
	}
}

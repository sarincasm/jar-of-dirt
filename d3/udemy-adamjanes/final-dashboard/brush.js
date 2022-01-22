/** @format */

class Brush {
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
		const svgHeight = fullHeight * 0.4
		const height = svgHeight - margin.top - margin.bottom
		this.height = height

		const svg = d3
			.select(this.parent)
			.append('svg')
			.attr('width', svgWidth)
			.attr('height', svgHeight)

		const g = svg
			.append('g')
			.attr('transform', `translate(${margin.left}, 5)`)

		this.xScale = d3.scaleTime().range([0, width])
		this.yScale = d3.scaleLinear().range([height, 0])

		this.bottomAxis = d3.axisBottom().ticks(4)
		this.bottomAxisG = g
			.append('g')
			.attr('transform', `translate(0, ${height})`)

		this.areaPath = g.append('path').attr('fill', '#ccc')

		const brush = d3
			.brushX()
			.handleSize(10)
			.extent([
				[0, 0],
				[width, height],
			])

		g.append('g').call(brush).call(brush.move, [0, width])

		this.refresh()

		brush.on('end', ({selection}) => handleBrush(this, selection))
	}

	refresh() {
		const transitionFunction = d3.transition().duration()
		const callsByDate = d3
			.group(allCalls, (d) => formatTime(d.date))
			.entries()

		const data = []

		while (true) {
			const {done, value} = callsByDate.next()
			if (done) break
			const [date, calls] = value
			const dataForDate = calls.reduce((accumulator, current) => {
				accumulator += current[selectedVariable]
				return accumulator
			}, 0)
			data.push({
				date,
				sum: dataForDate,
			})
		}

		const {xScale, yScale, bottomAxis, bottomAxisG, areaPath, height} = this

		xScale.domain(d3.extent(data, (d) => parseTime(d.date)))
		yScale.domain([0, d3.max(data, (d) => d.sum) * 1.005])

		bottomAxis.scale(xScale)
		bottomAxisG.transition(transitionFunction).call(bottomAxis)

		const area = d3
			.area()
			.x((d) => xScale(parseTime(d.date)))
			.y0(height)
			.y1((d) => yScale(d.sum))

		areaPath.data([data]).attr('d', area)
	}
}

function handleBrush(brush, selection) {
	if (!selection) {
		timeRange.min = timeRange.defaulMin
		timeRange.max = timeRange.defaultMax
		return refresh()
	}

	const newValues = selection.map(brush.xScale.invert)
	timeRange.min = newValues[0]
	timeRange.max = newValues[1]
	refresh()
}

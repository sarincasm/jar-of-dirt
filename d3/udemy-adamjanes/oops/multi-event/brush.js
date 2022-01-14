/** @format */

class Brush {
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
		const dataToDisplay = data[selectedCoin]

		const {xScale, yScale, bottomAxis, bottomAxisG, areaPath, height} = this

		xScale.domain(d3.extent(dataToDisplay, (d) => d.date))
		yScale.domain([0, d3.max(dataToDisplay, (d) => d[selectedValue]) * 1.005])

		bottomAxis.scale(xScale)
		bottomAxisG.transition(transitionFunction).call(bottomAxis)

		const area = d3
			.area()
			.x((d) => xScale(d.date))
			.y0(height)
			.y1((d) => yScale(d[selectedValue]))

		areaPath.data([dataToDisplay]).attr('d', area)
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

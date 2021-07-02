/** @format */

window.document.title = 'D3 - Line Graph'
;(async () => {
	const parseTime = d3.timeParse('%Y')
	const data = (await d3.json('./data/line.json')).map(({year, value}) => ({
		year: parseTime(year),
		value: Number(value),
	}))

	drawStructure(data)
	drawData(data)
})()

const margin = {
	top: 25,
	right: 15,
	bottom: 80,
	left: 100,
}
const fullWidth = window.innerWidth * 0.95
const fullHeight = window.innerHeight * 0.95
const width = fullWidth - margin.left - margin.right
const height = fullHeight - margin.top - margin.bottom

let g
let xScale, yScale

function drawStructure(data) {
	const svg = d3
		.select('#chart')
		.append('svg')
		.attr('width', fullWidth)
		.attr('height', fullHeight)

	g = svg
		.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)

	g.append('text')
		.attr('x', width / 2)
		.attr('y', height + 60)
		.attr('font-size', '20px')
		.attr('text-anchor', 'middle')
		.text('Year')

	yLabelG = g
		.append('text')
		.attr('x', -(height / 2))
		.attr('y', -60)
		.attr('font-size', '20px')
		.attr('text-anchor', 'middle')
		.attr('transform', 'rotate(-90)')
		.text('Value')

	xScale = d3
		.scaleTime()
		.domain(d3.extent(data, (d) => d.year))
		.range([0, width])

	yScale = d3
		.scaleLinear()
		.domain([
			d3.min(data, (d) => d.value) / 1.005,
			d3.max(data, (d) => d.value) * 1.005,
		])
		.range([height, 0])

	bottomAxis = d3.axisBottom(xScale)
	leftAxis = d3
		.axisLeft(yScale)
		.ticks(6)
		.tickFormat((d) => `${parseInt(d / 1000)}k`)

	bottomAxisG = g.append('g').attr('transform', `translate(0, ${height})`)

	leftAxisG = g.append('g')

	bottomAxisG.call(bottomAxis)
	leftAxisG.call(leftAxis)
}

function drawData(data) {
	const line = d3
		.line()
		.x((d) => xScale(d.year))
		.y((d) => yScale(d.value))

	g.append('path')
		.attr('fill', 'none')
		.attr('stroke', 'grey')
		.attr('stroke-width', '3px')
		.attr('d', line(data))

	const focus = g.append('g').style('display', 'none')

	focus
		.append('line')
		.attr('class', 'vertical-hover-line hover-line')
		.attr('y1', 0)
		.attr('y2', height)

	focus
		.append('line')
		.attr('class', 'horizontal-hover-line hover-line')
		.attr('x1', 0)
		.attr('x2', width)

	focus.append('text').attr('x', 15).attr('dy', '.31em')

	focus.append('circle').attr('class', 'hover-circle').attr('r', 7.5)

	g.append('rect')
		.attr('class', 'overlay')
		.attr('width', width)
		.attr('height', height)
		.on('mouseover', () => focus.style('display', null))
		.on('mouseout', () => focus.style('display', 'none'))
		.on('mousemove', mousemove)

	function mousemove(event) {
		const bisectDate = d3.bisector((d) => d.year).left
		const xPos = xScale.invert(d3.pointer(event, this)[0])
		const i = bisectDate(data, xPos, 1)
		const dLeft = data[i - 1]
		const dRight = data[i]
		const dClosest = xPos - dLeft.year > dRight.year - xPos ? dRight : dLeft
		const {year, value} = dClosest
		focus.attr('transform', `translate(${xScale(year)}, ${yScale(value)})`)
		focus.select('text').text(value)
		focus.select('.vertical-hover-line').attr('y2', height - yScale(value))
		focus.select('.horizontal-hover-line').attr('x2', -xScale(year))
	}
}

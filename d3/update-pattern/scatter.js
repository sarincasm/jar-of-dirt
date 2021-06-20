/** @format */

;(async () => {
	const data = await d3.csv('./data/revenues.csv')

	const yLabels = {
		profit: 'Profit($)',
		revenue: 'Revenue($)',
	}
	let profitShown = true
	let valueShown = 'profit'
	let yLabel = yLabels[valueShown]

	drawStructure(data, valueShown, yLabel)
	drawData(data, valueShown, yLabel)

	d3.interval(() => {
		valueShown = profitShown ? 'profit' : 'revenue'
		yLabel = yLabels[valueShown]
		profitShown = !profitShown

		drawData(data, valueShown, yLabel)
	}, 1500)
})()

const margin = {
	top: 25,
	right: 5,
	bottom: 80,
	left: 100,
}
const fullWidth = window.innerWidth * 0.95
const fullHeight = window.innerHeight * 0.95
const width = fullWidth - margin.left - margin.right
const height = fullHeight - margin.top - margin.bottom

let g
let xScale, heightScale
let bottomAxisG, leftAxisG
let bottomAxis, leftAxis
let yLabelG

function drawStructure(data, valueShown, yLabel) {
	const svg = d3
		.select('#chart')
		.append('svg')
		.attr('width', fullWidth)
		.attr('height', fullHeight)

	g = svg
		.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)

	g.append('text')
		.attr('class', 'x axis-label')
		.attr('x', width / 2)
		.attr('y', height + 60)
		.attr('font-size', '20px')
		.attr('text-anchor', 'middle')
		.text('Month')

	yLabelG = g
		.append('text')
		.attr('class', 'y axis-label')
		.attr('x', -(height / 2))
		.attr('y', -60)
		.attr('font-size', '20px')
		.attr('text-anchor', 'middle')
		.attr('transform', 'rotate(-90)')
		.text(yLabel)

	xScale = d3
		.scaleBand()
		.domain(data.map((d) => d.month))
		.range([0, width])
		.paddingInner(0.3)
		.paddingOuter(0.2)

	heightScale = d3
		.scaleLinear()
		.domain([0, d3.max(data, (d) => d[valueShown])])
		.range([height, 0])

	bottomAxis = d3.axisBottom(xScale)
	leftAxis = d3
		.axisLeft(heightScale)
		.ticks(3)
		.tickFormat((d) => d + 'm')

	bottomAxisG = g
		.append('g')
		.attr('class', 'x')
		.attr('transform', `translate(0, ${height})`)

	leftAxisG = g.append('g').attr('class', 'y')
}

function drawData(data, valueShown, yLabel) {
	const FILL_COLOR = '#1771E8'

	const transitionFunction = d3.transition().duration(400)

	xScale.domain(data.map((d) => d.month))
	heightScale.domain([0, d3.max(data, (d) => +d[valueShown])])

	leftAxis = d3
		.axisLeft(heightScale)
		.ticks(3)
		.tickFormat((d) => d + 'm')

	bottomAxisG.call(bottomAxis)
	leftAxisG.transition(transitionFunction).call(leftAxis)

	yLabelG.text(yLabel)

	// data join
	const circles = g.selectAll('circle').data(data, (d) => d.month)

	// elements on screen not in rs (not in new data)
	circles
		.exit()
		.transition(transitionFunction)
		.attr('cy', heightScale(0))
		.remove()

	circles
		.enter()
		.append('circle')
		.attr('cy', heightScale(0))
		.attr('r', 5)
		.attr('fill', FILL_COLOR)
		.merge(circles)
		.transition(transitionFunction)
		.attr('cx', (d) => xScale(d.month) + xScale.bandwidth() / 2)
		.attr('cy', (d) => heightScale(+d[valueShown]))
}

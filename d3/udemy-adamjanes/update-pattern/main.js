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

	bottomAxisG = g.append('g').attr('transform', `translate(0, ${height})`)
	leftAxisG = g.append('g')
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
	const rs = g.selectAll('rect').data(data, (d) => d.month)

	// elements on screen not in rs (not in new data)
	// rs.exit().transition(transitionFunction).attr('y', heightScale(0)).remove()

	/**
   * Repetitive
   * Re-factored using merge below

	// update old elements
	rs.transition(transitionFunction)
		.attr('x', (d) => xScale(d.month))
		.attr('y', (d) => heightScale(+d[valueShown]))
		.attr('width', xScale.bandwidth)
		.attr('height', (d) => height - heightScale(+d[valueShown]))

	// enter new elements
	rs.enter()
		.append('rect')
		.attr('x', (d) => xScale(d.month))
		.attr('y', heightScale(0))
		.attr('width', xScale.bandwidth)
		.attr('height', 0)
		.attr('fill', FILL_COLOR)
		.transition(transitionFunction)
		.attr('y', (d) => heightScale(+d[valueShown]))
		.attr('height', (d) => height - heightScale(+d[valueShown]))

   */

	rs.enter()
		.append('rect')
		.attr('x', (d) => xScale(d.month))
		.attr('y', heightScale(0))
		.attr('width', xScale.bandwidth)
		.attr('height', 0)
		.attr('fill', FILL_COLOR)
		// before merge applied to only enter
		.merge(rs)
		// after merge applied to both enter/update
		.transition(transitionFunction)
		// .attr('x', (d) => xScale(d.month))
		.attr('y', (d) => heightScale(+d[valueShown]))
		// .attr('width', xScale.bandwidth)
		.attr('height', (d) => height - heightScale(+d[valueShown]))
}

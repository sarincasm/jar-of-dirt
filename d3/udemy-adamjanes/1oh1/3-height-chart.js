/** @format */

;(async () => {
	const data = await d3.json('./data/building-heights.json')
	draw(data)
})()

function draw(data) {
	const margin = {
		top: 100,
		right: 10,
		bottom: 10,
		left: 100,
	}
	const fullWidth = window.innerWidth * 0.95
	const fullHeight = window.innerHeight * 0.95

	const width = fullWidth - margin.left - margin.right
	const height = fullHeight - margin.top - margin.bottom

	const FILL_COLOR = '#1771E8'

	const svg = d3
		.select('#chart')
		.append('svg')
		.attr('width', fullWidth)
		.attr('height', fullHeight)

	const g = svg
		.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)

	g.append('text')
		.attr('x', width / 2)
		.attr('y', 0)
		.attr('text-anchor', 'middle')
		.text('BUILDINGS')

	g.append('text')
		.attr('x', -height / 2)
		.attr('y', -50)
		.attr('transform', 'rotate(-90)')
		.attr('text-anchor', 'middle')
		.text('HEIGHT >>')

	const rs = g.selectAll('rect').data(data)

	const max = d3.max(data, (d) => d.height)

	const heightScale = d3.scaleLinear().domain([0, max]).range([height, 0])
	const xScale = d3
		.scaleBand()
		.domain(data.map((_, index) => index))
		.range([0, width])
		.paddingInner(0.5)
		.paddingOuter(0.6)

	const bottomAxis = d3.axisBottom(xScale)
	const leftAxis = d3.axisLeft(heightScale).ticks(3)
	g.append('g').attr('transform', `translate(0, ${height})`).call(bottomAxis)
	g.append('g').call(leftAxis)

	rs.enter()
		.append('rect')
		.attr('x', (_d, i) => {
			return xScale(i)
		})
		.attr('y', (d) => {
			return heightScale(+d.height)
		})
		.attr('width', xScale.bandwidth)
		.attr('height', (d) => {
			return height - heightScale(d.height)
		})
		.attr('fill', FILL_COLOR)
}

/** @format */

;(async () => {
	const parseDate = d3.timeParse('%Y')

	const dataRaw = await d3.csv('./data/stack-area-2.csv')
	const data = dataRaw.map((row) => ({
		...row,
		date: parseDate(row.date),
	}))
	data.columns = dataRaw.columns

	draw(data)
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

function draw(data) {
	const svg = d3
		.select('#chart')
		.append('svg')
		.attr('width', fullWidth)
		.attr('height', fullHeight)
	const g = svg
		.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)

	const maxY = d3.max(data, (d) => {
		const values = Object.keys(d)
			.filter((key) => key !== 'date')
			.map((key) => d[key])
		return d3.sum(values)
	})

	const xScale = d3
		.scaleTime()
		.domain(d3.extent(data, (d) => d.date))
		.rangeRound([0, width])
	const yScale = d3.scaleLinear().domain([0, maxY]).range([height, 0])

	const colorMapDomain = Object.keys(data[0]).filter((key) => key !== 'date')
	const colorMap = d3.scaleOrdinal(d3.schemeCategory10).domain(colorMapDomain)

	function formatBillion(x) {
		const formatNumber = d3.format('.1f')
		return formatNumber(x / 1e9)
	}

	const bottomAxis = d3.axisBottom(xScale)
	const leftAxis = d3.axisLeft(yScale).tickFormat(formatBillion)
	g.append('g').call(leftAxis)
	g.append('g')
		.attr('transform', 'translate(0,' + height + ')')
		.call(bottomAxis)

	g.append('text')
		.attr('x', -height / 2)
		.attr('y', -60)
		.text('Billions of liters'.toUpperCase())
		.attr('text-anchor', 'middle')
		.attr('transform', 'rotate(-90)')

	const countries = data.columns.filter((country) => country !== 'date')

	const stack = d3.stack().keys(countries)

	const area = d3
		.area()
		.x((d) => xScale(d.data.date))
		.y0((d) => yScale(d[0]))
		.y1((d) => yScale(d[1]))

	const layer = g
		.selectAll('.layer')
		.data(stack(data))
		.enter()
		.append('g')
		.attr('class', 'layer')
		.attr('fill-opacity', 0.5)

	layer
		.append('path')
		.style('fill', (d) => colorMap(d.key))
		.attr('d', area)

	layer
		.filter((d) => d[d.length - 1][1] - d[d.length - 1][0] > 1e8)
		.append('text')
		.datum((d) => d)
		.attr(
			'transform',
			(d) =>
				`translate(${width - 10}, ${
					(yScale(d[d.length - 1][0]) + yScale(d[d.length - 1][1])) / 2
				})`
		)
		.attr('dy', '.15em')
		.attr('font-size', '.85em')
		.style('text-anchor', 'end')
		.text((d) => d.key)
		.attr('fill-opacity', 1)
}

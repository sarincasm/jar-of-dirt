/** @format */

;(async () => {
	const parseTime = d3.timeParse('%Y %b %d')
	// https://filedn.eu/lkPoWhfsVfnBsjKrkWb0mHm/eels/dirt-data/stack-area-1.tsv
	const dataRaw = await d3.tsv('./large-data/stack-area-1.tsv')
	const browsers = dataRaw.columns.slice(1)
	const data = dataRaw.map((row) => {
		const newRow = {
			date: parseTime(row.date),
			columns: row.columns,
		}
		browsers.forEach((browser) => {
			newRow[browser] = Number(row[browser])
		})
		return newRow
	})
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
	const browsers = data.columns.slice(1)
	const svg = d3
		.select('#chart')
		.append('svg')
		.attr('width', fullWidth)
		.attr('height', fullHeight)
	const g = svg
		.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)

	const xScale = d3
		.scaleTime()
		.domain(d3.extent(data, (d) => d.date))
		.rangeRound([0, width])
	const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0])
	const zScale = d3.scaleOrdinal(d3.schemeCategory10).domain(browsers)

	const bottomAxis = d3.axisBottom(xScale)
	const leftAxis = d3.axisLeft(yScale).tickFormat((y) => `${y}%`)
	g.append('g').call(leftAxis)
	g.append('g')
		.attr('transform', 'translate(0,' + height + ')')
		.call(bottomAxis)

	const stack = d3.stack().keys(browsers)
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

	layer
		.append('path')
		.style('fill', (d) => zScale(d.key))
		.attr('d', area)

	layer
		.filter((d) => d[d.length - 1][1] - d[d.length - 1][0] > 0.1)
		.append('text')
		.attr('x', width - 15)
		.attr('y', (d) => yScale((d[d.length - 1][0] + d[d.length - 1][1]) / 2))
		.attr('dy', '.35em')
		.style('font-size', '16px')
		.style('text-anchor', 'end')
		.text((d) => d.key)
}

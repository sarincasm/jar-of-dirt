/** @format */

;(async () => {
	const parseTime = d3.timeParse('%d-%b-%y')
	// https://filedn.eu/lkPoWhfsVfnBsjKrkWb0mHm/eels/dirt-data/area.tsv
	const data = (await d3.tsv('./large-data/area.tsv')).map(
		({date, close}) => ({
			date: parseTime(date),
			close: Number(close),
		})
	)

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

	const xScale = d3
		.scaleTime()
		.domain(d3.extent(data, (d) => d.date))
		.rangeRound([0, width])
	const yScale = d3
		.scaleLinear()
		.domain([0, d3.max(data, (d) => d.close)])
		.rangeRound([height, 0])

	const bottomAxis = d3.axisBottom(xScale)
	const leftAxis = d3.axisLeft(yScale)
	g.append('g')
		.call(leftAxis)
		.append('text')
		.attr('fill', '#000')
		.attr('transform', 'rotate(-90)')
		.attr('y', 6)
		.attr('dy', '0.71em')
		.attr('text-anchor', 'end')
		.text('Price ($)')
	g.append('g')
		.attr('transform', 'translate(0,' + height + ')')
		.call(bottomAxis)

	const area = d3
		.area()
		.x((d) => xScale(d.date))
		.y0(yScale(0))
		.y1((d) => yScale(d.close))
	g.append('path').attr('fill', 'steelblue').attr('d', area(data))
}

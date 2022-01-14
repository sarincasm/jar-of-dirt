/** @format */

window.document.title = 'D3 - Chloropeth'

const fullWidth = window.innerWidth * 0.95
const fullHeight = window.innerHeight * 0.9

;(async () => {
	// https://filedn.eu/lkPoWhfsVfnBsjKrkWb0mHm/eels/dirt-data/
	const dataPromises = [
		d3.json('./large-data/us-map.json'),
		d3.tsv('./large-data/chloropeth-map.tsv'),
	]
	const [map, data] = await Promise.all(dataPromises)

	const unemployment = new Map()
	data.forEach(({id, rate}) => unemployment.set(id, Number(rate)))

	draw(map, unemployment)
})()

function draw(map, unemployment) {
	const svg = d3
		.select('#chart')
		.append('svg')
		.attr('viewBox', [0, 0, fullWidth, fullHeight])

	const g = svg.append('g').attr('transform', 'translate(0,40)')

	const path = d3.geoPath()

	const xScale = d3.scaleLinear().domain([1, 10]).rangeRound([600, 850])

	const colorScale = d3
		.scaleThreshold()
		.domain(d3.range(2, 10))
		.range(d3.schemeBlues[9])

	g.selectAll('rect')
		.data(
			colorScale.range().map((d) => {
				d = colorScale.invertExtent(d)
				if (d[0] == null) d[0] = xScale.domain()[0]
				if (d[1] == null) d[1] = xScale.domain()[1]
				return d
			})
		)
		.enter()
		.append('rect')
		.attr('height', 8)
		.attr('x', (d) => xScale(d[0]))
		.attr('width', (d) => xScale(d[1]) - xScale(d[0]))
		.attr('fill', (d) => colorScale(d[0]))

	g.append('text')
		.attr('x', xScale.range()[0])
		.attr('y', -6)
		.attr('fill', '#000')
		.attr('text-anchor', 'start')
		.attr('font-weight', 'bold')
		.attr('font-size', '.7em')
		.text('Unemployment rate')

	g.call(
		d3
			.axisBottom(xScale)
			.tickSize(13)
			.tickFormat((x) => x + '%')
			.tickValues(colorScale.domain())
	)
		.select('.domain')
		.remove()

	svg.append('g')
		.selectAll('path')
		.data(topojson.feature(map, map.objects.counties).features)
		.enter()
		.append('path')
		.attr('fill', (d) => colorScale(unemployment.get(d.id)))
		.attr('d', path)
		.append('title')
		.text((d) => unemployment.get(d.id) + '%')

	svg.append('path')
		.datum(topojson.mesh(map, map.objects.states, (a, b) => a.id !== b.id))
		.attr('style', 'fill:none;stroke:#000;stroke-width:1.5px;')
		.attr('d', path)
}

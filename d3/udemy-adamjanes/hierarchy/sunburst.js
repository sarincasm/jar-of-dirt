/** @format */

window.document.title = 'D3 Sunburst'

const fullWidth = window.innerWidth * 0.95
const fullHeight = window.innerHeight * 0.95
const radius = Math.min(fullWidth, fullHeight) / 2 - 10

;(async () => {
	// https://filedn.eu/lkPoWhfsVfnBsjKrkWb0mHm/eels/dirt-data
	const flareData = await d3.json('./large-data/tree-map.json')
	draw(flareData)
})()

function draw(data) {
	const g = d3
		.select('#chart')
		.append('svg')
		.attr('width', fullWidth)
		.attr('height', fullHeight)
		.append('g')
		.attr(
			'transform',
			'translate(' + fullWidth / 2 + ',' + fullHeight / 2 + ')'
		)

	const formatNumber = d3.format(',d')

	const xScale = d3.scaleLinear().range([0, 2 * Math.PI])
	const yScale = d3.scaleSqrt().range([0, radius])

	const color = d3.scaleOrdinal(d3.schemeCategory10)

	const partition = d3.partition()

	const arc = d3
		.arc()
		.startAngle((d) => Math.max(0, Math.min(2 * Math.PI, xScale(d.x0))))
		.endAngle((d) => Math.max(0, Math.min(2 * Math.PI, xScale(d.x1))))
		.innerRadius((d) => Math.max(0, yScale(d.y0)))
		.outerRadius((d) => Math.max(0, yScale(d.y1)))

	const root = d3.hierarchy(data).sum((d) => d.size)

	g.selectAll('path')
		.data(partition(root).descendants())
		.enter()
		.append('path')
		.attr('d', arc)
		.style('fill', (d) => color(d.data.name))
		.on('click', click)
		.append('title')
		.text((d) => d.data.name + '\n' + formatNumber(d.value))

	function click(_event, d) {
		g.transition()
			.duration(750)
			.tween('scales', () => {
				const xd = d3.interpolate(xScale.domain(), [d.x0, d.x1]),
					yd = d3.interpolate(yScale.domain(), [d.y0, 1]),
					yr = d3.interpolate(yScale.range(), [d.y0 ? 20 : 0, radius])
				return (t) => {
					xScale.domain(xd(t))
					yScale.domain(yd(t)).range(yr(t))
				}
			})
			.selectAll('path')
			.attrTween('d', (d) => () => arc(d))
	}
}

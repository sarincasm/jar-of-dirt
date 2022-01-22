/** @format */

window.document.title = 'D3 Tree Map'

const fullWidth = window.innerWidth * 0.95
const fullHeight = window.innerHeight * 5

let selectedSumBy = 'size'
let format

let treemap
let root
let cell
;(async () => {
	// https://filedn.eu/lkPoWhfsVfnBsjKrkWb0mHm/eels/dirt-data
	const flareData = await d3.json('./large-data/tree-map.json')
	setupRadioButton()
	draw(flareData)
})()

function setupRadioButton() {
	const selectBox = d3.select('#chart').append('select')

	const options = ['size', 'count']
	options.forEach((value) => {
		selectBox.append('option').text(value).attr('value', value)
	})

	selectBox.on('change', (e) => {
		const target = e.target
		selectedSumBy = target.options[target.selectedIndex].text
		reDraw()
	})
}

function reDraw() {
	treemap(root.sum((d) => d[selectedSumBy]))
	cell
		.transition()
		.duration(750)
		.attr('transform', (d) => 'translate(' + d.x0 + ',' + d.y0 + ')')
		.select('rect')
		.attr('width', (d) => d.x1 - d.x0)
		.attr('height', (d) => d.y1 - d.y0)

	cell.selectAll('title').remove()

	cell.append('title').text((d) => d.data.id + '\n' + format(d.value))
}

function draw(data) {
	const svg = d3
		.select('#chart')
		.append('svg')
		.attr('width', fullWidth)
		.attr('height', fullHeight)

	const fadeColor = (color) => d3.interpolateRgb(color, '#fff')(0.2)
	const colorScale = d3.scaleOrdinal(d3.schemeCategory10.map(fadeColor))

	format = d3.format(',d')

	treemap = d3
		.treemap()
		.tile(d3.treemapResquarify)
		.size([fullWidth, fullHeight])
		.round(true)
		.paddingInner(1)

	root = d3
		.hierarchy(data)
		.eachBefore((d) => {
			d.data.id = (d.parent ? d.parent.data.id + '.' : '') + d.data.name
			d.data.count = d.children ? 0 : 1
		})
		.sum((d) => d[selectedSumBy])
		.sort((a, b) => b.height - a.height || b.value - a.value)
	treemap(root)

	cell = svg
		.selectAll('g')
		.data(root.leaves())
		.enter()
		.append('g')
		.attr('transform', (d) => 'translate(' + d.x0 + ',' + d.y0 + ')')

	cell
		.append('rect')
		.attr('id', (d) => d.data.id)
		.attr('width', (d) => d.x1 - d.x0)
		.attr('height', (d) => d.y1 - d.y0)
		.attr('fill', (d) => colorScale(d.parent.data.id))

	cell
		.append('clipPath')
		.attr('id', (d) => 'clip-' + d.data.id)
		.append('use')
		.attr('href', (d) => '#' + d.data.id)

	cell
		.append('text')
		.attr('clip-path', (d) => 'url(#clip-' + d.data.id + ')')
		.selectAll('tspan')
		.data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g))
		.enter()
		.append('tspan')
		.attr('x', 4)
		.attr('y', (_d, i) => 25 + 2 * i * 10)
		.text((d) => d)

	cell.append('title').text((d) => d.data.id + '\n' + format(d.value))
}

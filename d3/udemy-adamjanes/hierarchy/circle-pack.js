/** @format */

window.document.title = 'D3 Circle Packing'

const fullWidth = window.innerWidth * 0.95
const fullHeight = window.innerHeight * 0.95

;(async () => {
	const flareData = await d3.csv('./data/flare-tree.csv')
	draw(flareData)
})()

function draw(data) {
	const svg = d3
		.select('#chart')
		.append('svg')
		.attr('width', fullWidth)
		.attr('height', fullHeight)
	const g = svg.append('g')

	const format = d3.format(',d')

	const colorMap = d3.scaleSequential(d3.interpolateMagma).domain([-4, 4])

	const stratify = d3
		.stratify()
		.parentId((d) => d.id.substring(0, d.id.lastIndexOf('.')))

	const pack = d3
		.pack()
		.size([fullWidth - 2, fullHeight - 2])
		.padding(3)

	const root = stratify(data)
		.sum((d) => d.value)
		.sort((a, b) => b.value - a.value)

	pack(root)

	const node = g
		.selectAll('g')
		.data(root.descendants())
		.enter()
		.append('g')
		.attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')
		.attr(
			'class',
			(d) =>
				'node' +
				(!d.children ? ' node--leaf' : d.depth ? '' : ' node--root')
		)
		.each(function (d) {
			d.node = this
		})
		.on('mouseover', hoverHandler(true))
		.on('mouseout', hoverHandler(false))

	node
		.append('circle')
		.attr('id', (d) => 'node-' + d.id)
		.attr('r', (d) => d.r)
		.style('fill', (d) => colorMap(d.depth))

	const leaf = node.filter((d) => !d.children)

	leaf
		.append('clipPath')
		.attr('id', (d) => 'clip-' + d.id)
		.append('use')
		.attr('href', (d) => '#node-' + d.id + '')

	leaf
		.append('text')
		.attr('clip-path', (d) => 'url(#clip-' + d.id + ')')
		.selectAll('tspan')
		.data((d) =>
			d.id.substring(d.id.lastIndexOf('.') + 1).split(/(?=[A-Z][^A-Z])/g)
		)
		.enter()
		.append('tspan')
		.attr('x', 0)
		.attr('y', (_d, i, nodes) => 13 + (i - nodes.length / 2 - 0.5) * 10)
		.text((d) => d)

	node.append('title').text((d) => d.id + '\n' + format(d.value))
}

function hoverHandler(hover) {
	return function (_event, datum) {
		d3.selectAll(datum.ancestors().map((d) => d.node)).classed(
			'node--hover',
			hover
		)
	}
}

/** @format */

window.document.title = 'D3 Tree'

const fullWidth = window.innerWidth * 0.95
const fullHeight = window.innerHeight

;(async () => {
	const flareData = await d3.csv('./data/flare-tree.csv')
	draw(flareData)
})()

function draw(data) {
	const svg = d3
		.select('#chart')
		.append('svg')
		.attr('width', fullWidth)
		.attr('height', fullHeight * 6.2)
	const g = svg.append('g').attr('transform', 'translate(50,5)')

	const tree = d3.tree().size([fullHeight * 6, fullWidth * 0.82])
	const stratify = d3
		.stratify()
		.parentId((d) => d.id.substring(0, d.id.lastIndexOf('.')))

	const root = stratify(data)
	const treeMapData = tree(root)

	g.selectAll('.link')
		.data(treeMapData.links())
		.enter()
		.append('path')
		.attr('class', 'link')
		.attr(
			'd',
			d3
				.linkHorizontal()
				.x(function (d) {
					return d.y
				})
				.y(function (d) {
					return d.x
				})
		)

	const node = g
		.selectAll('.node')
		.data(root.descendants())
		.enter()
		.append('g')
		.attr('class', function (d) {
			return 'node' + (d.children ? ' node--internal' : ' node--leaf')
		})
		.attr('transform', function (d) {
			return 'translate(' + d.y + ',' + d.x + ')'
		})
	node.append('circle').attr('r', 2.5)
	node
		.append('text')
		.attr('dy', 5)
		.attr('x', function (d) {
			return d.children ? -8 : 8
		})
		.style('text-anchor', function (d) {
			return d.children ? 'end' : 'start'
		})
		.text(function (d) {
			return d.id.substring(d.id.lastIndexOf('.') + 1)
		})
}

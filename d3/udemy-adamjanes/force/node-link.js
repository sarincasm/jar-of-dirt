/** @format */

window.document.title = 'D3 Force - Node Link'

const fullWidth = window.innerWidth * 0.95
const fullHeight = window.innerHeight * 0.9

;(async () => {
	// https://filedn.eu/lkPoWhfsVfnBsjKrkWb0mHm/eels/dirt-data
	const {nodes, links} = await d3.json('./large-data/miserables.json')
	links.forEach(({source}) => {
		const nodeS = nodes.find((node) => node.id === source)
		if (!nodeS.linkCount) nodeS.linkCount = 0
		nodeS.linkCount++
		const nodeT = nodes.find((node) => node.id === source)
		if (!nodeT.linkCount) nodeT.linkCount = 0
		nodeT.linkCount++
	})
	draw({nodes, links})
})()

function draw({nodes, links}) {
	const svg = d3
		.select('#chart')
		.append('svg')
		.attr('viewBox', [0, 0, fullWidth, fullHeight])

	const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

	const simulation = d3
		.forceSimulation()
		.force('center', d3.forceCenter(fullWidth / 2, fullHeight / 2))
		.force('charge', d3.forceManyBody().strength(-45))
		.force('collide', d3.forceCollide(15).strength(1))
		.force(
			'link',
			d3.forceLink().id((d) => d.id)
		)

	const link = svg
		.append('g')
		.selectAll('line')
		.data(links)
		.enter()
		.append('line')
		.attr('style', 'stroke: #999;stroke-opacity: 0.6;')
		.attr('stroke-width', (d) => Math.sqrt(d.value))

	const node = svg
		.append('g')
		.selectAll('circle')
		.data(nodes)
		.enter()
		.append('circle')
		.attr('r', (d) => d.linkCount)
		.attr('fill', (d) => colorScale(d.group))
		.attr('style', 'stroke: #fff;stroke-width: 1.5px;stroke-opacity: 0.5;')
		.call(
			d3
				.drag()
				.on('start', dragstarted)
				.on('drag', dragged)
				.on('end', dragended)
		)
	node.append('title').text((d) => d.id)

	simulation.nodes(nodes).on('tick', ticked)
	simulation.force('link').links(links)

	function ticked() {
		link
			.attr('x1', (d) => d.source.x)
			.attr('y1', (d) => d.source.y)
			.attr('x2', (d) => d.target.x)
			.attr('y2', (d) => d.target.y)

		node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)
	}

	function dragstarted(event) {
		if (!event.active) simulation.alphaTarget(1).restart()
		event.subject.fx = event.x
		event.subject.fy = event.y
	}

	function dragged(event) {
		event.subject.fx = event.x
		event.subject.fy = event.y
	}

	function dragended(event) {
		if (!event.active) simulation.alphaTarget(0.1)
		event.subject.fx = null
		event.subject.fy = null
	}
}

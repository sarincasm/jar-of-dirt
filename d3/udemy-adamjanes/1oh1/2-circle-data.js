/** @format */

const data = [15, 10, 20, 22, 35]

const svg = d3
	.select('#chart')
	.append('svg')
	.attr('width', 400)
	.attr('height', 400)

const cs = svg.selectAll('circle').data(data)

cs.enter()
	.append('circle')
	.attr('cx', (d) => {
		return d * 5
	})
	.attr('cy', 100)
	.attr('r', 4)
	.attr('fill', 'blue')

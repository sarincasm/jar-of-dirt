/** @format */

const rect = d3
	.select('#chart')
	.append('svg')
	.attr('width', 400)
	.attr('height', 400)
	.append('rect')

rect
	.attr('x', 25)
	.attr('y', 25)
	.attr('width', 40)
	.attr('height', 40)
	.attr('fill', 'blue')

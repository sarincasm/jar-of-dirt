/** @format */

window.document.title = 'D3 - Sliding Donut'
;(async () => {
	data = (await d3.tsv('data/donut-2.tsv')).map((row) => ({
		...row,
		count: Number(row.count),
	}))

	regions = Array.from(new Set(data.map((row) => row.region)))
	regionsByFruit = d3.group(data, (d) => d.fruit)

	setupFruitRadio()
	drawStructure()

	draw()
})()

const margin = {
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
}
const fullWidth = window.innerWidth * 0.98
const fullHeight = window.innerHeight * 0.93
const width = fullWidth - margin.left - margin.right
const height = fullHeight - margin.top - margin.bottom

let data

let regions
let regionsByFruit
let selectedFruit = 'Apples'

let g

let colorMap

const radius = Math.min(width, height) / 2
const arc = d3
	.arc()
	.outerRadius(radius)
	.innerRadius(radius - 80)

function drawStructure() {
	const svg = d3
		.select('#chart')
		.append('svg')
		.attr('width', fullWidth)
		.attr('height', fullHeight)
		.attr('style', 'margin: 0')
	g = svg
		.append('g')
		.attr('transform', `translate(${width / 2}, ${height / 2})`)

	colorMap = d3.scaleOrdinal(d3.schemeCategory10).domain(regions)
}

function setupFruitRadio() {
	const form = d3.select('#chart').append('form')
	const label = form
		.selectAll('.label')
		.data(regionsByFruit)
		.enter()
		.append('label')
	label
		.append('input')
		.attr('type', 'radio')
		.attr('name', 'fruit')
		.attr('value', (d) => d[0])
		.property('checked', (d) => d[0] === selectedFruit)
	label.append('span').text((d) => d[0])
	label.on('change', (e) => {
		selectedFruit = e.target.value
		draw()
	})
}

function draw() {
	const transitionFunction = d3.transition().duration(1000)

	const pie = d3.pie().value((d) => d.count)
	let path = g.selectAll('path')

	const oldData = path.data()
	const newData = pie(regionsByFruit.get(selectedFruit))

	path = path.data(newData)

	path
		.exit()
		.datum((_d, i) => findNeighbor({i, oldData: newData, newData: oldData}))
		.transition(transitionFunction)
		.attrTween('d', arcTween)
		.remove()

	path
		.enter()
		.append('path')
		.each((d, i, paths) => {
			let stored
			if (oldData.length) stored = findNeighbor({i, oldData, newData})
			else stored = d
			paths[i]._stored = stored
		})
		.attr('fill', (d) => colorMap(d.data.region))
		.merge(path)
		.transition(transitionFunction)
		.attrTween('d', arcTween)
}

function arcTween(d) {
	const stored = this._stored
	const interpolator = d3.interpolate(stored, d)
	this._stored = interpolator(1)
	return (t) => arc(interpolator(t))
}

function findNeighbor({i, oldData, newData}) {
	const preceding = findPreceding()
	return {startAngle: preceding.endAngle, endAngle: preceding.endAngle}

	function findPreceding() {
		const l = oldData.length
		let index = i - 1
		while (index > 0) {
			const region = newData[index].data.region
			for (let j = 0; j < l; ++j) {
				if (oldData[j].data.region === region) return oldData[j]
			}
			index--
		}
	}
}

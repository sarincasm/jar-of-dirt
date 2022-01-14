/** @format */

;(async () => {
	const data = (await d3.csv('data/donut-1.csv')).map(({age, population}) => ({
		age,
		population: Number(population),
	}))

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
		.attr('transform', `translate(${width / 2}, ${height / 2})`)

	const colorMap = d3
		.scaleOrdinal()
		.range([
			'#98abc5',
			'#8a89a6',
			'#7b6888',
			'#6b486b',
			'#a05d56',
			'#d0743c',
			'#ff8c00',
		])

	const radius = Math.min(width, height) / 2

	const arc = d3
		.arc()
		.outerRadius(radius)
		.innerRadius(radius - 40)

	const pie = d3
		.pie()
		.sort(null)
		.value((d) => d.population)

	const donutGroup = g
		.selectAll('.arc')
		.data(pie(data))
		.enter()
		.append('g')
		.attr('class', 'arc')

	donutGroup
		.append('path')
		.attr('d', arc)
		.style('fill', (d) => colorMap(d.data.age))
}

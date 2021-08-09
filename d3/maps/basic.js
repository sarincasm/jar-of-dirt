/** @format */

window.document.title = 'D3 - Maps'

const fullWidth = window.innerWidth * 0.95
const fullHeight = window.innerHeight * 0.9

;(async () => {
	// https://filedn.eu/lkPoWhfsVfnBsjKrkWb0mHm/eels/dirt-data/world-110.json
	const topology = await d3.json('./large-data/world-110.json')
	draw(topology)
})()

function draw(topology) {
	const svg = d3
		.select('#chart')
		.append('svg')
		.attr('viewBox', [0, 0, fullWidth, fullHeight])
		.attr('text-anchor', 'middle')

	const graticule = d3.geoGraticule()

	const projection = d3
		// .geoConicEqualArea()
		.geoEqualEarth()
		.scale(200)
		.translate([fullWidth / 2, fullHeight / 2])
	// .precision(0.1)

	const path = d3.geoPath().projection(projection)

	const geoJsonLand = topojson.feature(topology, topology.objects.land)
	const geoJsonBoundaries = topojson.mesh(
		topology,
		topology.objects.countries,
		function (a, b) {
			return a !== b
		}
	)

	svg.append('path').datum(geoJsonLand).attr('d', path)
	svg.append('path')
		.datum(geoJsonBoundaries)
		.attr('d', path)
		.attr('style', 'fill:none;stroke:#fff;stroke-width: .7px')

	svg.append('path')
		.datum(graticule)
		.attr(
			'style',
			'fill:none;stroke:#777;stroke-opacity:.25;stroke-width: .5px'
		)
		.attr('d', path)
}

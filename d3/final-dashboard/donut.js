/** @format */

class DonutChart {
	constructor(parent) {
		this.parent = parent
		this.initialize()
	}

	initialize() {
		const margin = {
			top: 20,
			right: 10,
			bottom: 50,
			left: 10,
		}
		const svgWidth = fullWidth * 0.3
		const width = svgWidth - margin.left - margin.right
		this.width = width
		const svgHeight = fullHeight * 0.35
		const height = svgHeight - margin.top - margin.bottom
		this.height = height

		const radius = Math.min(width, height) / 2

		const svg = d3
			.select(this.parent)
			.append('svg')
			.attr('width', svgWidth)
			.attr('height', svgHeight)

		const g = svg
			.append('g')
			.attr(
				'transform',
				`translate(${margin.left + width / 2}, ${margin.top + height / 2})`
			)

		const pie = d3
			.pie()
			.padAngle(0.03)
			.value((d) => d.count)
			.sort(null)

		const arc = d3
			.arc()
			.innerRadius(radius - 50)
			.outerRadius(radius - 30)

		g.append('text')
			.attr('y', -(height / 2))
			.attr('x', -(width / 2))
			.attr('font-size', '15px')
			.attr('text-anchor', 'start')
			.text('Company Size')

		this.colorScale = d3.scaleOrdinal(d3.schemeAccent)

		this.g = g
		this.pie = pie
		this.arc = arc

		this.addLegend()
		this.refresh()
	}

	addLegend() {
		const {g, colorScale} = this

		const sizes = ['small', 'medium', 'large']
		const legendData = sizes.map((size) => ({
			label: size,
			color: colorScale(size),
		}))

		const legend = g.append('g').attr('transform', 'translate(150, -100)')

		const legendRow = legend
			.selectAll('.legendRow')
			.data(legendData)
			.enter()
			.append('g')
			.attr('class', 'legendRow')
			.attr('transform', (_d, i) => `translate(0, ${i * 20})`)

		legendRow
			.append('rect')
			.attr('class', 'legendRect')
			.attr('width', 10)
			.attr('height', 10)
			.attr('fill', (d) => d.color)

		legendRow
			.append('text')
			.attr('class', 'legendText')
			.attr('x', -10)
			.attr('y', 10)
			.attr('text-anchor', 'end')
			.text((d) => d.label)
	}

	refresh() {
		const transitionFunction = d3.transition().duration(750)
		const callsByCompanySize = d3
			.group(calls, (d) => d.company_size)
			.entries()
		const data = []

		while (true) {
			const {done, value} = callsByCompanySize.next()
			if (done) break
			const [size, calls] = value
			data.push({
				value: size,
				count: calls.length,
			})
		}
		const {g, pie, arc, colorScale} = this

		const path = g.selectAll('path').data(pie(data))
		path.transition(transitionFunction).attrTween('d', arcTween)
		path
			.enter()
			.append('path')
			.attr('fill', (d) => colorScale(d.data.value))
			.transition(transitionFunction)
			.attrTween('d', arcTween)

		function arcTween(d) {
			const i = d3.interpolate(this._current, d)
			this._current = i(1)
			return (t) => arc(i(t))
		}
	}
}

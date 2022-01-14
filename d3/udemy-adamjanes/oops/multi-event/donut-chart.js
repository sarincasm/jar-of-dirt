/** @format */
const colorMap = d3.scaleOrdinal(d3.schemeCategory10)

class DonutChart {
	constructor(parent, variable) {
		this.parent = parent
		this.variable = variable
		this.initialize()
	}

	initialize() {
		const margin = {
			top: 50,
			right: 50,
			bottom: 80,
			left: 100,
		}
		const width = fullWidth - margin.left - margin.right
		this.width = width
		const height = fullHeight - margin.top - margin.bottom
		this.height = height

		const radius = Math.min(width, height) / 2

		const {label} = values.find(({value}) => value === this.variable)

		const svg = d3
			.select(this.parent)
			.append('svg')
			.attr('width', fullWidth)
			.attr('height', fullHeight)

		const g = svg
			.append('g')
			.attr(
				'transform',
				`translate(${margin.left + width / 2}, ${margin.top + height / 2})`
			)

		const pie = d3
			.pie()
			.padAngle(0.03)
			.value((d) => d.data[this.variable])
			.sort(null)

		const arc = d3
			.arc()
			.innerRadius(radius - 60)
			.outerRadius(radius - 30)

		g.append('text')
			.attr('y', -(height / 2))
			.attr('x', -(width / 2))
			.attr('font-size', '15px')
			.attr('text-anchor', 'start')
			.text(label)

		this.g = g
		this.pie = pie
		this.arc = arc

		this.refresh()
	}

	refresh() {
		const transitionFunction = d3.transition().duration(750)

		const {g, pie, arc} = this

		let path = g.selectAll('path')

		const oldData = path.data()
		const newData = pie(donutData)

		path = path.data(newData)

		path
			.exit()
			.datum((_d, i) =>
				findNeighbor({i, oldData: newData, newData: oldData})
			)
			.transition(transitionFunction)
			.attrTween('d', arcTween)
			.remove()

		path
			.transition(transitionFunction)
			.attrTween('d', arcTween)
			.attr('fill-opacity', (d) => (d.data.coin === selectedCoin ? 1 : 0.3))

		path
			.enter()
			.append('path')
			.each((d, i, paths) => {
				let stored
				if (oldData.length) stored = findNeighbor({i, oldData, newData})
				else stored = d
				paths[i]._stored = stored
			})
			.attr('fill', (d) => colorMap(d.data.coin))
			.attr('fill-opacity', (d) => (d.data.coin === selectedCoin ? 1 : 0.3))
			.on('click', arcClicked)
			.transition(transitionFunction)
			.attrTween('d', arcTween)

		function arcTween(d) {
			const stored = this._stored
			const interpolator = d3.interpolate(stored, d)
			this._stored = interpolator(1)
			return (t) => arc(interpolator(t))
		}
	}
}

function findNeighbor({i, oldData, newData}) {
	const preceding = findPreceding()
	return {startAngle: preceding.endAngle, endAngle: preceding.endAngle}

	function findPreceding() {
		const l = oldData.length
		let index = i - 1
		while (index > 0) {
			const coin = newData[index].data.coin
			for (let j = 0; j < l; ++j) {
				if (oldData[j].data.coin === coin) return oldData[j]
			}
			index--
		}
	}
}

function arcClicked(_event, {data}) {
	const coinSelect = document.getElementById('coin-select')
	coinSelect.value = data.coin
	coinSelect.dispatchEvent(new Event('change'))
}

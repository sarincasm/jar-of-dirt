/** @format */

const fullWidth = window.innerWidth * 0.32
const fullHeight = window.innerHeight * 0.44
const lineCharts = {}
const data = {}
let coins
const values = [
	{
		value: 'price_usd',
		label: 'Price (USD)',
	},
	{
		value: 'market_cap',
		label: 'Market Capitalization',
	},
	{
		value: '24h_vol',
		label: '24 Hour Trading Volume',
	},
]
let selectedValue = values[0].value
let selectedLabel = values[0].label

class LineChart {
	constructor(parent, coin) {
		this.parent = parent
		this.coin = coin
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

		const svg = d3
			.select(this.parent)
			.append('svg')
			.attr('width', fullWidth)
			.attr('height', fullHeight)

		const g = svg
			.append('g')
			.attr('transform', `translate(${margin.left}, ${margin.top})`)

		g.append('path')
			.attr('class', 'line')
			.attr('fill', 'none')
			.attr('stroke', 'grey')
			.attr('stroke-width', '3px')

		g.append('text')
			.attr('x', width / 2)
			.attr('y', height + 60)
			.attr('font-size', '20px')
			.attr('text-anchor', 'middle')
			.text('Time')

		this.yLabelG = g
			.append('text')
			.attr('x', -(height / 2))
			.attr('y', -60)
			.attr('font-size', '20px')
			.attr('text-anchor', 'middle')
			.attr('transform', 'rotate(-90)')
			.text('Price ($)')

		this.xScale = d3.scaleTime().range([0, width])
		this.yScale = d3.scaleLinear().range([height, 0])

		this.bottomAxis = d3.axisBottom()
		this.leftAxis = d3.axisLeft().ticks(6)

		this.bottomAxisG = g
			.append('g')
			.attr('transform', `translate(0, ${height})`)
		this.leftAxisG = g.append('g')

		this.g = g
		this.refresh()
	}

	refresh() {
		const transitionFunction = d3.transition().duration()

		const dataToDisplay = data[this.coin]
		this.dataToDisplay = dataToDisplay

		const {g, xScale, yScale, leftAxis, bottomAxis} = this

		xScale.domain(d3.extent(dataToDisplay, (d) => d.date))
		yScale.domain([
			d3.min(dataToDisplay, (d) => d[selectedValue]) / 1.005,
			d3.max(dataToDisplay, (d) => d[selectedValue]) * 1.005,
		])

		this.yLabelG.text(selectedLabel)

		bottomAxis.scale(xScale)
		this.bottomAxisG.transition(transitionFunction).call(bottomAxis)
		leftAxis.scale(yScale)
		leftAxis.tickFormat(formatAbbreviation)
		this.leftAxisG.transition(transitionFunction).call(leftAxis)

		g.select('.focus').remove()
		g.select('.overlay').remove()

		const line = d3
			.line()
			.x((d) => xScale(d.date))
			.y((d) => yScale(d[selectedValue]))

		g.select('.line')
			.transition(transitionFunction)
			.attr('d', line(dataToDisplay))

		this.setupHover()
	}

	setupHover() {
		const {g, height, width, xScale, yScale, dataToDisplay} = this

		const focus = g
			.append('g')
			.attr('class', 'focus')
			.style('display', 'none')

		focus
			.append('line')
			.attr('class', 'vertical-hover-line hover-line')
			.attr('y1', 0)
			.attr('y2', height)

		focus
			.append('line')
			.attr('class', 'horizontal-hover-line hover-line')
			.attr('x1', 0)
			.attr('x2', width)

		focus.append('text').attr('x', -25).attr('y', -25).attr('dy', '.25em')

		focus.append('circle').attr('class', 'hover-circle').attr('r', 7.5)

		g.append('rect')
			.attr('class', 'overlay')
			.attr('width', width)
			.attr('height', height)
			.on('mouseover', () => focus.style('display', null))
			.on('mouseout', () => focus.style('display', 'none'))
			.on('mousemove', mousemove)

		function mousemove(event) {
			const bisectDate = d3.bisector((d) => d.date).left
			const xPos = xScale.invert(d3.pointer(event, this)[0])
			const i = bisectDate(dataToDisplay, xPos, 1)
			const dLeft = dataToDisplay[i - 1]
			const dRight = dataToDisplay[i]
			const dClosest =
				xPos - dLeft.date > dRight.date - xPos ? dRight : dLeft
			const {date} = dClosest
			const value = dClosest[selectedValue]
			focus.attr('transform', `translate(${xScale(date)}, ${yScale(value)})`)
			focus.select('text').text(formatAbbreviation(value))
			focus.select('.vertical-hover-line').attr('y2', height - yScale(value))
			focus.select('.horizontal-hover-line').attr('x2', -xScale(date))
		}
	}
}

window.document.title = 'D3 - Multiple Coin Stats'
;(async () => {
	const parseTime = d3.timeParse('%d/%m/%Y')
	// https://filedn.eu/lkPoWhfsVfnBsjKrkWb0mHm/eels/dirt-data/
	const rawData = await d3.json('./large-data/coins.json')
	coins = Object.keys(rawData)

	drawSelectors()

	coins.forEach((coin) => {
		data[coin] = rawData[coin]
			.filter(({price_usd}) => price_usd !== null)
			.map((d) => ({
				price_usd: Number(d['price_usd']),
				'24h_vol': Number(d['24h_vol']),
				market_cap: Number(d['market_cap']),
				date: parseTime(d['date']),
			}))
		lineCharts[coin] = new LineChart('#chart', coin)
	})
})()

function refresh() {
	coins.forEach((coin) => {
		lineCharts[coin].refresh()
	})
}

function drawSelectors() {
	setupVariableSelectBox()
}

function formatAbbreviation(x) {
	const formatSi = d3.format('.2s')
	const s = formatSi(x)
	switch (s[s.length - 1]) {
		case 'G':
			return s.slice(0, -1) + 'B' // billions
		case 'k':
			return s.slice(0, -1) + 'K' // thousands
	}
	return s
}

function setupVariableSelectBox() {
	const selectBox = d3.select('#button').append('select')

	values.forEach(({value, label}) => {
		selectBox.append('option').text(label).attr('value', value)
	})

	selectBox.on('change', (e) => {
		const target = e.target
		selectedValue = target.value
		selectedLabel = target.options[target.selectedIndex].text
		refresh()
	})
}

/** @format */

window.document.title = 'D3 - Final Dashboard'

const fullWidth = window.innerWidth
const fullHeight = window.innerHeight - 50

const parseTime = d3.timeParse('%d/%m/%Y')
const formatTime = d3.timeFormat('%d/%m/%Y')

let calls
let allCalls
const charts = {}
const regions = ['northeast', 'midwest', 'south', 'west']

const variables = ['call_revenue', 'call_duration', 'units_sold']
let selectedVariable = variables[0]

const timeRange = {}

;(async () => {
	const rawData = await d3.json('./large-data/calls.json')
	rawData.forEach((d) => {
		d.date = parseTime(d.date)
	})
	calls = rawData
	allCalls = rawData

	setupCoinSelectBox()

	charts.stackedArea = new StackedAreaChart('#stacked-area')
	charts.donut = new DonutChart('#donut-chart')

	charts.revenueBar = new BarChart('#revenue-chart', 'call_revenue')
	charts.durationBar = new BarChart('#duration-chart', 'call_duration')
	charts.unitsBar = new BarChart('#units-chart', 'units_sold')

	charts.brush = new Brush('#brush-chart')

	const [min, max] = charts.brush.xScale.range()

	timeRange.min = min
	timeRange.defaultMin = min
	timeRange.max = max
	timeRange.defaultMax = max
})()

function setupCoinSelectBox() {
	const selectBox = d3
		.select('#button')
		.append('select')
		.attr('id', 'variable-select')

	variables.forEach((variable) => {
		selectBox
			.append('option')
			.text(startCase(variable))
			.attr('value', variable)
	})

	selectBox.on('change', (e) => {
		const target = e.target
		selectedVariable = target.value
		charts.stackedArea.refresh()
		charts.brush.refresh()
	})
}

function refresh() {
	const {min, max} = timeRange
	calls = allCalls.filter((d) => d.date > min && d.date < max)

	const allCharts = Object.keys(charts)
	allCharts.forEach((chart) => charts[chart].refresh())
}

function startCase(term) {
	return term.split('_').map(wordStartCase).join(' ')
	function wordStartCase(string) {
		return string.charAt(0).toUpperCase() + string.slice(1)
	}
}

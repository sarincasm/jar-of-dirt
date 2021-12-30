/** @format */

const fullWidth = window.innerWidth * 0.49
const fullHeight = window.innerHeight * 0.47

const parseTime = d3.timeParse('%d/%m/%Y')
const formatTime = d3.timeFormat('%d/%m/%Y')

let calls
const charts = {}
const regions = ['northeast', 'midwest', 'south', 'west']

let selectedVariable = 'call_revenue'

window.document.title = 'D3 - Final Dashboard'
;(async () => {
	const rawData = await d3.json('./large-data/calls.json')
	rawData.forEach((d) => {
		d.date = parseTime(d.date)
	})
	calls = rawData
	charts.stackedArea = new StackedAreaChart('#stacked-area')
	charts.donut = new DonutChart('#donut-chart')
})()

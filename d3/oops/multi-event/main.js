/** @format */

const fullWidth = window.innerWidth * 0.49
const fullHeight = window.innerHeight * 0.47
const charts = {}
const data = {}
const donutData = []
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
let selectedCoin
const parseTime = d3.timeParse('%d/%m/%Y')
const timeRange = {
	defaulMin: parseTime('12/5/2013'),
	defaultMax: parseTime('31/10/2017'),
	min: parseTime('12/5/2013'),
	max: parseTime('31/10/2017'),
}

window.document.title = 'D3 - Multiple Coin Stats'
;(async () => {
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
		donutData.push({
			coin,
			data: data[coin].slice(-1)[0],
		})
	})
	charts.line = new LineChart('#line-chart')
	charts.brush = new Brush('#brush-chart')
	charts.donut1 = new DonutChart('#donut-chart', '24h_vol')
	charts.donut2 = new DonutChart('#donut-chart', 'market_cap')
})()

function refresh() {
	charts.line.refresh()
	charts.brush.refresh()
	charts.donut1.refresh()
	charts.donut2.refresh()
}

function drawSelectors() {
	setupCoinSelectBox()
}

function setupCoinSelectBox() {
	const selectBox = d3
		.select('#button')
		.append('select')
		.attr('id', 'coin-select')

	coins.forEach((coin) => {
		selectBox.append('option').text(coin).attr('value', coin)
	})
	selectedCoin = coins[0]

	selectBox.on('change', (e) => {
		console.log(262)
		const target = e.target
		selectedCoin = target.value
		refresh()
	})
}

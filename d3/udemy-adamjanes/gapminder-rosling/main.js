/** @format */

window.document.title = 'D3 - GDP & Life Expectancy 1800-2014'
const margin = {
	top: 25,
	right: 5,
	bottom: 80,
	left: 100,
}
const fullWidth = window.innerWidth * 0.95
const fullHeight = window.innerHeight * 0.95
const width = fullWidth - margin.left - margin.right
const height = fullHeight - margin.top - margin.bottom

let g
let xScale, yScale, areaScale, continentColorMap
let timeLabelG

let MinIncome, MaxIncome
let MinPopulation, MaxPopulation
let MinLifeExp = 0,
	MaxLifeExp

let interval
const delay = 200
let playState = true

let cleanData
let yearDisplayed = 0

let continentFilter = 'all'

;(async () => {
	// https://filedn.eu/lkPoWhfsVfnBsjKrkWb0mHm/eels/dirt-data/gapminder-rosling-data.json
	const data = await d3.json('large-data/gapminder-rosling-data.json')
	cleanData = data.map((yearData) => {
		const filtered = yearData.countries.filter(
			(countryData) => countryData.income && countryData.life_exp
		)
		const formattedCountryData = filtered.map((countryData) => ({
			...countryData,
			income: Number(countryData.income),
			life_exp: Number(countryData.life_exp),
		}))
		return {
			year: yearData.year,
			countries: formattedCountryData,
		}
	})

	const continents = getContinents(cleanData)

	const incomeMinMax = getMinMax(cleanData, 'income')
	MinIncome = incomeMinMax.min
	MaxIncome = incomeMinMax.max
	const populationMinMax = getMinMax(cleanData, 'population')
	MinPopulation = populationMinMax.min
	MaxPopulation = populationMinMax.max
	const lifeExpMinMax = getMinMax(cleanData, 'life_exp')
	MaxLifeExp = lifeExpMinMax.max

	drawStructure({
		timeLabel: data[0].year,
		continents,
	})
	drawData(cleanData[0])

	interval = d3.interval(drawAtInterval, delay)
})()

function drawAtInterval() {
	const years = cleanData.length
	if (playState) yearDisplayed = (yearDisplayed + 1) % years
	drawData(cleanData[yearDisplayed])
	document.getElementById('year-select').value = yearDisplayed
}

function setupPlayButton() {
	const playButton = d3
		.select('#chart')
		.append('button')
		.text('PAUSE')
		.attr(
			'style',
			`position: relative; top: 60px; left: ${200}px; background: ${
				d3.schemePastel1[0]
			};  width: 100px; height: 50px; border: 0; border-radius: 5px; font-size: .8em; cursor: pointer;`
		)

	playButton.on('click', () => {
		if (playState) {
			interval.stop()
			playButton.text('PLAY')
		} else {
			interval = d3.interval(drawAtInterval, delay)
			playButton.text('PAUSE')
		}
		playState = !playState
	})
}
function setupResetButton() {
	const resetButton = d3
		.select('#chart')
		.append('button')
		.text('RESET')
		.attr(
			'style',
			`position: relative; top: 60px; left: ${205}px; background: ${
				d3.schemePastel1[0]
			};  width: 100px; height: 50px; border: 0; border-radius: 5px; font-size: .8em; cursor: pointer;`
		)

	resetButton.on('click', () => {
		yearDisplayed = 0
		drawAtInterval()
	})
}
function setupFilterSelectBox(continents) {
	const selectBox = d3
		.select('#chart')
		.append('select')
		.attr('id', 'filter')
		.attr(
			'style',
			`position: relative; top: 60px; left: ${210}px; background: ${
				d3.schemePastel1[0]
			};  width: 100px; height: 50px; border: 0; border-radius: 5px; font-size: .8em; cursor: pointer;`
		)

	selectBox.append('option').text('ALL').attr('value', 'all')
	continents.forEach((continent) => {
		selectBox
			.append('option')
			.text(continent.toUpperCase())
			.attr('value', continent)
	})

	selectBox.on('change', (e) => {
		continentFilter = e.target.value
		drawAtInterval()
	})
}
function setupYearSelect() {
	const yearSelectBox = d3
		.select('#chart')
		.append('input')
		.attr('id', 'year-select')
		.attr('type', 'range')
		.attr('min', 0)
		.attr('max', cleanData.length - 1)
		.attr(
			'style',
			`position: relative; top: 80px; left: ${215}px; background: ${
				d3.schemePastel1[0]
			}; width: 500px; height: 50px; border: 0; border-radius: 5px; font-size: .8em; cursor: pointer;`
		)

	yearSelectBox.on('change', (e) => {
		yearDisplayed = Number(e.target.value)
		drawAtInterval()
	})
}

function drawStructure({timeLabel, continents}) {
	setupPlayButton()
	setupResetButton()
	setupFilterSelectBox(continents)
	setupYearSelect()

	const svg = d3
		.select('#chart')
		.append('svg')
		.attr('width', fullWidth)
		.attr('height', fullHeight)
	g = svg
		.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)

	g.append('text')
		.attr('x', width / 2)
		.attr('y', height + 60)
		.attr('font-size', '20px')
		.attr('text-anchor', 'middle')
		.text('GDP Per Capita ($)')
	g.append('text')
		.attr('x', -(height / 2))
		.attr('y', -60)
		.attr('font-size', '20px')
		.attr('text-anchor', 'middle')
		.attr('transform', 'rotate(-90)')
		.text('Life Expectancy (Years)')
	timeLabelG = g
		.append('text')
		.attr('y', height - 40)
		.attr('x', width - 60)
		.attr('font-size', '40px')
		.attr('opacity', '0.4')
		.attr('text-anchor', 'middle')
		.text(timeLabel)

	xScale = d3
		.scaleLog()
		.base(10)
		.domain([MinIncome, MaxIncome])
		.range([0, width])
	yScale = d3.scaleLinear().domain([MinLifeExp, MaxLifeExp]).range([height, 0])
	areaScale = d3
		.scaleLinear()
		.domain([MinPopulation, MaxPopulation])
		.range([25 * Math.PI, 1500 * Math.PI])
	continentColorMap = d3.scaleOrdinal(d3.schemePastel1)

	const xAxis = d3
		.axisBottom(xScale)
		.tickValues([400, 4000, 40000])
		.tickFormat(d3.format('$'))
	g.append('g').attr('transform', `translate(0, ${height})`).call(xAxis)
	const yAxis = d3.axisLeft(yScale)
	g.append('g').call(yAxis)

	const legendGroup = g
		.append('g')
		.attr('transform', `translate(${width - 35}, 20)`)

	continents.forEach((continent, index) => {
		const legendRow = legendGroup
			.append('g')
			.attr('transform', `translate(0, ${(index - 1) * 30})`)

		legendRow
			.append('rect')
			.attr('width', 20)
			.attr('height', 20)
			.attr('fill', continentColorMap(continent))

		legendRow
			.append('text')
			.attr('x', -15)
			.attr('y', 15)
			.attr('text-anchor', 'end')
			.style('text-transform', 'capitalize')
			.text(continent)
	})
}

function drawData({year, countries}) {
	const transitionFunction = d3.transition().duration()

	countries = countries.filter((countryData) => {
		if (continentFilter === 'all') return true
		return countryData.continent === continentFilter
	})

	const tip = d3
		.tip()
		.attr('class', 'd3-tip')
		.html((_event, d) => {
			let text = `<strong>Country:</strong> <span style='color:red;text-transform:capitalize'>${d.country}</span><br>`
			text += `<strong>Continent:</strong> <span style='color:red;text-transform:capitalize'>${d.continent}</span><br>`
			text += `<strong>Life Expectancy:</strong> <span style='color:red'>${d3.format(
				'.2f'
			)(d.life_exp)}</span><br>`
			text += `<strong>GDP Per Capita:</strong> <span style='color:red'>${d3.format(
				'$,.0f'
			)(d.income)}</span><br>`
			text += `<strong>Population:</strong> <span style='color:red'>${d3.format(
				',.0f'
			)(d.population)}</span><br>`
			return text
		})

	g.call(tip)

	const circles = g.selectAll('circle').data(countries, (d) => d.country)

	circles.exit().remove()

	circles
		.enter()
		.append('circle')
		.attr('fill', (d) => continentColorMap(d.continent))
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide)
		.merge(circles)
		.transition(transitionFunction)
		.attr('cx', (d) => xScale(d.income))
		.attr('cy', (d) => yScale(d.life_exp))
		.attr('r', (d) => Math.sqrt(areaScale(d.population) / Math.PI))

	timeLabelG.text(year)
}

function getMinMax(data, key) {
	let min = Infinity
	let max = -Infinity
	data.forEach((yearData) => {
		const {countries} = yearData
		countries.forEach((countryData) => {
			const value = countryData[key]
			min = Math.min(min, value)
			max = Math.max(max, value)
		})
	})
	return {min, max}
}

function getContinents(data) {
	const continents = new Set()
	data.forEach((yearData) => {
		yearData.countries.forEach((countryData) => {
			continents.add(countryData.continent)
		})
	})
	return Array.from(continents)
}

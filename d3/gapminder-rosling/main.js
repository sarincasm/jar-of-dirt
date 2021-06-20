/** @format */

let MinIncome, MaxIncome
let MinPopulation, MaxPopulation
let MinLifeExp = 0,
	MaxLifeExp

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
;(async () => {
	// https://filedn.eu/lkPoWhfsVfnBsjKrkWb0mHm/eels/dirt-data/gapminder-rosling-data.json
	const data = await d3.json('large-data/gapminder-rosling-data.json')
	const cleanData = data.map((yearData) => {
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
	})
	drawData(cleanData[0])

	let yearDisplayed = 0
	const years = cleanData.length
	d3.interval(() => {
		yearDisplayed = (yearDisplayed + 1) % years
		drawData(cleanData[yearDisplayed])
	}, 200)
})()

function drawStructure({timeLabel}) {
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
}

function drawData({year, countries}) {
	const transitionFunction = d3.transition().duration()

	const circles = g.selectAll('circle').data(countries, (d) => d.country)

	circles.exit().remove()

	circles
		.enter()
		.append('circle')
		.attr('fill', (d) => continentColorMap(d.continent))
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

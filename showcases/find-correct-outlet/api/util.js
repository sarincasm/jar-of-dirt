/** @format */

const tj = require('@tmcw/togeojson')
const fs = require('fs')
const DOMParser = require('xmldom').DOMParser

const kml = new DOMParser().parseFromString(
	fs.readFileSync(__dirname + '/assets/DeliveryAreas.kml', 'utf8')
)

function getGeoJson() {
	const geoJson = tj.kml(kml)
	return geoJson
}

// get a list of all polygons from the KML file
function getPolygons() {
	const geoJson = getGeoJson()
	const polygons = geoJson.features.filter(
		({geometry}) => geometry.type === 'Polygon'
	)
	return polygons
}

// store which outlet (point feature) corresponds to each polygon
function getPolygonToOutletMap() {
	const {features} = getGeoJson()
	const polygonToOutletMap = new Map()
	const lastIndex = features.length - 1
	features.forEach(({geometry, properties}, index) => {
		if (geometry.type !== 'Polygon') return
		// last two polyons are not contigous, and correspond to the same outlet (point)
		if (index === lastIndex)
			polygonToOutletMap.set(properties.name, features[index - 2])
		else
			polygonToOutletMap.set(properties.name, features[index - 1])
	})
	return polygonToOutletMap
}

module.exports = {getPolygons, getPolygonToOutletMap}

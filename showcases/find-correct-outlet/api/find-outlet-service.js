/** @format */

const turf = require('@turf/turf')

const {getPolygonToOutletMap, getPolygons} = require('./util')

// computed once on startup - serves as an in-memory cache
const polygons = getPolygons()
const polygonToOutletMap = getPolygonToOutletMap()

function findOutlet(inputCoordinates) {
	const point = getPoint(inputCoordinates)

	const length = polygons.length
	for (let index = 0; index < length; index++) {
		const {geometry, properties} = polygons[index]

		const polygon = turf.polygon(geometry.coordinates)
		const pointInPolygon = turf.booleanPointInPolygon(
			point,
			polygon
		)
		if (pointInPolygon) {
			const outlet = polygonToOutletMap.get(properties.name)
			return constructOutput(point, {properties}, outlet)
		}
	}

	return {
		errors: true,
		message: 'Not Found',
		userMessage: 'Sorry, we do not serve this location yet.',
	}
}

function constructOutput(inputPoint, polygon, outlet) {
	const midpoint = turf.midpoint(
		inputPoint.geometry.coordinates,
		outlet.geometry.coordinates
	)
	return {
		success: true,
		input: getLatLngFromPoint(inputPoint),
		polygonName: polygon.properties.name,
		outlet: {
			name: outlet.properties.name,
			...getLatLngFromPoint(outlet),
		},
		midpoint: getLatLngFromPoint(midpoint),
	}
}

function getLatLngFromPoint(point) {
	return {
		lat: point.geometry.coordinates[1],
		lng: point.geometry.coordinates[0],
	}
}

function getPoint({lat, lng}) {
	return turf.point([lng, lat])
}

module.exports = {findOutlet}

/** @format */

const {getPolygonToOutletMap, getPolygons} = require('./util')

describe('Tests for Utils', () => {
	test('getPolygonToOutletMap', () => {
		const polygonToOutletMap = getPolygonToOutletMap()
		expect(polygonToOutletMap).toMatchSnapshot()
	})
	test('getPolygons', () => {
		const polygons = getPolygons()
		expect(polygons).toMatchSnapshot()
	})
})

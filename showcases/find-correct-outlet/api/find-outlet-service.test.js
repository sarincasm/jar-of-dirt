/** @format */

const util = require('./util')

const polygonToOutletMapSpy = jest.spyOn(
	util,
	'getPolygonToOutletMap'
)
const polygonsSpy = jest.spyOn(util, 'getPolygons')

const {findOutlet} = require('./find-outlet-service')

const testCases = [
	{
		testName: 'Stumpergasse 51',
		input: {lat: 48.19483779999999, lng: 16.3429833},
		expectedResult: {
			success: true,
			input: {lat: 48.19483779999999, lng: 16.3429833},
			polygonName: 'au_vienna_schoenbrunnerstr',
			outlet: {
				name: 'Schönbrunner Str. 156 (Bella Italia)',
				lat: 48.1866199,
				lng: 16.3402707,
			},
			midpoint: {lat: 48.190728857976815, lng: 16.341626891248588},
		},
	},
	{
		testName: 'Ungargasse 17',
		input: {lat: 48.2029047, lng: 16.3873319},
		expectedResult: {
			success: true,
			input: {lat: 48.2029047, lng: 16.3873319},
			polygonName: 'au_vienna_landstrasserhauptstr',
			outlet: {
				name: 'Landstraßer Hauptstraße 163 (Pizzeria Stefano)',
				lat: 48.1914916,
				lng: 16.4002954,
			},
			midpoint: {lat: 48.19719833217621, lng: 16.393814371959586},
		},
	},
	{
		testName: 'Linzer Straße 7',
		input: {lat: 48.1924483, lng: 16.3163687},
		expectedResult: {
			success: true,
			input: {lat: 48.1924483, lng: 16.3163687},
			polygonName: 'au_vienna_dreyhausenstr',
			outlet: {
				name: 'Dreyhausenstraße 17 (Il Primo)',
				lat: 48.197267,
				lng: 16.3035454999999,
			},
			midpoint: {lat: 48.194857828255905, lng: 16.3099574014932},
		},
	},
	{
		testName: 'Maurer Hauptplatz 7',
		input: {lat: 48.15064779999999, lng: 16.2677725},
		expectedResult: {
			success: true,
			input: {lat: 48.15064779999999, lng: 16.2677725},
			polygonName: 'au_vienna_maurerhauptplatz',
			outlet: {
				name: 'Maurer Hauptpl. 2 (Il Gabbiano)',
				lat: 48.1508934,
				lng: 16.2685701,
			},
			midpoint: {lat: 48.15077060068975, lng: 16.268171299045687},
		},
	},
	{
		testName: 'Bahnhofplatz 1',
		input: {lat: 48.2917928, lng: 14.2911107},
		expectedResult: {
			errors: true,
			message: 'Not Found',
			userMessage: 'Sorry, we do not serve this location yet.',
		},
	},
	{
		testName: 'Quadenstraße 5',
		input: {lat: 48.2350888, lng: 16.4674371},
		expectedResult: {
			errors: true,
			message: 'Not Found',
			userMessage: 'Sorry, we do not serve this location yet.',
		},
	},
]
describe('Tests for find outlet service', () => {
	testCases.forEach(({testName, input, expectedResult}) => {
		test(testName, () => {
			const result = findOutlet(input)
			expect(result).toEqual(expectedResult)
		})
	})

	test('Polygon cache', () => {
		expect(polygonToOutletMapSpy).toHaveBeenCalledTimes(1)
		expect(polygonsSpy).toHaveBeenCalledTimes(1)
	})
})

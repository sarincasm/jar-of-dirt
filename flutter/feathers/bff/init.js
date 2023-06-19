const axios = require('axios')
const fs = require('fs')

const {creators} = require('./data/creators')
const {mapArticle} = require('./util')

const host = 'https://cms-api.onefootball.com'

const generateCreator = async ({creatorId, lang = 'en'}) => {
	const response = await axios.get(
		`${host}/v1/${lang}/providers/${creatorId}/items?content_type=rich_article`
	)
	return response.data.map(mapArticle)
}

const generateFeatured = async () => {
	const providersList = [
		// '6537', // independent
		'5936', // Her Football Hub
		// '6165', // She Talks Ball
		'5938', // She Kicks Magazine
		'6521', // FEMALEFUT
		'6299', // GAMERS ACADEMY (de)
		'5651', // Futebol Latino (br)
		// '5591', // Parisfans.fr
	].map((providerId) => ({
		creatorId: providerId,
		lang: creators.find((c) => c.creatorId === providerId).lang,
	}))

	const allArrays = await Promise.all(providersList.map(generateCreator))
	const allItems = allArrays
		.reduce((acc, cur) => [...acc, ...cur], [])
		.sort((a, b) => (b.time > a.time ? 1 : -1))

	const template = fs.readFileSync(
		__dirname + '/templates/featured.js.template',
		'utf-8'
	)
	const jsFileContents = template.replace(
		'{{DATA}}',
		JSON.stringify(allItems, null, 2)
	)
	fs.writeFileSync(__dirname + '/generated/featured.js', jsFileContents)
}

const generateFavoriteTeam1 = async () => {
	const response = await axios.get(
		`${host}/v3/en/teams/867/items?content_type=rich_article`
	)
	const {data} = response
	const template = fs.readFileSync(
		__dirname + '/templates/favoriteTeam1.js.template',
		'utf-8'
	)
	const jsFileContents = template.replace(
		'{{DATA}}',
		JSON.stringify(data, null, 2)
	)
	fs.writeFileSync(__dirname + '/generated/favoriteTeam1.js', jsFileContents)
}

const generateFavoriteTeam2 = async () => {
	const response = await axios.get(
		`${host}/v3/en/teams/13002/items?content_type=rich_article`
	)
	const {data} = response
	const template = fs.readFileSync(
		__dirname + '/templates/favoriteTeam2.js.template',
		'utf-8'
	)
	const jsFileContents = template.replace(
		'{{DATA}}',
		JSON.stringify(data, null, 2)
	)
	fs.writeFileSync(__dirname + '/generated/favoriteTeam2.js', jsFileContents)
}

const generateFavoritePlayer1 = async () => {
	const response = await axios.get(
		`${host}/v3/en/players/126791/items?content_type=rich_article`
	)
	const {data} = response
	const template = fs.readFileSync(
		__dirname + '/templates/favoritePlayer1.js.template',
		'utf-8'
	)
	const jsFileContents = template.replace(
		'{{DATA}}',
		JSON.stringify(data, null, 2)
	)
	fs.writeFileSync(__dirname + '/generated/favoritePlayer1.js', jsFileContents)
}

// check if main function is called directly
if (require.main === module) {
	const dirGenerated = __dirname + '/generated'
	if (!fs.existsSync(dirGenerated)) {
		fs.mkdirSync(dirGenerated)
	}

	// async wrapper
	void (async () => {
		await Promise.all([
			generateFeatured(),
			generateFavoriteTeam1(),
			generateFavoriteTeam2(),
			generateFavoritePlayer1(),
		])
	})()
}

// http server

// import modules
const http = require('http')
const axios = require('axios')

const {mapArticle} = require('./util')

// const {providers} = require('./data')
const {creators} = require('./data/creators')
const {creatorsImagine} = require('./data/imagine')
const {featured} = require('./generated/featured')
const {favoriteTeam1} = require('./generated/favoriteTeam1')
const {favoriteTeam2} = require('./generated/favoriteTeam2')
const {favoritePlayer1} = require('./generated/favoritePlayer1')

// create server
const server = http.createServer((req, res) => {
	if (req.url.startsWith('/creators')) {
		return handler(req, res)
	}

	res.setHeader('Content-Type', 'application/json')

	// const creators = providers
	// 	.filter(
	// 		(provider) =>
	// 			provider.show !== false &&
	// 			typeof provider.provider_id === 'number' &&
	// 			typeof provider.content_languages === 'string' &&
	// 			typeof provider.display_name === 'string' &&
	// 			typeof provider.image_url === 'string'
	// 	)
	// 	.sort((a, b) =>
	// 		a.prioritized === true && b.prioritized !== true ? -1 : 0
	// 	)
	// 	.map((provider) => ({
	// 		creatorId: provider.provider_id.toString(),
	// 		lang: provider.content_languages.split(',')[0],
	// 		creatorName: provider.display_name,
	// 		creatorImageUrl: provider.image_url,
	// 		followerCount: getRandomInt(),
	// 	}))

	const featured_content = featured
	const favoriteTeam1_content = favoriteTeam1.map(mapArticle)
	const favoriteTeam2_content = favoriteTeam2.map(mapArticle)
	const favoritePlayer1_content = favoritePlayer1.map(mapArticle)

	const data = {
		creators,
		sections: [
			{
				title: 'Featured',
				subtitle: 'Top picks from OneFootball',
				content: featured_content,
			},
			{
				title: 'USWNT',
				subtitle: 'You follow this team',
				content: favoriteTeam1_content,
			},
			{
				title: 'Olympique Lyonnais Women',
				subtitle: 'You follow this team',
				content: favoriteTeam2_content,
			},
			{
				title: 'Ada Hegerberg',
				subtitle: 'You follow this player',
				content: favoritePlayer1_content,
			},
		],
		creatorsImagine,
	}

	const jsonData = JSON.stringify(data)
	res.end(jsonData)
})

// handle creator route
const handler = (req, res) => {
	// parse url query params from /creators?creatorId=123&lang=en
	let [creatorId, lang] = req.url.split('?')[1].split('&')
	creatorId = creatorId.split('=')[1]
	lang = lang.split('=')[1]

	const librarianURL = `http://cms-api.onefootball.com/v1/${lang}/providers/${creatorId}/items?content_type=rich_article`

	axios.get(librarianURL).then((response) => {
		const result = response.data
			.filter((article) => article.content_type === 'rich_article')
			.map(mapArticle)
		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(result))
	})
}

// start server
const hostname = '127.0.0.1'
const port = 3000

server.listen(port, hostname, () => {
	console.info(`Server running at http://${hostname}:${port}/`)
})

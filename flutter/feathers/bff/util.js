// extract url for image
// eg input: https://image-service.onefootball.com/resize?fit=max&image=https%3A%2F%2Fwp-images.onefootball.com%2Fwp-content%2Fuploads%2Fsites%2F10%2F2023%2F03%2FFBL-EUR-C1-BAYERN-MUNICH-PSG-1678313515.jpg&q=25&w=1080
// output: https://wp-images.onefootball.com/wp-content/uploads/sites/10/2023/03/FBL-EUR-C1-BAYERN-MUNICH-PSG-1678313515.jpg
function extractImageUrl(article) {
	const url = article.images.thumb
	const urlObject = new URL(url)
	return urlObject.searchParams.get('image')
}

// function to map article data
function mapArticle(article) {
	return {
		id: article.id,
		title: article.title,
		creatorId: article.related_entities.provider.id.toString(),
		imageUrl: extractImageUrl(article),
		time: article.publish_time,
	}
}

// function to generate random number between 50K and 10M
function getRandomInt() {
	return Math.floor(Math.random() * (10000000 - 50000 + 1)) + 50000
}

module.exports = {
	extractImageUrl,
	mapArticle,
	getRandomInt,
}

const creatorsImagine = [
	{
		creatorId: '3',
		lang: 'en',
		creatorName: 'Nike',
		creatorImageUrl:
			'https://www.pixelstalk.net/wp-content/uploads/2015/12/nike-logo-wallpapers-white-black.jpg',
		followerCount: getRandomInt(),
	},
	{
		creatorId: '4',
		lang: 'en',
		creatorName: 'Megan Rapinoe',
		creatorImageUrl:
			'https://anthemtalentagency.com/wp-content/uploads/2021/01/megan-rapinoe-gettyimages-1151712207a-1562679273-scaled.jpg',
		followerCount: getRandomInt(),
	},
	{
		creatorId: '5',
		lang: 'en',
		creatorName: 'EA Sports',
		creatorImageUrl:
			'https://underthewheels.com/wp-content/uploads/2021/02/cut.jpg',
		followerCount: getRandomInt(),
	},
	{
		creatorId: '6',
		lang: 'en',
		creatorName: 'Raquel Benetti',
		creatorImageUrl:
			'https://i.pinimg.com/236x/39/f3/4b/39f34b8c8d3d8d5de201bc4f5ee5ace3.jpg?nii=t',
		followerCount: getRandomInt(),
	},
	{
		creatorId: '7',
		lang: 'en',
		creatorName: 'Daniel Got Hits',
		creatorImageUrl:
			'https://i.scdn.co/image/c067c8ea80358e26557b1e8950a5412f801e7206',
		followerCount: getRandomInt(),
	},
	{
		creatorId: '1',
		lang: 'en',
		creatorName: 'Holding Midfield',
		creatorImageUrl:
			'https://www.holdingmidfield.com/wp-content/uploads/2017/07/bolosymbolsmaller.png',
		followerCount: getRandomInt(),
	},
	{
		creatorId: '2',
		lang: 'en',
		creatorName: 'Christiano Ronaldo',
		creatorImageUrl:
			'https://www.kreiszeitung.de/bilder/2018/07/10/10022795/1197292765-cristiano-ronaldo-real-madrid.jpg',
		followerCount: getRandomInt(),
	},
	{
		creatorId: '8',
		lang: 'en',
		creatorName: 'Lisa Freestyle',
		creatorImageUrl:
			'https://www.radar.st/wp-content/uploads/2017/08/Lisa-Zimouche-football-freestyle-championne-RADARcoverarticleBase72dpi.jpg',
		followerCount: getRandomInt(),
	},
	{
		creatorId: '9',
		lang: 'en',
		creatorName: 'Ted Lasso',
		creatorImageUrl:
			'https://image.tmdb.org/t/p/original/yaL2uLTaYhMB2LFNmqh3Qg0c4dZ.jpg',
		followerCount: getRandomInt(),
	},
]

// function to generate random number between 50K and 10M
function getRandomInt() {
	return Math.floor(Math.random() * (10000000 - 50000 + 1)) + 50000
}

module.exports = {
	creatorsImagine,
}

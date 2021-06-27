/** @format */

const superHeros = [
	{name: 'Hero 1', powers: ['ray', 'fly']},
	{name: 'Hero 2', powers: ['fire', 'fly']},
	{name: 'Hero 3', powers: ['water']},
	{name: 'Hero 4', powers: ['speed', 'fly']},
	{name: 'Hero 5', powers: ['strength']},
]

export function getFlying() {
	return superHeros.filter((hero) => hero.powers.includes('fly'))
}

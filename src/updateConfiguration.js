import { isArray } from '../utils/isArray.js'
import { formatKey } from '../utils/formatKey.js'
import { formatValues } from '../utils/formatValues.js'

// On reçoit un tableau contenant les mises à jour à effectué et un objet contenant la configuration
// On sépare le chemin de la clef et sa valeur.

function updateConfiguration(changes, configuration) {
	let key = changes.shift()
	let values = formatValues(changes)
	key = formatKey(key)
	parseProperties(key, values, configuration)
}

// On compare le chemin de la clef aux propriétés de l'objet configuration, on vérifie l'existence
// de chaque membre du chemin en le comparant aux propriétés du l'objet.

function parseProperties(key, value, configuration) {
	if (key.length === 1) {
		updatePropertyValue(key, value, configuration)
	} else if (isArray(key)) {
		let index = key[0].indexOf('[')
		let number = parseInt(key[0][index + 1])
		let property = key[0].substring(0, index)
		key.shift()
		parseProperties(key, value, configuration[property][number])
	} else if (configuration.hasOwnProperty(key[0])) {
		let property = key.shift()
		parseProperties(key, value, configuration[property])
	} else {
		throw new Error('Failed update')
	}
}

// On vérifie si la propiété est un tableau ou non et on assigne la nouvelle valeur à la clef

function updatePropertyValue (key, value, configuration) {
	if (isArray(key)) {
		let index = key[0].indexOf('[')
		let property = key[0].substring(0, index)
		let number = parseInt(key[0][index + 1])
		configuration[property].splice(number, 0, value)
	} else if (configuration[key]) {
		configuration[key] = value
	} else {
		throw new Error('Failed update')
	}
}

export { updateConfiguration }

// On vérifie si le tableau 'values' contient plusieurs élément, si oui on crée un seul élément que l'on transforme par la suite en objet, si non on crée une string

function formatValues(values) {
	let length = values.length

	if (length > 1) {
		values = values.map((value, index) => {
			if (index !== length - 1) value = value + ':'
			return value
		})
		values = values.join('')
		values = JSON.parse(values)
	} else {
		values[0] = values[0].replace(/\"/g, '')
		values[0] = values[0].trim()
		values = values.join('')
	}
	return values
}

export { formatValues }

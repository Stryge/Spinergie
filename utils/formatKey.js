// On transforme une string contenant le chemin de la clef à mettre à jour en tableau

function formatKey(key) {
	key = key.replace(/\"/g, '')
	key = key.split('.')
	return key
}

export { formatKey }

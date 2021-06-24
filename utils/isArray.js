// On cherche dans une string des bracket, cela permet de savoir s'il s'agit d'un tableau

function isArray(key) {
	if (key[0].includes('[')) return true
	return false
}

export { isArray }

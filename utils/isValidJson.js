async function isValidJson (data) {
	try {
		const jsonObject = JSON.parse(data)
		return jsonObject
	} catch(err) {
		throw new Error('Is not a valid JSON')
	}
}

export { isValidJson }

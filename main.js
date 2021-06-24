'use strict'

import path from 'path'
import { promises as fs } from 'fs'
import { updateConfiguration } from "./src/updateConfiguration.js"
import { isValidJson } from "./utils/isValidJson.js"

// On récupère les inputs
const argv = process.argv
const confFilePathname = process.argv[2]
const changesFilePathname = process.argv[3]

// On regarde si il y a bien deux inputs, si ce sont des fichiers et si le premiers input est un fichier avec une extension '.json'
if (argv.length < 4) throw new Error('Need 2 arguments')
await fs.lstat(confFilePathname).catch((err) => { throw new Error('Arguments must be files') })
await fs.lstat(changesFilePathname).catch((err) => { throw new Error('Arguments must be files') })
if (path.extname(confFilePathname) !== '.json') throw new Error('First argument must be a JSON file')

// On lit les fichiers
const configuration = await fs.readFile(confFilePathname, 'utf8').catch((err) => { throw new Error('Error when reading file') })
let changes = await fs.readFile(changesFilePathname, 'utf8').catch((err) => { throw new Error('Error when reading the file') })

// On vérifier que le fichier de configuration et un JSON valide
let json = await isValidJson(configuration)

// Tableaux servant à stocker les mises jours réussi ou non
let success = []
let fails = []

// On transforme 'changes' en tableau pour pouvoir travailler dessus en utilisant des method native à ce type
changes = changes.trim()
changes = changes.split('\n')
changes = changes.map((change) => {
	try {
		let keyValue = change.split(/:/)
		let result = updateConfiguration(keyValue, json)
		success.push(change)
		return result
	} catch (err) {
		fails.push(change)
	}
})

// On affiche le résultat
success.map(entrie => {
	console.log(`Success: ${entrie}`)
})
fails.map(entrie => {
	console.log(`Fail: ${entrie}`)
})

console.log(`Total success: ${success.length}\nTotal fails: ${fails.length}\nModified file: ${JSON.stringify(json)} `)

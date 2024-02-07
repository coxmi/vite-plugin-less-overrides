import glob from 'fast-glob'
import path from 'node:path'

export default function less(paths) {

	const files = glob.sync([paths].flat())
	let filesAbsolute
	let importCode

	const matchLess = /\.less$/i

	return {
		name: 'less-variables',
		enforce: 'pre',
		config(config) {
			const root = config.root || process.cwd()
			filesAbsolute = files.map(file => path.resolve(root, file))
			
			// import as reference only, so it only includes referenced 
			// variables rather than the entire stylesheet
			importCode = filesAbsolute.map(file => `@import (reference) "${file}";`).join('\n')
		},

		async transform(code, id, options) {
			if (!matchLess.test(id)) return

			// add the code to the end of the file (less variables use the cascade)
			return code + '\n\n' + (importCode || '')
		},

		configureServer(server) {
			const { ws, watcher } = server

			// listen to changes in input files 
			// and restart server when updated
	    	watcher.add(filesAbsolute)
	    	watcher.on('change', path => {
	    		if (!matchLess.test(path)) return
	    		if (!filesAbsolute.includes(path)) return
	    		server.restart()
	    	})
		},
	}
}
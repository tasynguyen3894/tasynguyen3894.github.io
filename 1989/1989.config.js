exports.config = {
	release: {
		path: 'dist', // release html folder
		assets: 'public' // release js and css folder
	},
	src: {
		path: 'src',
		html: {
			use: true,
			src: 'html',
			page: 'page',
			template: 'main.html'
		},
		sass: {
			use: true,
			src: 'sass',
			release: 'css'
		},
		typescript: {
			use:  false,
			src: 'ts',
			release: 'js'
		},
		data: {
			use:  true,
			src: 'data',
			release: 'data' 
		}
	},
	browserSync: {
		use: true
	},
	deploy: {
		use: true,
		branch: 'master'
	},
	prefix: '1989'
}
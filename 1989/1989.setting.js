const {config} = require('./1989.config');

var configForRun = {
	browserSync: {
		path: config.release.path,
		use: config.browserSync.use
	},
	htmlTemplate: {
		use: config.src.html.use,
		srcFolder: config.src.path + '/' + config.src.html.src + '/' + config.src.html.page,
		template: config.src.path + '/' + config.src.html.src + '/template/' + config.src.html.template,
		page: config.src.path + '/' + config.src.html.src + '/' + config.src.html.page + '/*.html',
		srcNoUse: config.src.path + '/' + config.src.html.src + '/' + config.src.html.page + '/*.html',
		release: config.release.path
	},
    sass: {
		use: config.src.sass.use,
		srcFolder: config.src.path + '/' + config.src.sass.src,
		src: config.src.path + '/' + config.src.sass.src + '/*.scss',
		srcNoUse: config.src.path + '/' + config.src.sass.src + '/*.css',
		release: config.release.path + '/' + config.release.assets + '/' + config.src.sass.release
	},
    typescript: {
		use: config.src.typescript.use,
		srcFolder: config.src.path + '/' + config.src.typescript.src,
		src: config.src.path + '/' + config.src.typescript.src + '/*.ts',
		srcNoUse: config.src.path + '/' + config.src.typescript.src + '/*.js',
		release: config.release.path + '/' + config.release.assets + '/' + config.src.typescript.release
	},
	data: {
		use: config.src.data.use,
		srcFolder: config.src.path + '/' + config.src.data.src,
		src: config.src.path + '/' + config.src.data.src + '/*.json',
		release: config.release.path + '/' + config.src.data.release
	},
	deploy: {
		use: config.deploy.use,
		branch: config.deploy.branch,
		release: config.release.path + '/**/*'
	},
	cmd: {
		browserSync: config.prefix + '_browser-sync',
		htmlTemplate: config.prefix + '_gulp-template-html',
		sass: config.prefix + '_sass',
		typescript: config.prefix + '_typescript',
		data: config.prefix + '_data',
		deploy: config.prefix + '_deploy',
		lib: config.prefix + '_lib',
		image: config.prefix + '_image',
		No_browserSync: 'no_' + config.prefix + '_browser-sync',
		No_htmlTemplate: 'no_' + config.prefix + '_gulp-template-html',
		No_sass: 'no_' + config.prefix + '_sass',
		No_typescript: 'no_' + config.prefix + '_typescript',
	}
}

exports.conf = configForRun;
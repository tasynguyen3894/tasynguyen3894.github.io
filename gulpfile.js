var gulp = require('gulp');
var { conf, ignore } = require('./1989/1989.setting');
var listWatch = [];

if(conf.browserSync.use) {
	var browserSync = require('browser-sync').create();
	gulp.task(conf.cmd.browserSync, function () {
		browserSync.init({
			server: {
				baseDir: './' + conf.browserSync.path + '/' 
			}
		});
	});
	listWatch.push(conf.cmd.browserSync);
}

if(conf.htmlTemplate.use) {
	var template = require('gulp-template-html');
	gulp.task(conf.cmd.htmlTemplate, function () {
		return gulp.src(conf.htmlTemplate.page)
				.pipe(template(conf.htmlTemplate.template))
				.pipe(gulp.dest(conf.htmlTemplate.release));
	}); 
} else {
	gulp.task(conf.cmd.No_htmlTemplate, function () {
        gulp.src(conf.htmlTemplate.srcNoUse, { base: conf.htmlTemplate.srcFolder })
        	.pipe(gulp.dest(conf.htmlTemplate.release))
    });
}

if(!ignore.css) {
	if(conf.sass.use) {
		var sass = require('gulp-sass');
		gulp.task(conf.cmd.sass, function () {
			return gulp.src(conf.sass.src)
						.pipe(sass({errLogToConsole: true}).on("error", sass.logError))
						.pipe(gulp.dest(conf.sass.release));
		});
	} else {
		gulp.task(conf.cmd.No_sass, function () {
			gulp.src(conf.sass.srcNoUse, { base: conf.sass.srcFolder })
				.pipe(gulp.dest(conf.sass.release))
		});
	}
}

if(!ignore.js) {
	if(conf.typescript.use) {
		var ts = require('gulp-typescript');
		gulp.task(conf.cmd.typescript, function () {
			return gulp.src(conf.typescript.src)
				.pipe(ts({
					noImplicitAny: true
				}))
				.pipe(gulp.dest(conf.typescript.release));
		});
	} else {
		gulp.task(conf.cmd.No_typescript, function () {
			gulp.src(conf.typescript.srcNoUse, { base: conf.typescript.srcFolder })
				.pipe(gulp.dest(conf.typescript.release))
		});
	}
}

if(conf.data.use) {
	gulp.task(conf.cmd.data, function () {
        gulp.src(conf.data.src, { base: conf.data.srcFolder })
        	.pipe(gulp.dest(conf.data.release))
    });
}

if(conf.deploy.use) {
	const ghPages = require('gulp-gh-pages');
	gulp.task(conf.cmd.deploy, function () {
		return gulp.src(conf.deploy.release)
				.pipe(ghPages({
					branch: conf.deploy.branch
				}));
	});
}

gulp.task('watch', listWatch, function () {
	if(!ignore.css) {
		if(conf.sass.use) {
			gulp.watch([conf.sass.src], [conf.cmd.sass]);
		} else {
			gulp.watch([conf.sass.srcNoUse], [conf.cmd.No_sass]);
		}
	}
    if(!ignore.js) {
		if(conf.typescript.use) {
			gulp.watch([conf.typescript.src], [conf.cmd.typescript]);
		} else {
			gulp.watch([conf.typescript.srcNoUse], [conf.cmd.No_typescript]);
		}
	}
	if(conf.data.use) {
		gulp.watch([conf.data.src], [conf.cmd.data]);
	}
	if(conf.htmlTemplate.use) {
		gulp.watch([conf.htmlTemplate.page, conf.htmlTemplate.template], [conf.cmd.htmlTemplate]);
	} else {
		gulp.watch([conf.htmlTemplate.srcNoUse], [conf.cmd.No_htmlTemplate]);
	}
	if(conf.browserSync.use) {
		gulp.watch([conf.browserSync.path + '/**/*.*', conf.browserSync.path + '/*.*',]).on('change', browserSync.reload );
	}
});

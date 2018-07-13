const gulp = require('gulp');
const browser_sync = require('browser-sync');
const template_html = require('gulp-template-html');
const ghPages = require('gulp-gh-pages');

gulp.task('browser-sync', function () {
    browser_sync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('template-html-build', function () {
    return gulp.src(['./src/html/pages/*.html', './src/html/pages/pages/*.html'])
        .pipe(template_html('./src/html/template/main.html'))
        .pipe(gulp.dest('dist'));
});

gulp.task('assets-build', function () {
    gulp.src('./src/public/**/*', { base: 'src/public' })
        .pipe(gulp.dest('./dist/public'))
});

gulp.task('homepage-build', function () {
    gulp.src('./src/html/*.html', { base: 'src/html' })
        .pipe(gulp.dest('./dist'))
});

gulp.task('deploy', function () {
    return gulp.src('./dist/**/*')
            .pipe(ghPages({
                branch: 'master'
            }));
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(['src/html/*.html'], ['homepage-build']);
    gulp.watch(['src/html/pages/*.html', 'src/html/template/*.html'], ['template-html-build']);
    gulp.watch(['src/public/**/*'], ['assets-build']);
    gulp.watch(['dist/*.html', 'dist/**/*.html', 'dist/public/**/*.css', 'dist/public/**/*.js' ] ).on( 'change' , browser_sync.reload );
});

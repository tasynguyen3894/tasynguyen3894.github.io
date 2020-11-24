const { src, dest, watch, series, parallel, lastRun } = require('gulp');
const del = require('del');
var twig = require('gulp-twig');
var sass = require('gulp-sass');
var tap = require('gulp-tap');
const path = require('path');
const fs = require('fs');
const ghPages = require('gulp-gh-pages')
const browserSync = require('browser-sync').create()
const showdown  = require('showdown');
const converter = new showdown.Converter();
const buildIgnore = require("./buildignore");

const buildDir = `build`;
const sourceDir = `src`;
const assetsDir = `assets`;
const deployBranch = `master`;

const convert = path => {
	const isExtendedLengthPath = /^\\\\\?\\/.test(path);
	const hasNonAscii = /[^\u0000-\u0080]+/.test(path); // eslint-disable-line no-control-regex

	if (isExtendedLengthPath || hasNonAscii) {
		return path;
	}

	return path.replace(/\\/g, '/');
};

let twigPageCompile = function () {
    pages = [];
    return src([convert(`./${sourceDir}/pages/**/*.twig`)])
            .pipe(tap(filterDataTwig))
}

let sassAssetComplile = function () {
    return src([ convert(`./${sourceDir}/${assetsDir}/scss/**/*.scss`)])
            .pipe(sass().on('error', sass.logError))
            .pipe(dest(convert(`./${buildDir}/${assetsDir}/css/`)));
} 

let jsAssetCopy = function () {
    return src([convert(`./${sourceDir}/${assetsDir}/js/**/*.js`)])
            .pipe(dest(convert(`./${buildDir}/${assetsDir}/js/`)))
}

let fileAssetCopy = function () {
    return src([convert(`./${sourceDir}/${assetsDir}/files/**/*`)])
            .pipe(dest(convert(`./${buildDir}/${assetsDir}/files/`)))
}

let filterDataTwig = function (file, t) {
    let fileName = convert('./' + file.relative)
    fileName = fileName.split("/");
    fileName.pop();
    fileName = fileName.join("/")
    let fileDataPath = convert(`./${sourceDir}/pages/`) + file.relative.replace(/.twig([^.twig]*)$/, ".js" + '$1')
    let init = {
        base: convert(`./${sourceDir}`)
    }
    
    if(fs.existsSync(fileDataPath)) {
        init = Object.assign(init, requireUncached(fileDataPath))
    }
    return src(file.path).pipe(twig(init)).pipe(dest(convert(`./${buildDir}/` + fileName)));
}

function watchFile() {
    browserSync.init({
        server: {
            baseDir: `./${buildDir}/`
        },
        port: 3300
    })
    watch([`./${buildDir}/**/*`]).on("change", browserSync.reload)
    watch([`./${sourceDir}/til/*.md`], tilBuild)
    watch([`./${sourceDir}/pages/**/*.twig`, `./${sourceDir}/**/*.html`, `./${sourceDir}/pages/**/*.js`], twigPageCompile)
    watch([`./${sourceDir}/${assetsDir}/scss/**/*.scss`], sassAssetComplile)
    watch([`./${sourceDir}/${assetsDir}/js/**/*.js`], jsAssetCopy)
}

function deployGhPages() {
    return src(convert(`./${buildDir}/**/*`))
            .pipe(ghPages({
                branch: deployBranch
            }))
}

let tilBuild = function () {
    const tilMd = fs.readFileSync(`./${sourceDir}/til/til.md`, 
            {encoding:'utf8', flag:'r'}); 
    html = converter.makeHtml(tilMd);
    return src(convert(`./${sourceDir}/til/*.twig`))
        .pipe(twig({
            base: convert(`./${sourceDir}`),
            data: {
                content: html
            }
        }))
        .pipe(dest(convert(`./${buildDir}/til`)));
}

function clearTmp() {
    let delList = [`${buildDir}/**/*`];
    buildIgnore.forEach(element => {
        delList.push(`!${buildDir}/${element}`)
    });
    return del(delList)
}

function requireUncached(module){
    delete require.cache[require.resolve(module)]
    return require(module)
}

const compile = parallel(
    twigPageCompile, 
    sassAssetComplile, 
    jsAssetCopy, 
    fileAssetCopy,
    tilBuild
)

exports.watch = series(clearTmp, compile, watchFile)
exports.build = series(clearTmp, compile)
exports.deploy = series(deployGhPages)
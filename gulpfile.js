const { src, dest, watch, series, parallel, lastRun } = require('gulp');
const del = require('del');
var twig = require('gulp-twig')
var sass = require('gulp-sass');
var tap = require('gulp-tap')
const path = require('path')
const fs = require('fs')
const ghPages = require('gulp-gh-pages')
const browserSync = require('browser-sync').create()
const buildIgnore = require("./buildignore")

const buildDir = `build`;
const sourceDir = `src`;
const assetsDir = `assets`;
const deployBranch = `master`;


let twigPageCompile = function () {
    pages = [];
    return src([`./${sourceDir}/pages/**/*.twig`])
            .pipe(tap(filterDataTwig))
}

let sassAssetComplile = function () {
    return src([ `./${sourceDir}/${assetsDir}/scss/**/*.scss`])
            .pipe(sass().on('error', sass.logError))
            .pipe(dest(`./${buildDir}/${assetsDir}/css/`));
} 

let jsAssetCopy = function () {
    return src([`./${sourceDir}/${assetsDir}/js/**/*.js`])
            .pipe(dest(`./${buildDir}/${assetsDir}/js/`))
}

let fileAssetCopy = function () {
    return src([`./${sourceDir}/${assetsDir}/files/**/*`])
            .pipe(dest(`./${buildDir}/${assetsDir}/files/`))
}

let filterDataTwig = function (file, t) {
    let fileName = file.relative;
    fileName = fileName.split("/");
    fileName.pop();
    fileName = fileName.join("/")
    let fileDataPath = `./${sourceDir}/pages/` + file.relative.replace(/.twig([^.twig]*)$/, ".js" + '$1')
    let init = {
        base: `./${sourceDir}`
    }
    
    if(fs.existsSync(fileDataPath)) {
        init = Object.assign(init, requireUncached(fileDataPath))
    }
    return src(file.path).pipe(twig(init)).pipe(dest(`./${buildDir}/` + fileName));
}

function watchFile() {
    browserSync.init({
        server: {
            baseDir: `./${buildDir}/`
        }
    })
    watch([`./${buildDir}/**/*`]).on("change", browserSync.reload)
    watch([`./${sourceDir}/pages/**/*.twig`, `./${sourceDir}/**/*.html`, `./${sourceDir}/pages/**/*.js`], twigPageCompile)
    watch([`./${sourceDir}/${assetsDir}/scss/**/*.scss`], sassAssetComplile)
    watch([`./${sourceDir}/${assetsDir}/js/**/*.js`], jsAssetCopy)
}

function deployGhPages() {
    return src(`./${buildDir}/**/*`)
            .pipe(ghPages({
                branch: deployBranch
            }))
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
    fileAssetCopy
)

exports.watch = series(clearTmp, compile, watchFile)
exports.build = series(clearTmp, compile)
exports.deploy = series(deployGhPages)

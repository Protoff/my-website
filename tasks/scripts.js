const { src, dest, task } = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const rigger = require('gulp-rigger')
const rename = require('gulp-rename')
const browserSync = require('browser-sync')
const debug = require("gulp-debug")

task('javascript', () => {
  return src('src/**/*.js')
    //.pipe(rigger())
    // .pipe(babel({
    //   presets: ['@babel/env']
    // }))
    // .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('dist/scripts/'))
    .pipe(browserSync.stream())
    .pipe(debug({
        "title": "Javascript"
    }))
})

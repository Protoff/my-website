const { series, parallel, src, dest, watch } = require('gulp');
const pug = require('gulp-pug');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const image = require('gulp-image');
const concat = require('gulp-concat')
const rigger = require('gulp-rigger')
const webp = require('gulp-webp')
const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')
const svg = require('gulp-svg-sprite')

function deleteImages() {
  return del(['dist/img'])
}
function imgcompress() {
  return src('./src/imgOrig/**/*.{jpg,png}')
    .pipe(image())
    .pipe(dest('./dist/img/'));
}

function imageWebp() {
  return src('./src/imgOrig/**/*.{jpg,png}')
    .pipe(webp(imageminWebp({
      lossless: false,
      quality: 50,
      alphaQuality: 100
  })))
    .pipe(dest('dist/img'))
}

function svgSprites() {
  return src('./src/imgOrig/**/*.svg')
    .pipe(svg({
      shape: {
        dest: "intermediate-svg"
      },
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(dest('dist/img/svg'))
}

function deleteDist() {
  return del(['dist/css', 'dist/js', 'dist/*.html'])
}

function html() {
  return src('./src/**/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function fonts() {
  return src(['./src/fonts/*.ttf', './src/fonts/*.woff2'])
    .pipe(dest('dist/fonts'))
    .pipe(browserSync.stream());
}

function css() {
  return src('./src/style.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 5 versions', '> 1%'], { cascade: true }))
    .pipe(gcmq())
    .pipe(dest('dist/css/'))
    .pipe(cleanCSS())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('dist/css/'))
    .pipe(browserSync.stream());
}

function javascript() {
    return src('src/**/*.js')
    .pipe(rigger())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('dist/js/'))
    .pipe(browserSync.stream());
}

exports.build = series(deleteDist, parallel(fonts, css, javascript, html));
exports.images = series(deleteImages, parallel(imgcompress, imageWebp, svgSprites));
exports.fonts = series(fonts);

exports.default = function () {
  exports.build();
  browserSync.init({
    server: "./dist"
  });
  watch('src/**/*.sass', css);
  watch('src/**/*.js', javascript);
  watch('src/**/*.pug', html);
  watch('src/fonts/*.*', fonts);
};

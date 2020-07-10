const { series, parallel, src, dest, watch, task } = require('gulp')
const debug = require("gulp-debug")

task('fonts', () => {
  return src(['./src/fonts/*.ttf', './src/fonts/*.woff2'])
    .pipe(dest('dist/fonts'))
    .pipe(debug({
        "title": "Fonts"
    }))
})

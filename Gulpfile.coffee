watchify = require('watchify')
browserify = require('browserify')
gulp = require('gulp')
notify = require('gulp-notify')
sourcemaps = require('gulp-sourcemaps')
uglify = require('gulp-uglify')
less = require("gulp-less")
gutil = require('gulp-util')
livereload = require('gulp-livereload')
autoprefixer = require('gulp-autoprefixer')
buffer = require('vinyl-buffer')
source = require('vinyl-source-stream')

extend = require("extend")

mainBundle = browserify
  entries: 'src/main.coffee'
  extensions: ['.coffee', '.cjsx']
  plugin: ["livereactload"]
  transform: ["coffee-reactify", "babelify"]

bundle = ->
  mainBundle.bundle()
  .on 'error', gutil.log
  .on 'error', notify.onError("Error: <%= error.message %>")
  .pipe source('main.js')
  .pipe buffer()
  .pipe sourcemaps.init(loadMaps: true)
  .pipe sourcemaps.write('.')
  .pipe gulp.dest('build')

gulp.task 'js', bundle

gulp.task "html", ->
  gulp
  .src('src/**/*.html')
  .pipe(gulp.dest('build'))

gulp.task 'less', ->
  gulp.src('src/main.less')
  .pipe sourcemaps.init()
  .pipe less paths: 'node_modules'
  .on 'error', gutil.log
  .on 'error', notify.onError("Error: <%= error.message %>")
  .pipe autoprefixer()
  .pipe sourcemaps.write('.')
  .pipe gulp.dest('build')

gulp.task 'fonts', ->
  gulp.src(['node_modules/font-awesome/fonts/fontawesome-webfont.*'])
  .pipe gulp.dest('build/fonts')

gulp.task 'build', ['fonts', 'js', 'less', 'html']

gulp.task 'watch', ["build"], ->
  bundle()
  watchify(mainBundle)
  .on 'log', gutil.log
  .on 'update', bundle
  .on 'error', gutil.log

  gulp.watch 'build/**/*.css', livereload.changed
  gulp.watch 'src/**/*.less', ['less']
  gulp.watch 'src/**/*.html', ['html']

  livereload.listen()

gulp.task 'default', ['build', 'watch']

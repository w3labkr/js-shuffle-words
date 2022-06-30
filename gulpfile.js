const gulp = require('gulp');
const { src, dest, watch, series, parallel } = require('gulp');

const del = require('del');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const mergeStream = require('merge-stream');

const fileinclude = require('gulp-file-include');
const beautify = require('gulp-jsbeautifier');
const imagemin = require('gulp-imagemin');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function clean() {
  return del(['dist/']);
}

function htmlTranspile() {
  return src(['src/index.html'])
    .pipe(fileinclude({ prefix: '@@', basepath: '@file' }))
    .pipe(beautify())
    .pipe(dest('dist'));
}

function imageTranspile() {
  return src(['src/assets/images/**/*']).pipe(imagemin()).pipe(dest('dist/assets/images'));
}

function cssTranspile() {
  return src('src/assets/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/css'));
}

function cssMinify() {
  return src('src/assets/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/css'));
}

function jsBundle() {
  return src('src/assets/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/js'));
}

function jsMinify() {
  return src('src/assets/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/js'));
}

function publish() {
  return mergeStream(src(['src/vendor/**/*']).pipe(dest('dist/vendor')));
}

exports.watch = function () {
  watch('src/**/*.html', htmlTranspile);
  watch('src/assets/images/**/*', imageTranspile);
  watch('src/assets/css/**/*.css', cssMinify);
  watch('src/assets/js/**/*.js', jsMinify);
};

exports.build = series(
  clean,
  parallel(htmlTranspile, imageTranspile, cssTranspile, jsBundle),
  parallel(cssMinify, jsMinify),
  publish
);

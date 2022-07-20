const gulp = require('gulp');
const { src, dest, watch, series, parallel } = require('gulp');

const fs = require('fs');
const del = require('del');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const header = require('gulp-header');
const sourcemaps = require('gulp-sourcemaps');
const mergeStream = require('merge-stream');
const conventionalChangelog = require('gulp-conventional-changelog');
const bump = require('gulp-bump');

const fileinclude = require('gulp-file-include');
const beautify = require('gulp-jsbeautifier');
const imagemin = require('gulp-imagemin');

const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function version() {
  return src('./package.json')
    .pipe(bump({ type: 'minor' })) // major, minor, patch
    .pipe(dest('./'));
}

function banner(pkg) {
  return [
    '/*!',
    ' * Copyright (c) <%= new Date().getFullYear() %> <%= pkg.author %>',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    '',
  ].join('\n');
}

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

function sassTranspile() {
  const pkg = JSON.parse(fs.readFileSync('./package.json'));

  return src('src/assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(header(banner(pkg), { pkg: pkg }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/css'));
}

function sassMinify() {
  const pkg = JSON.parse(fs.readFileSync('./package.json'));

  return src('src/assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner(pkg), { pkg: pkg }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/css'));
}

function jsTranspile() {
  const pkg = JSON.parse(fs.readFileSync('./package.json'));

  return src('src/assets/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(header(banner(pkg), { pkg: pkg }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/js'));
}

function jsMinify() {
  const pkg = JSON.parse(fs.readFileSync('./package.json'));

  return src('src/assets/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner(pkg), { pkg: pkg }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/js'));
}

function publish() {
  return mergeStream(
    src(['src/vendor/**/*']).pipe(dest('dist/vendor')),
    src('CHANGELOG.md')
      .pipe(conventionalChangelog({ preset: 'conventionalcommits', releaseCount: 0 }))
      .pipe(dest('./'))
  );
}

exports.watch = function () {
  watch('src/**/*.html', htmlTranspile);
  watch('src/assets/images/**/*', imageTranspile);
  watch('src/assets/sass/**/*.scss', sassMinify);
  watch('src/assets/js/**/*.js', jsMinify);
};

exports.build = series(
  series(clean, version),
  parallel(htmlTranspile, imageTranspile, sassTranspile, jsTranspile),
  parallel(sassMinify, jsMinify),
  publish
);

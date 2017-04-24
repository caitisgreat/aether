var gulp = require('gulp');
var pug = require('gulp-pug');

gulp.task('server', function() {
  return gulp.src('bin/server.js')
    .pipe(gulp.dest('dist/'));
});

gulp.task('client', function() {
  return gulp.src('bin/client.js')
    .pipe(gulp.dest('dist/client/assets'));
});

gulp.task('html', function() {
  return gulp.src('src/client/templates/*.pug')
    //.pipe(pug())
    .pipe(gulp.dest('dist/client/templates'));
});

gulp.task('assets', function () {
  return gulp.src('src/client/assets/*')
    .pipe(gulp.dest('dist/client/assets'));
});

gulp.task('package', function() {
  return gulp.src('package.json')
    .pipe(gulp.dest('dist/'));
});

gulp.task('readme', function() {
  return gulp.src('*.md')
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['server', 'client', 'html', 'assets', 'package', 'readme']);
gulp.task('dev', ['html', 'assets']);

var gulp = require('gulp');
var pug = require('gulp-pug');

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

gulp.task('default', ['html', 'assets', 'package', 'readme']);

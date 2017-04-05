var gulp = require('gulp');
var pug = require('gulp-pug');

gulp.task('server', function () {
  return gulp.src('bin/server.js')
    .pipe(gulp.dest('dist/'));
});

gulp.task('client', function () {
  return gulp.src('bin/client.js')
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('html', function(){
  return gulp.src('src/client/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('default', ['server','client','html']);

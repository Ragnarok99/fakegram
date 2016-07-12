var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
  gulp
  .src('index.scss')
  .pipe(sass())
  .pipe(gulp.dest('public'));
});

gulp.task('assets', function () {
  gulp
  .src('assets/*')
  .pipe(gulp.dest('public'));
})

gulp.task('default', ['styles', 'assets'])

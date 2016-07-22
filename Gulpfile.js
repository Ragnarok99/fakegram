var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

gulp.task('styles', function() {
  gulp
  .src('index.scss')
  .pipe(sass())
  .pipe(rename('app.css'))//renombrar el archivo
  .pipe(gulp.dest('public'));
});

gulp.task('assets', function () {
  gulp
  .src('assets/*')//pasar todo lo de assets a public
  .pipe(gulp.dest('public'));
});


function compile(watch) {
  var bundle = browserify('./src/index.js');//escucha el archivo
  if (watch) {
    bundle = watchify(bundle);
    bundle.on('update', function() {
      console.log('bundling...');
      rebundle();
    })
  }

  function rebundle() {
  bundle
    .transform(babel, {presets: ["es2015"], "plugins": ["syntax-async-functions", "transform-regenerator"]})//permite usar todo lo mas nuevo de es2015
    .bundle()
    .on('error', function(error) { console.log(error); this.emit('end')  })
    .pipe(source('index.js'))//trasnformar lo que devuelve el bundle a algo que entienda gulp
    .pipe(rename('app.js'))
    .pipe(gulp.dest('public'));
}

  rebundle();
}

gulp.task('build', function () {
  return compile();
})
gulp.task('watch', function () {
  return compile(true);
})
gulp.task('default', ['styles', 'assets', 'build'])

var gulp = require('gulp'),
 jade = require('gulp-jade'),
 uglify = require('gulp-uglify'),
 sass = require('gulp-sass'),
 webserver = require('gulp-webserver');

var env = process.env.NODE_ENV || 'dev';
var outputDir = 'build/dev';

gulp.task('jade', function() {
  return gulp.src('src/templates/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest(outputDir));
});

gulp.task('scripts', function() {
  return gulp.src('src/js/main.js')
    .pipe(uglify())
    .pipe(gulp.dest(outputDir + '/js'));
})

gulp.task('sass', function() {
  var config = {};

  if(env === 'dev') {
    config.sourceComments = 'map';
  }

  if(env === 'prod') {
    config.outputStyle = 'compressed';
  }

  return gulp.src('src/styles/main.scss')
    .pipe(sass(config))
    .pipe(gulp.dest(outputDir + '/styles'));
});

gulp.task('webserver', function() {
  gulp.src('build/dev')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: false
    }));
});

gulp.task('default', ['webserver','jade', 'scripts', 'sass']);
gulp.watch('src/templates/*.jade', ['jade']);
gulp.watch('src/styles/*.scss', ['sass']);
gulp.watch('src/js/*.js', ['scripts']);
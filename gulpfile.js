var gulp = require('gulp'),
 jade = require('gulp-jade'),
 uglify = require('gulp-uglify'),
 sass = require('gulp-sass'),
 webserver = require('gulp-webserver'),
 imagemin = require('gulp-imagemin');

var env = process.env.NODE_ENV || 'dev';
var outputDir = 'build/dev';

gulp.task('jade', function() {
  return gulp.src('src/templates/index.jade')
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

gulp.task('images', () =>
  gulp.src('src/styles/assets/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/dev/styles/assets'))
);

gulp.task('webserver', function() {
  gulp.src('build/dev')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: false,
      port: 3000
    }));
});

gulp.task('default', ['webserver','jade', 'scripts', 'sass', 'images']);
gulp.watch('src/templates/*.jade', ['jade']);
gulp.watch('src/styles/*.scss', ['sass']);
gulp.watch('src/js/*.js', ['scripts']);
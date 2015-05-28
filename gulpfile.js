/* jshint node:true */
'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var $ = require('gulp-load-plugins')();

var path = {
  scripts: {
    src: ['public/js/*.js'],
    dependenciesDest: 'public/js/dependencies',
    dest: 'public/js',
    import: [
      'node_modules/requirejs/require.js',
      'bower_components/snap.svg/dist/snap.svg.js'
    ]
  }
};

var watch_steps = [
  'import-script',
  'scripts',
];

/*************************************************/
/*                   Scripts
/*************************************************/

function copyScript(src, dest) {
  return gulp.src(src)
    .pipe($.sourcemaps.init())
    .pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(dest));
}

gulp.task('import-script', function() {
  return copyScript(path.scripts.import, path.scripts.dependenciesDest);
});

gulp.task('scripts', function() {
  console.log("*************************************");
  console.log("*              Scripts              *");
  console.log("*************************************\n");
  if (process.env.DBL_EDEX_ENV === 'production') {
    return gulp.src(path.scripts.src)
      .pipe($.sourcemaps.init())
      .pipe($.uglify())
      .pipe($.concat('application.min.js'))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(path.scripts.dest));
  } else {
    return gulp.src(path.scripts.src)
      .pipe(gulp.dest(path.scripts.dest));
  }
});


/*************************************************/
/*                   Clean
/*************************************************/

gulp.task('clean', function() {
  return gulp.src(path.scripts.dependenciesDest + '/*', {
      read: false
    })
    .pipe(clean({
      force: true
    }));
});

gulp.task('watch', watch_steps, function() {

  gulp.watch(path.scripts.src, ['scripts']);

  console.log("*************************************");
  console.log("*               Watch               *");
  console.log("*************************************\n");
});

gulp.task('default', function() {
  gulp.start('watch');
});

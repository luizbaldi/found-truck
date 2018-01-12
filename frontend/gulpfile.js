const gulp = require('gulp');
const useref = require('gulp-useref');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const runSequence = require('run-sequence');

gulp.task('useref', () => {
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('fonts', () => {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

gulp.task('images', () => {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img'))
})

gulp.task('templates', () => {
  return gulp.src('src/custom-templates/*.html')
    .pipe(gulp.dest('dist/custom-templates'))
})

gulp.task('views', () => {
  return gulp.src('src/views/*.html')
    .pipe(gulp.dest('dist/views'))
})

gulp.task('build', () => {
  runSequence('useref', 'fonts', 'templates', 'views', 'images');
})
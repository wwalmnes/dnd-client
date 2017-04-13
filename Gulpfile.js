const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

// Go through all scss files and compress them into app.css (public folder).
gulp.task('styles', () => {
    return gulp.src('./src/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('default', ['styles'], () => {
    gulp.watch('./src/**/*.scss', ['styles']);
});
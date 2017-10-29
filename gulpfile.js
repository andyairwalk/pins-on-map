'use strict';
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
 
gulp.task('scripts', function () {
	gulp.src('src/**/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
    gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
});


gulp.task('watch', function(){
	gulp.watch('src/**/*.js', ['scripts']);
	gulp.watch('src/**/*.scss', ['scss']);
});

gulp.task('default', ['sass', 'scripts']);
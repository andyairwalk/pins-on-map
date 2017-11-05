'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
 
gulp.task('scripts', function () {
	gulp.src('src/**/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist'));
});

// Convert all the scss files into css files and minimize them
gulp.task('sass', function() {
    return gulp.src("src/scss/**/*.scss")
        .pipe(concat('main.min.css'))
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest("dist/css"));
});

gulp.task('watch', function(){
	gulp.watch('src/**/*.js', ['scripts']);
	gulp.watch('src/**/*.scss', ['scss']);
});

gulp.task('default', ['sass', 'scripts']);




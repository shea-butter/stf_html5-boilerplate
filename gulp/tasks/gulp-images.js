'use strict';

// REQUIRED NODE PACKAGES
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');


// MINIFIES IMAGE FILES
gulp.task('images', () => { // 'images' task
	return gulp.src('src/media/images/**/*.+(png|jpg|gif|svg)') // Grabs image files in the 'src/media/images' directory
		.pipe(cache(imagemin({ interlaced: true }))) // Interlaces .gif files
		.pipe(gulp.dest('dist/media/images')) // Drops minified image files into the 'dist/media/images' directory
})

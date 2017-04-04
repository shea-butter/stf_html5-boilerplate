'use strict';

// REQUIRED NODE PACKAGES
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


// COMPILES STYLE SHEETS & RELOADS THE BROWSER ON SAVE
gulp.task('styles', () => { // 'styles' task
	return gulp.src('src/styles/scss/**/*.scss') // Grabs all .scss files in the 'styles' directory
		.pipe(sass.sync().on('error', sass.logError)) // Pipes files through sass compiler
		.pipe(gulp.dest('src/styles/css')) // Drops compiled .css files into the 'css' directory
		.pipe(browserSync.reload({ stream: true })); // Starts a web server to live-reload the browser on .scss file save
})

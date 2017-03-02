'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');

// COMPILES STYLE SHEETS & RELOADS THE BROWSER ON SAVE
gulp.task('styles', function () {
	return gulp.src('app/styles/scss/**/*.scss') // Gets all files ending with .scss in src dir
		.pipe(sass.sync().on('error', sass.logError)) // Pipes files through sass compiler
		.pipe(gulp.dest('app/styles/css')); // Puts compiled .css files into dest dir
		.pipe(browserSync.reload({	// Starts a web server to live-reload the browser on .scss file save
			stream: true
	}))
});

// STARTS A WEB SERVER FROM THE 'BASEDIR' DIRECTORY
gulp.task('web-server', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	})
})

// CONCATENATES CSS & JS FILES INTO A SINGLE FILE BY LOOKING FOR A COMMENT THAT STARTS WITH "<!--build:" & ENDS WITH "<!--endbuild-->" IN YOUR HTML
gulp.task('scripts', function() {
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulp.dest('dist'))
});

// 'WATCH' TASK WATCHES A CERTAIN DIR & RUNS WHEN FILES ARE SAVED
gulp.task('watch', ['web-server', 'styles'], function () {	// 'BrowserSync', then 'sass' tasks must be completed before 'watch' is allowed to run
	gulp.watch('app/styles/scss/**/*.scss', ['styles']);	// Dir & task to watch
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	// Other watchers
});



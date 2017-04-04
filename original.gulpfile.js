'use strict';

// REQUIRED NODE PACKAGES
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');
const requireDir = require('require-dir');
// const babel
// const autoprefixer
// const browserfy
// const bower

requireDir('./gulp/tasks');

// Development Tasks
// -----------------

// STARTS A WEB SERVER
gulp.task('serve', () => { // 'serve' task
	browserSync.init({ // Starts web server from the 'src' directory
		server: { baseDir: 'src' }
	})
})

// COMPILES STYLE SHEETS & RELOADS THE BROWSER ON SAVE
gulp.task('styles', () => { // 'styles' task
	return gulp.src('src/styles/scss/**/*.scss') // Grabs all .scss files in the 'styles' directory
		.pipe(sass.sync().on('error', sass.logError)) // Pipes files through sass compiler
		.pipe(gulp.dest('src/styles/css')) // Drops compiled .css files into the 'css' directory
		.pipe(browserSync.reload({ stream: true })); // Starts a web server to live-reload the browser on .scss file save
})

// WATCHES A CERTAIN DIRECTORY & RUNS WHEN FILES ARE SAVED
gulp.task('watch', ['serve', 'styles'], () => { // 'watch' task; 'serve' and 'styles' tasks must be completed before 'watch' is allowed to run
	gulp.watch('src/styles/scss/**/*.scss', ['styles']); // Directory & task to watch
	gulp.watch('src/*.html', browserSync.reload); // Reloads web server on .html file save
	gulp.watch('src/js/**/*.js', browserSync.reload); // Reloads web server on .js file save
	// Other watchers
})


// Optimization Tasks
// ------------------

// CONCATENATES CSS & JS FILES INTO A SINGLE FILE BY LOOKING FOR A COMMENT THAT STARTS WITH "<!--build:" & ENDS WITH "<!--endbuild-->" IN YOUR HTML
gulp.task('scripts', () => { // 'scripts' task
	return gulp.src('src/*.html') // Searches for the special comments in all .html files in the 'src' directory
		.pipe(useref()) // Concatenates the files listed in the special comments
		.pipe(gulpIf('*.js', uglify())) // Minifies the concatenated files if they are .js
		.pipe(gulpIf('*.css', cssnano())) // Minifies the concatenated files if they are .css
		.pipe(gulp.dest('dist')); // Drops minified .js & .css files into the 'dist' directory
})

// MINIFIES IMAGE FILES
gulp.task('images', () => { // 'images' task
	return gulp.src('src/media/images/**/*.+(png|jpg|gif|svg)') // Grabs image files in the 'src/media/images' directory
		.pipe(cache(imagemin({ interlaced: true }))) // Interlaces .gif files
		.pipe(gulp.dest('dist/media/images')) // Drops minified image files into the 'dist/media/images' directory
})

// MOVES FONT FILES
gulp.task('fonts', () => { // 'fonts' task
	return gulp.src('src/fonts/**/*') // Grabs font files in the 'src/fonts' directory
		.pipe(gulp.dest('dist/fonts')) // Drops font files into the 'dist/fonts' directory
})

// DELETES BUILD DIRECTORY
gulp.task('clean:dist', () => { // 'clean:dist' task
	return del.sync('dist'); // Deletes the 'dist' directory
})

// DELETES ALL CACHES
gulp.task('cache:clear', (callback) => { // 'cache:clear' task
	return cache.clearAll(callback) // Deletes all caches
})


// Build Sequences
// ---------------

// DEVELOPMENT TASK - RUN WHILE DEVELOPING YOUR APP OR WEBSITE
gulp.task('default', (callback) => {
	runSequence(['styles', 'serve', 'watch'],
		callback
	)
})

// OPTIMIZATION / BUILD TASK - RUN TO BUILD YOUR APP OR WEBSITE
gulp.task('build', (callback) => {
	runSequence('clean:dist', ['styles', 'scripts', 'images', 'fonts'],
		callback
	)
});

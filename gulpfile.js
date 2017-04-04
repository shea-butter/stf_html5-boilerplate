'use strict';

// REQUIRED NODE PACKAGES
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');
const requireDir = require('require-dir');
// const babel
// const autoprefixer
// const browserfy
// const bower
// const flow

requireDir('./gulp/tasks', { recurse: true });

// Development Tasks
// -----------------

// STARTS A WEB SERVER
gulp.task('serve', () => { // 'serve' task
	browserSync.init({ // Starts web server from the 'src' directory
		server: { baseDir: 'src' }
	})
})

// WATCHES A CERTAIN DIRECTORY & RUNS WHEN FILES ARE SAVED
gulp.task('watch', ['serve', 'styles'], () => { // 'watch' task; 'serve' and 'styles' tasks must be completed before 'watch' is allowed to run
	gulp.watch('src/styles/scss/**/*.scss', ['styles']); // Directory & task to watch
	gulp.watch('src/*.html', browserSync.reload); // Reloads web server on .html file save
	gulp.watch('src/js/**/*.js', browserSync.reload); // Reloads web server on .js file save
	// Other watchers
})

// DEVELOPMENT TASK - RUN WHILE DEVELOPING YOUR APP OR WEBSITE
gulp.task('default', (callback) => {
	runSequence(['styles', 'serve', 'watch'],
		callback
	)
})


// Build Sequence
// --------------

// OPTIMIZATION / BUILD TASK - RUN TO BUILD YOUR APP OR WEBSITE
gulp.task('build', (callback) => {
	runSequence('clean:dist', ['styles', 'scripts', 'images', 'fonts'],
		callback
	)
});

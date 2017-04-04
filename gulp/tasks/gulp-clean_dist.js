'use strict';

// REQUIRED NODE PACKAGES
const gulp = require('gulp');
const del = require('del');


// DELETES BUILD DIRECTORY
gulp.task('clean:dist', () => { // 'clean:dist' task
	return del.sync('dist'); // Deletes the 'dist' directory
})

'use strict';

// REQUIRED NODE PACKAGES
const gulp = require('gulp');
const cache = require('gulp-cache');


// DELETES ALL CACHES
gulp.task('clean:cache', (callback) => { // 'clean:cache' task
	return cache.clearAll(callback) // Deletes all caches
})

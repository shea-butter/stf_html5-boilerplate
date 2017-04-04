'use strict';

// REQUIRED NODE PACKAGES
const gulp = require('gulp');


// MOVES FONT FILES
gulp.task('fonts', () => { // 'fonts' task
	return gulp.src('src/fonts/**/*') // Grabs font files in the 'src/fonts' directory
		.pipe(gulp.dest('dist/fonts')) // Drops font files into the 'dist/fonts' directory
})

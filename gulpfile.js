var gulp = require('gulp');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var rename = require("gulp-rename");

gulp.task('pack-js', function () {    
    return gulp.src('src/*.js')
        .pipe(minify({
		    ext:{
		        min:'.min.js'
		    },
		    noSource: true
		}))
        .pipe(gulp.dest('build'));
});
 
gulp.task('pack-css', function () {    
    return gulp.src('src/*.css')
        .pipe(cleanCss())
        .pipe(rename(function (path) {
		    path.basename += ".min";
		}))
   		.pipe(gulp.dest('build'));
});

gulp.task('default', gulp.series('pack-js', 'pack-css'));
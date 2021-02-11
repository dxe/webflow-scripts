var gulp = require('gulp');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var rename = require("gulp-rename");
var babel = require("gulp-babel");

gulp.task('pack-js', function () {    
    return gulp.src('src/*.js')
        .pipe(babel())
        .pipe(minify({
		    ext:{
		        min:'.min.js'
		    },
		    noSource: true
		}))
        .pipe(gulp.dest('dist'));
});
 
gulp.task('pack-css', function () {    
    return gulp.src('src/*.css')
        .pipe(cleanCss())
        .pipe(rename(function (path) {
		    path.basename += ".min";
		}))
   		.pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('pack-js', 'pack-css'));
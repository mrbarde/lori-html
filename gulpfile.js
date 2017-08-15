const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const plumber = require('gulp-plumber');


/**
 * ****************************************
 * Watch list
 * ****************************************
 */
var watchlist = {
    sass: [
        'src/styles/*',
        'src/styles/**/*',
        'src/styles/**/**/*',
    ]
};

/**
 * ****************************************
 * Webpack Task
 * ****************************************
 */
gulp.task('webpack', function(){
    return gulp.src('./src/app.jsx')
               .pipe(plumber())
               .pipe(webpackStream(require('./webpack.config.js'), webpack))
               .pipe(gulp.dest('public/js'));
});

/**
 * ****************************************
 * SASS Task
 * ****************************************
 */
gulp.task("sass", function(){
         return sass('./src/styles/style.scss', { style: 'expanded', sourcemap:true })
        .pipe(plumber())
	    .pipe(autoprefixer())
	    .pipe(cssnano())
	    .pipe(rename('app.css'))
        .pipe(gulp.dest('./public/css'));
});

/**
 * ****************************************
 * Watch
 * ****************************************
 */
const watch = function(){
    // watch for changes in sass
	gulp.watch(watchlist.sass, ["sass"]);
}

/**
 * ****************************************
 * Start
 * ****************************************
 */
gulp.task('start', ['sass', 'webpack']);

/**
 * ****************************************
 * Default
 * ****************************************
 */
gulp.task('default', function(){
	console.log(' ');
	console.log('AVAILABLE GULP COMMANDS');
	console.log('-----------------------');
	console.log('1. gulp start');
	console.log('2. gulp sass');
	console.log(' ');
});

var errorHandler = (err) => {
    console.log(err);
}
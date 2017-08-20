var path = require('path');
var gulp = require('gulp');
var {SyncServer, 
    WebpackTask, 
    SassTask} = require('lori-scripts');
var loriConfig = require('./lori.config');

/**
 * ****************************************
 * Watch list
 * ****************************************
 * watch lists for all files sass 
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
    let task = new WebpackTask({
        source: path.resolve(__dirname, 'src/app.jsx'),
        config: require('./webpack.config.js'),
        destination: path.join(__dirname, 'public/assets'),
        callback: serve
    });
    task();
});

/**
 * ****************************************
 * SASS Task
 * ****************************************
 */
gulp.task("sass", function(){
    let task = new SassTask({
        source: path.resolve(__dirname, 'src/styles/style.scss'),
        options: { style: 'expanded', sourcemap:true },
        file: 'app.css',
        destination: path.join(__dirname, 'public/assets/css')
    });
    task();
});

/**
 * ****************************************
 * Server Task
 * ****************************************
 */
var serve = function(){
    syncServer();
    watch();
};

/**
 * ****************************************
 * Sync Server
 * ****************************************
 * BrowserSync proxies our php server and
 * starts a seperate server that syncs to
 * our breowser.
 */
const syncServer = function() {
    var syncServe = new SyncServer({
        host: 'localhost',
        port: loriConfig.syncPort,
        logLevel: 'silent',
		server: {
			baseDir: [loriConfig.publicDir]
		}
    },[
        path.join(loriConfig.publicDir, 'public/assets/js/*'),
        path.join(loriConfig.publicDir, 'public/assets/css/*')
    ]);
    syncServe.start();
};

/**
 * ****************************************
 * Watch
 * ****************************************
 * Watch for changes on sass files defined
 * in the sass watchlist
 */
const watch = function(){
    // watch for changes in sass
	gulp.watch(watchlist.sass, ["sass"]);
}

/**
 * ****************************************
 * Start
 * ****************************************
 * starts gulp task
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
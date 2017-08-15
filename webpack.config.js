const webpack = require('webpack');
const Clicks = require('./clicks');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

/**
 * We will start by initializing clicks
 * this is where our config settings are
 */
Clicks.init();

/**
 * Entry file
 */
module.exports.entry = './src/app.jsx';

/**
 * Now the output file and path
 * this is where our js file will be output
 * to at compilation time
 */
module.exports.output = {
	path: Clicks.PUBLIC_DIR+'/js',
	filename: 'app.js',
	publicPath: 'public/'
};

/**
 * Define our resolve object
 * it is empty by default
 */
module.exports.resolve = {};

/**
 * Watch webpack when not in production
 */
module.exports.watch = true;

/**
 * Within our resolve object we will define
 * aliaes we want to resolve.
 */
module.exports.resolve.alias = {
	env: (Clicks.isProduction) 
		? Clicks.DEV_DIR+ '/environments/production.environment.js' 
		: Clicks.DEV_DIR+ '/environments/development.environment.js',
	AppConfigs:  Clicks.DEV_DIR+'/configs/app.config.js',
	RoutesConfig:  Clicks.DEV_DIR+'/configs/routes.config.js'
};

/**
 * Now we define our modules
 * this will contains the rules and loaders
 * used to translate and compile our application files
 * into one file (output file)
 */
module.exports.module = {
	rules: [
		{
			test: /\.jsx?$/,
			include: Clicks.DEV_DIR,
			loader: 'babel-loader'
		},
		{
			test: /\.less$/,
			include: Clicks.DEV_DIR,
			use: Clicks.EXTRACTLESS.extract({
				fallback: 'style-loader',
				use: [
					{
						'loader': 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
					},
					{
						'loader': 'resolve-url-loader'
					},
					{
						'loader': 'less-loader'
					}
				]
			})
		},
		{
			test: /\.s?css$/,
			include: Clicks.DEV_DIR,
			use: Clicks.EXTRACTSASS.extract({
				fallback: 'style-loader',
				use: [
					{
						loader: 'css-loader?modules&modules=true&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
					},
					{
						loader: 'resolve-url-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			})
		},
		{ 
			test: /\.jpe?g$|\.gif$|\.png$|\.svg$/, 
			include: Clicks.DEV_DIR,
			use:{
				loader: 'file-loader',
				options:{
					name: 'images/[sha512:hash:base64:7].[ext]',
					outputPath: '../'
				}
			}
		},
		{ 
			test: /\.(woff2?|ttf|eot|otf)$/,
			include: Clicks.DEV_DIR,
			use:{
				loader: 'file-loader',
				options:{
					name: 'fonts/[name].[ext]',
					outputPath: '../'
				}
			}
		}
	]
};

/**
 * We will start by defining our plugins.
 * These are environment specific, we will add
 * more plugins as the environment may require
 */
module.exports.plugins = [
	Clicks.EXTRACTLESS,
	Clicks.EXTRACTSASS,
	new FriendlyErrorsWebpackPlugin(),
	new BrowserSyncPlugin({
		port: Clicks.serverPort,
		host: 'localhost',
		server: {
			baseDir: ['public']
		},
		files: ['public/index.html', 'public/js/*'],
		logLevel: 'silent',
		open: true
	})
];

// if in production
if(Clicks.isProduction){
	// concat extra plugins to webpack config
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false,
			compressor: {
				warnings: false
			},
			comments: false,
		}),
		new webpack.optimize.AggressiveMergingPlugin()
	]);
}

/**
 * things to do in development environment
 */
if(!Clicks.isProduction){
	// use source-maps as devtool
	module.exports.devtool = (Clicks.isProduction) ? 'cheap-module-source-map' : 'source-map';
}

/*
 *******************************
 * Stats
 *******************************
 *
 * By default, Webpack spits a lot of information out to the terminal,
 * each you time you compile. Let's keep things a bit more minimal
 * and hide a few of those bits and pieces. Adjust as you wish.
 *
 */
module.exports.stats = {
    hash: false,
    version: false,
    timings: false,
    children: false,
    errors: false
};

module.exports.performance = { hints: false };
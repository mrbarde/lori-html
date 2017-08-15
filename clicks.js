var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Generates helpers and default configs for lori
 */
class Clicks {

    constructor(){
        // set if environment is set to production
        this.isProduction = process.env.NODE_ENV === 'production';
        this.serverPort = 8080;
    }

    init(){
        this.setBaseDirectory('./');
        this.setPublicDirectory('public');
        this.setDevDirectory('src');
        this.setCSSExtractors();
    }

    setBaseDirectory(dir){
        this.BASE_DIR = path.resolve(__dirname, dir);
    }

    setPublicDirectory(dir){
        this.PUBLIC_DIR = path.resolve(__dirname, dir);
    }

    setDevDirectory(dir){
        this.DEV_DIR = path.resolve(__dirname, dir);
    }

    setCSSExtractors(){

        this.EXTRACTLESS = new ExtractTextPlugin({ 
            filename: '../../src/styles/app.scss',
            allChunks: true
        });

        this.EXTRACTSASS = new ExtractTextPlugin({ 
            filename: '../../src/styles/app.scss',
            allChunks: true
        });
    }

};

module.exports =  new Clicks;
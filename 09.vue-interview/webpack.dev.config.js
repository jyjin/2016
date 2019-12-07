/**
 * Created by aresn on 17/3/8.
 */
/**
 * Created by aresn on 16/7/5.
 */

var webpack = require('webpack');
var config = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCss = new ExtractTextPlugin({
    filename: '[name].bundle.css',
    disable: false,
    allChunks: true
});
var extractLess = new ExtractTextPlugin({
    filename: '[name].bundle.css',
    disable: false,
    allChunks: true
});

var fs = require('fs');

config.devtool = '#source-map'; // source-map
config.output.publicPath = '/dist/'; // 资源路径
config.output.filename = '[name].bundle.js'; // 入口js命名
config.output.chunkFilename = '[name].chunk.js'; // 路由js命名

config.vue = {
    loaders: {
        css: extractCss.extract(['css-loader', 'style-loader']),
        less: extractLess.extract(['vue-style-loader', 'less-loader'])
    }
};

config.plugins = (config.plugins || []).concat([
    extractCss,
    extractLess,
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendors', 'vendors.js']
    }), // 提取第三方库
    new HtmlWebpackPlugin({ // 构建html文件
        title: 'vue demo project',
        filename: './index.html',
        template: './src/template/index.ejs',
        inject: false
    })
]);

module.exports = config;

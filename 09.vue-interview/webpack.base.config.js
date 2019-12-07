/**
 * Created by aresn on 17/3/8.
 */
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');



module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].[hash].js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ['url-loader?limit=1024000&name=./static/img/[hash].[ext]', 'image-webpack-loader']
            },
            {
                test: /\.(html|tpl)$/,
                use: 'html-loader'
            }
        ]
    },
    // 转es5
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['.js', '.vue'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            filter: path.join(__dirname, './src/filters'),
            components: path.join(__dirname, './src/components')
        }
    },
    plugins: []
}

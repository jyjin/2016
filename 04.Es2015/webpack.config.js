var webpack = require('webpack');
module.exports = {
    entry: [
        "./src/common/base.js",
        "./src/module/import.js",
        "./src/module/index.js"
    ],
    output: {
        path: './build',
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ["babel?presets=es2015"],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loaders: ['style', 'css', 'autoprefixer']
        }, {
            test: /\.less$/,
            loader: ['style', 'css', 'autoprefixer', 'less']
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|gif)(\?|$)/,
            loader: 'file-loader?name=[hash].[ext]'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=1200&name=[hash].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js') //将公用模块，打包进common.js
    ],
    resolve: {
        extensions: ['', '.js'] //后缀名自动补全
    }
};

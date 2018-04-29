// webpack 开发环境配置
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common.config.js');

const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry:{
        app:['babel-polyfill','react-hot-loader/patch',path.join(__dirname, 'src/index.js')]
    },
    output: {
        filename: '[name].[hash].js' // 入口文件名
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        port: 8100,
        historyApiFallback: true,
        hot: true,
        open: true,
        host: '0.0.0.0',
        proxy: {
            '/wyy': {
                target: 'http://192.168.1.226:3000/',
                changeOrigin: true,
                pathRewrite: {
                    '^/wyy': ''
                }
            },
        }
    }
}
module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);
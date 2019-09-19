const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    // 开发模式,上线用生产模式
    mode: "development", 
    entry: {
    // 以前是jsx，因为我们用typescript写，所以这里后缀是tsx
        index: "./src/index.tsx",
    },
    output: {
        filename: 'js/index.js', //输出的文件           
        path: path.resolve(__dirname, 'dist') //输出文件所在的目录
    },
    devServer: { // 检测代码变化并自动重新编译并自动刷新浏览器
        // 启动热更新,当模块、组件有变化，不会刷新整个页面，而是局部刷新
        // 需要和插件webpack.HotModuleReplacementPlugin配合使用
        hot: true,
        contentBase: path.resolve(__dirname, 'dist') // 设置静态资源的根目录
    },
     // 为了方便调试，还要配置一下调试工具
    devtool: "source-map",
    resolve: {
        // 一般写模块不会写后缀，在这里配置好相应的后缀，那么当我们不写后缀时，会按照这个后缀优先查找
        extensions: [".ts", '.tsx', '.js', '.json']
    },
    // 加速打包
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    parse: {},
                    compress: {},
                    mangle: true,
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_fnames: false,
                },
            }),
        ],
    },
    module: { // 如何处理项目中不同类型的模块
        rules: [ // 用于规定在不同模块被创建时如何处理模块的规则数组
            {
                // 如果这个模块是.ts或者.tsx，则会使用ts-loader把代码转成es5
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                // 使用sourcemap调试
                // enforce:pre表示这个loader要在别的loader执行前执行
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.(css|scss)$/,
                use: [MiniCssExtractPlugin.loader,'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: [
                            require('autoprefixer')("last 100 versions"),
                            require('cssnano')(),
                            require('postcss-preset-env')()
                        ]
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: ['sass-loader'],
            },
            {
                test: /\.(png|jpeg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]', //path为相对于context的路径
                        context: 'src', //src根目录
                        publicPath: "../"
                    },
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        context: 'src',
                        name: '[path][name].[hash:7].[ext]'
                    }
                }]
            },
        ]
    },

    plugins: [
        // 这个插件是生成index.html
        new HtmlWebpackPlugin({
            // 以哪个文件为模板，模板路径
            template: "./index.html",
            // 编译后的文件名
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash:7].css",
            chunkFilename: "css/[id].[hash:7].css",
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}
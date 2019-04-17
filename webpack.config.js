const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

//HTML模板封装
let createHtml = function (name) {
    return new HtmlWebpackPlugin({
        template: __dirname + `/src/view/${name}.html`,
        filename: `${name}.html`,
        chunks: [`${name}`],
        chunksSortMode: 'manual'
    })
}


module.exports = {
    mode: "development", //打包为开发模式
    entry: {
        main: __dirname + '/src/js/main.js', //入口要打包的文件
        index: __dirname + '/src/js/index.js'

    },
    output: {
        filename: 'js/[name].[hash:7].js', //输出的文件           
        path: path.resolve(__dirname, 'dist') //输出文件所在的目录
    },
    devServer: { // 检测代码变化并自动重新编译并自动刷新浏览器
        contentBase: path.resolve(__dirname, 'dist') // 设置静态资源的根目录
    },
    //加速打包
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
                test: /(\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env"
                        ]
                    }
                },
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, 'src'),
            },
            {
                test: /\.(css|scss)$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: "../"
                    }
                }, 'css-loader', {
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
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            },
            //暴露$和jQuery到全局
            {
                test: require.resolve('jquery'), //require.resolve 用来获取模块的绝对路径
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            },

        ]
    },

    plugins: [
        //CSS分离
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash:7].css",
            chunkFilename: "css/[id].[hash:7].css",
        }),

        // HTML页面
        createHtml("index"),
        createHtml("main"),

        //全局查件
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        })
    ],
}
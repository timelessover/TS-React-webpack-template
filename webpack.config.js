const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: __dirname + '/src/js/main.js',       //入口要打包的文件
        index: __dirname + '/src/js/index.js',
        jquery: __dirname + '/src/js/jquery.min.js',
        flexible: __dirname + '/src/js/lib-flexible.js',
    },
    output: {
        filename: 'js/[name].js', //输出的文件           
        path: path.resolve(__dirname, 'dist') //输出文件所在的目录
    },
    devServer: { // 检测代码变化并自动重新编译并自动刷新浏览器
        contentBase: path.resolve(__dirname, 'dist') // 设置静态资源的根目录
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
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: "../"
                    }
                }, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: ".."
                    }
                }, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpeg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader:
                        'file-loader' ,
                        options: {
                            name: '[path][name].[ext]',//path为相对于context的路径
                            context: 'src',//src根目录
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
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css",
        }),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/view/index.html",
            filename: 'index.html',
            chunks: ['jquery', 'index','lib-flexible'],
            chunksSortMode: 'manual'
        }),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/view/main.html",
            filename: 'main.html',
            chunks: ['main'],
            chunksSortMode: 'manual'
        }),
    ],
}
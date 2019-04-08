const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


module.exports = {
    entry: {
        main: __dirname + '/src/main.js'       //入口
    },
    output: {
        filename: 'bundle.js',               //输出的文件名
        path: path.resolve(__dirname, 'build') //输出文件所在的目录
    },
    devServer: { // 检测代码变化并自动重新编译并自动刷新浏览器
        contentBase: path.resolve(__dirname, 'build') // 设置静态资源的根目录
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
                },  'css-loader']
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: "../"
                    }
                }, 'css-loader', 'sass-loader'],
            },
            { 
                test: /\.(png|jpeg|jpg|ttf|gif)/,
                loader: 'file-loader' 
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
            chunkFilename: "[id].css"
        })
    ],
}
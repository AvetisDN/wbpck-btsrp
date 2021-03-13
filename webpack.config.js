const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['./src/app.js', './src/app.scss'],
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    devServer: {
        open: true,
        port: 3333
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/public'
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        }),
        new HtmlWebpackPlugin({
            template: "./src/tpl/index.html",
            filename: 'index.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            template: "./src/tpl/portfolio.html",
            filename: 'portfolio.html',
            inject: 'body'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(c|sa|sc)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require('sass')
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg|bmp|ico)$/i,
                exclude: /(public)/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "images",
                            name: "[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|ttf|otf|eot)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "fonts"
                        }
                    }
                ]
            },

        ]
    }
}
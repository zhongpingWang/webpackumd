



const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const webpack = require('webpack')

const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");


//umd


var config = {

    target: ['web', 'es5'],

    mode: 'development', //development  production

    devtool: 'source-map',

    entry: {
        index: './src/index.ts',

    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        extensions: [
            '.tsx',
            '.ts',
            '.mjs',
            '.js',
            '.jsx',
            '.vue',
            '.json',
            '.wasm'
        ],

    },

    //告诉 Webpack 如何去寻找 Loader
    resolveLoader: {
        modules: ["node_modules"], //, "myModules"
        //入口文件的后缀
        extensions: [".js", ".json"]
    },


    optimization: {
        splitChunks: {
            cacheGroups: {
                // styles: {
                //     name: 'app',
                //     test: /\.css$/,
                //     chunks: 'all',
                //     enforce: true,
                // }, 

                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        },

        minimizer: [
            /* config.optimization.minimizer('terser') */
            new TerserPlugin(
                {
                    parallel: true,
                    extractComments: true
                }
            ), new CssMinimizerPlugin()]
    },

    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),

        library: "libraryName",
        libraryTarget: 'umd',
        umdNamedDefine: true
    },


    module: {

        rules: [

            {
                test: /\.js$/, loader: 'babel-loader',
            },


            {
                test: /\.(less|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },

            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    name: 'imgs/[name].[hash:4].[ext]',
                    limit: 100,
                    publicPath: "../", //编译完成后

                }
            },
            {
                test: /\.(woff|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: 'css/fonts/[name].[hash:4].[ext]',
                    publicPath: "../", //编译完成后
                }
            },

            {
                test: /\.ts$/,
                use: [

                    {
                        loader: 'babel-loader',
                    },

                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            appendTsSuffixTo: ['\\.vue$'],
                            happyPackMode: true
                        }
                    }
                ]
            },

        ]
    },



    plugins: [

         
        //变量 定义完后可以在项目中直接使用
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.test': '"我是webpacktest"'
        }),

        //友好错误提示
        new FriendlyErrorsWebpackPlugin(),

        //css导出成文件
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            // chunkFilename: 'css/[name]_[id].css?t=' + (+new Date()),
        }),

        new ForkTsCheckerWebpackPlugin(
        ),


    ]

}

module.exports = config;
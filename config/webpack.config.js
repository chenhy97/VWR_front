'use strict';

const Helpers = require('./helpers');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        polyfills: Helpers.root('src','polyfills.js'),
        vendor: Helpers.root('src','vendor.js'),
        app: Helpers.root('src','main.js')
    },
    output: {
        path: Helpers.root('wwwroot'),
        publicPath: '/',
        filename: 'js/[name].[hash].js',
		chunkFilename: 'js/[id].[chunkhash].js'
    },
	resolve: {
        extensions: ['.js','.vue','.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'underscore$': 'underscore/underscore-min.js',
			'tween$': '@tweenjs/tween.js',
            '@': Helpers.root('src')
        }
    },
    module: {
        rules: [
			{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    Helpers.root('src')
                ]
            },
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
				  name: 'img/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
				  name: 'media/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
				  name: 'fonts/[name].[hash:7].[ext]'
				}
			},
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        {
                          loader: 'postcss-loader',
                          options: {
                            config: {
                              path: Helpers.root('config', 'postcss.config.js')
                            }
                          }
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 2 } },
                        {
                          loader: 'postcss-loader',
                          options: {
                            config: {
                              path: Helpers.root('config', 'postcss.config.js')
                            }
                          }
                        },
                        'less-loader'
                    ],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        new Webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery'
        }),
        new Webpack.optimize.CommonsChunkPlugin({
			name: [
				'app',
				'vendor',
				'polyfills'
			]
		}),
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css',
            allChunks: true
		}),
        new CleanWebpackPlugin(
            ['*'],
            { root: Helpers.root('wwwroot') }
        ),
        new HtmlWebpackPlugin({
            filename: Helpers.root('wwwroot','index.html'),
            template: Helpers.root('src', 'index2.html'),
            favicon: Helpers.root('src', 'favicon.ico'),
            hash: false,
            inject: false,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new CopyWebpackPlugin([
            {
                from: Helpers.root('static'),
                to: Helpers.root('wwwroot', 'static'),
                ignore: ['.*']
            }
        ])
    ],
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
        contentBase: Helpers.root('wwwroot'),
        // publicPath: '/',
        proxy: {
            '/ping': 'http://localhost:8080',
            '/eject': 'http://localhost:8080',
            '/start': 'http://localhost:8000'
        }
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    devtool: 'source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new Webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: false,
            parallel: true
        }),
        new OptimizeCssPlugin({
            cssProcessorOptions: {
                safe: true
            }
        })
    ]);
}
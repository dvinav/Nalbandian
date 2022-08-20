const path = require('path')
const TerserPlugin = require("terser-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	mode: "development",
	entry: path.resolve(__dirname, '../../src/client/ts/index.ts'),
	devtool: "source-map",
	/* optimization: {
		minimizer: [new TerserPlugin({
			extractComments: false,
		})],
		minimize: true
	}, */
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{ 
				test: /\.(ts|tsx)$/, 
				loader: 'ts-loader',
				options: {
					configFile: path.resolve(__dirname, './tsconfig.json')
				}
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
						},
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
							implementation: require("sass")
						},
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin(
				{
					template: path.resolve(__dirname, '../../src/client/index.htm') 
					/* minify: {
						removeComments: true,
						collapseWhitespace: true,
						removeRedundantAttributes: true,
						useShortDoctype: true,
						removeEmptyAttributes: true,
						removeStyleLinkTypeAttributes: true,
						keepClosingSlash: true,
						minifyJS: true,
						minifyCSS: true,
						minifyURLs: true,
					}, */
				}
			)
	],
	resolve: {
		extensions: ['*', '.tsx', '.ts']
	},
	output: {
		path: path.resolve(__dirname, '../../public/'),
		filename: 'bundle.js'
	}
};
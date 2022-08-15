const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require("terser-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	mode: "development",
	entry: path.resolve(__dirname, './src/client/js/main.js'),
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
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
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
					},
				]
			}
		]
	},
	resolve: {
		extensions: ['*', '.js']
	},
	output: {
		path: path.resolve(__dirname, './public/'),
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.ProvidePlugin({ $: 'jquery/dist/jquery.slim'})
	]
};
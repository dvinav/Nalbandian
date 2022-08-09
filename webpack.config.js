const path = require('path');
const webpack = require('webpack')
module.exports = {
	mode: "development",
	entry: path.resolve(__dirname, './src/client/js/main.js'),
	devtool: "eval-source-map",
	watch: true,
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
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: path.resolve(__dirname, './public/'),
		hot: true
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	]
};
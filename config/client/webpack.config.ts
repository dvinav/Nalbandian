import path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

const devTemplate = `
<html lang="hy">
	<body>
		<div id="root"></div>
	</body>
</html>`

const productionTemplate = `
<html lang="hy">
	<head>
		<link rel="stylesheet" href="styles.css" />
	</head>
	<body>
		<div id="root"></div>
	</body>
</html>`

module.exports = {
	mode: "development",
	entry: path.resolve(__dirname, '../../src/client/index.tsx'),
	devtool: "source-map",
	optimization: process.env.NODE_ENV !== "production"
		? { minimize: false }
		: {
		minimizer: [
			new TerserPlugin({
				extractComments: false,
			}),
			new CssMinimizerPlugin(),
		],
		minimize: true
	}, 
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
				test: /\.(sa|sc|c)ss$/,
				use: [
					process.env.NODE_ENV !== "production"
						? "style-loader"
						: MiniCssExtractPlugin.loader,
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
		new HtmlWebpackPlugin({ 
			templateContent: process.env.NODE_ENV !== "production" ? devTemplate : productionTemplate,
			minify: process.env.NODE_ENV !== "production" ? false : true,
		}),
		new MiniCssExtractPlugin({
			filename: "styles.css",
		})
	],
	resolve: {
		extensions: ['*', '.tsx', '.ts', '.js', '.jsx']
	},
	output: {
		path: path.resolve(__dirname, '../../public/'),
		filename: 'bundle.js'
	}
};
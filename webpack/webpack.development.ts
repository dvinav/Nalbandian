import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyPlugin from 'copy-webpack-plugin'

const template = `
<html lang="hy">
	<body>
		<div id="root"></div>
	</body>
</html>`

const clientConfig = {
	name: 'client.dev',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {
					configFile: path.resolve(__dirname, '../tsconfig.json'),
				},
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							implementation: require('sass'),
						},
					},
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot)$/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			templateContent: template,
			filename: path.join(__dirname, '../public/index.html'),
		}),
		new MiniCssExtractPlugin({
			filename: 'styles.css',
		}),
		new CopyPlugin({
			patterns: [{ from: 'src/assets/' }],
		}),
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss', '.sass'],
		// prettier-ignore
		alias: { 
			'app': path.resolve(__dirname, '../src/app/index.tsx'),
			'style-imports': path.resolve(__dirname, '../src/styles/imports.sass'),
			'styles': path.resolve(__dirname, '../src/styles/modules/'),
			'components': path.resolve(__dirname, '../src/components/'),
			'utils': path.resolve(__dirname, '../src/utils/'),
			'api': path.resolve(__dirname, '../src/api/'),
			'layouts': path.resolve(__dirname, '../src/layouts/'),
			'pages': path.resolve(__dirname, '../src/pages/'),
			'res': path.resolve(__dirname, '../src/res/'),
		},
	},
	entry: path.resolve(__dirname, '../src/index.tsx'),
	output: {
		path: path.resolve(__dirname, '../public/'),
		filename: 'bundle.js',
		clean: true,
	},
}

const serverConfig = {
	name: 'server.dev',
	entry: './src/server/server.ts',
	mode: 'development',
	target: 'node',
	ignoreWarnings: [
		{
			message: /resolve/,
		},
		{
			message: /dependency/,
		},
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					configFile: path.resolve(__dirname, '../src/server/tsconfig.json'),
				},
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
		// prettier-ignore
		alias: {
			'utils': path.resolve(__dirname, '../src/utils/'),
			'types': path.resolve(__dirname, '../src/types/'),
			'res': path.resolve(__dirname, '../src/res/'),
		},
	},
	output: {
		filename: 'server.js',
		path: path.resolve(__dirname, '../'),
	},
}

export { serverConfig, clientConfig }

const path = require('path');

const config = {
	entry: {
		'main': './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	devtool: 'cheap-module-source-map',
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		port: 8001,
		// host: '0.0.0.0',
		// disableHostCheck: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.vue$/,
				use: [
					'vue-loader',
				],
			},
			{
				test: /\.raw\./,
				use: [
					'raw-loader',
				],
			},
			{
				test: /\.csv$/,
				exclude: /(node_modules|bower_components|\.raw\.)/,
				loader: 'csv-loader',
				options: {
					dynamicTyping: true,
					header: true,
				},
			},
		],
	},
};

module.exports = config;
